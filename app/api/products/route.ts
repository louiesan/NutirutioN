import { ConnectDB } from "@/lib/database";
import Product from "@/lib/models/Product";
import { NextRequest } from "next/dist/server/web/spec-extension/request";

export const GET = async (req: NextRequest) => {
  const searchParams = await req.nextUrl.searchParams;


  await ConnectDB(process.env.MONGO_URI!);
  try {
    let filtred;
    const isFeautured = JSON.parse(searchParams?.get("isFeatured") || "false");
    const category = searchParams?.get("category");

    if (isFeautured) {
      filtred = await Product.find({ "featured.isFeatured": true });
    } else if (category && category.length > 0) {
      filtred = await Product.find({ category });
    } else {
      filtred = await Product.find({});
    }


    const products = filtred;
    if (!products) {
      return new Response(JSON.stringify({ msg: "NOT FOUND" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ products: products }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {

    throw err;
  }
};

export const POST = async (req: Request) => {
  const body = await req.json();
  try {
    await ConnectDB(process.env.MONGO_URI!);

    const product = await Product.create({ ...body });
    return new Response(JSON.stringify({ product: product }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {

    return new Response(JSON.stringify({ error: "Failed to create product" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
