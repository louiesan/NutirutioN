import { ConnectDB } from "@/lib/database";
import Product from "@/lib/models/Product";
import Reviews from "@/lib/models/Reviews";
import { NextRequest } from "next/server";

export const POST = async (req: Request) => {
  const body = await req.json();
  const { productId, userId, rate } = body;
  if (!productId || !userId || !rate) {
    return new Response(
      JSON.stringify({ msg: "Please provide a correct value!" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  await ConnectDB(process.env.MONGO_URI!);
  try {
    const existingReview = await Reviews.findOne({
      productId,
      userId,
    });
    if (existingReview) {
      return new Response(
        JSON.stringify({
          msg: "You have already submitted a review for this product!",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }
    const review = await Reviews.create({ ...body });
    const product = await Product.findOne({ _id: productId });
    const currentRating = product?.rating ?? 0;
    const currentReviewsCount = product?.reviewsCount ?? 0;
    const newRating = Number(
      (currentRating * currentReviewsCount + rate) / (currentReviewsCount + 1),
    ).toFixed(1);

    await Product.updateOne(
      { _id: productId },
      {
        $inc: { reviewsCount: 1 },
        $set: {
          rating: newRating,
        },
      },
    );

    return new Response(JSON.stringify({ msg: "Review Added!", review }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    throw err;
  }
};

export const GET = async (req: NextRequest) => {
  const body = req.nextUrl.searchParams;
  const productId = body.get("productId");

  if (!productId) {
    return new Response(JSON.stringify({ msg: "PRODUCT NOT FOUND!" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  await ConnectDB(process.env.MONGO_URI!);
  try {
    const reviews = await Reviews.find({ productId });
    if (!reviews) {
      return new Response(JSON.stringify({ msg: "no reviews found!" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ reviews }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    throw err;
  }
};
