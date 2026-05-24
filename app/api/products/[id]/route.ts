import { ConnectDB } from "@/lib/database";
import Product from "@/lib/models/Product";
import { auth } from "@/auth";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  await ConnectDB(process.env.MONGO_URI!);
  const param = await params;
  const { id } = param;
  console.log(id);

  const product = await Product.find({ _id: id });
  console.log(product);

  if (!product) {
    return new Response(JSON.stringify({ msg: "Product is not FOUND!" }), {
      headers: { "Content-Type": "application/json" },
      status: 401,
    });
  }

  return new Response(JSON.stringify(product), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
};

export const DELETE = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;
  const session = await auth();
  if (!id) {
    return new Response(JSON.stringify({ msg: "NOT FOUND" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
  if (session?.user?.role !== "admin") {
    return new Response(JSON.stringify({ msg: "UNAUTHORIZED!" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    await ConnectDB(process.env.MONGO_URI!);
    const product = await Product.deleteOne({ _id: id });
    if (!product) {
      return new Response(JSON.stringify({ msg: "NOT FOUND" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(
      JSON.stringify({ msg: "Product Deleted Successfully!" }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (err) {
    throw err;
  }
};

export const PUT = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  console.log(params);

  const { id } = await params;
  console.log(id);

  const session = await auth();

  if (!id) {
    return new Response(JSON.stringify({ msg: "NOT FOUND!" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  if (session?.user?.role !== "admin") {
    return new Response(JSON.stringify({ msg: "UNAUTHORIZED!" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    await ConnectDB(process.env.MONGO_URI!);
    const body = await req.json();
    const { _id: id } = body;
    const product = await Product.findOneAndUpdate(
      { _id: id },
      { ...body },
      { returnDocument: "after", runValidators: true },
    );
    if (!product) {
      console.log(body);
      console.log(product);

      return new Response(JSON.stringify({ msg: "NOT FOUND!" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new Response(JSON.stringify({ msg: "Product Updated!" }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    throw err;
  }
};
