import { ConnectDB } from "@/lib/database";
import Promo from "@/lib/models/PromoCode";

export const PATCH = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;
  await ConnectDB(process.env.MONGO_URI!);

  try {
    const promo = Promo.updateOne(
      { _id: id },
      {
        $inc: {
          usedCount: 1,
        },
      },
    );
    if (!promo) {
      return new Response(JSON.stringify({ msg: "PROMO NOT FOUND!" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    return new Response(JSON.stringify({ msg: `PROMO CODE UpDATeD!` }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    throw err;
  }
};

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id: promoCode } = await params;

  if (!promoCode) {
    return new Response(JSON.stringify({ msg: "no valid promo code!" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  await ConnectDB(process.env.MONGO_URI!);

  try {
    const promo = await Promo.find({ promoCode });

    if (!promo) {
      return new Response(
        JSON.stringify({ msg: `${promoCode} Does not exist!` }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    return new Response(JSON.stringify(promo), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    throw err;
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  await ConnectDB(process.env.MONGO_URI!);
  const { id } = await params;

  const promo = await Promo.deleteOne({ _id: id });

  if (!promo) {
    throw new Error(`PromoCode No/${id}/ Not Found!`);
  }

  return new Response(
    JSON.stringify({ msg: "PromoCode Deleted Successfully!" }),
    {
      status: 201,
      headers: { "Content-Type": "application/json" },
    },
  );
};
