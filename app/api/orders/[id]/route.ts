import { Order } from "@/app/admin/orders/components/Order";
import { orderProduct } from "@/apptypes/types";
import { auth } from "@/auth";
import { ConnectDB } from "@/lib/database";
import { serverEvents } from "@/lib/event";
import { Orders } from "@/lib/models/Order";
import Product from "@/lib/models/Product";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  await ConnectDB(process.env.MONGO_URI!);
  const { id } = await params;
  if (!id) {
    return new Response(JSON.stringify({ msg: "No Valid ID!" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  const session = await auth();
  const isLogin = !!session?.user?.role;
  if (!isLogin) {
    return new Response(JSON.stringify({ msg: "Not Authorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  try {
    const order = await Orders.find({ userId: id });
    if (!order) {
      return new Response(JSON.stringify({ msg: "Order not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    return new Response(JSON.stringify(order), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify(err), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;
  const session = await auth();

  if (!id) {
    return new Response(JSON.stringify({ msg: "No Valid ID!" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const isAdmin = session?.user?.role === "admin" ? true : false;

  if (!isAdmin) {
    return new Response(JSON.stringify({ msg: "Not Authorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  await ConnectDB(process.env.MONGO_URI!);
  try {
    const body = await req.json();
    const { status, item } = body;
    const orderInfo = await Orders.findOne({ _id: id });
    if (!orderInfo) {
      return new Response(JSON.stringify({ msg: "Order not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const order = await Orders.updateOne({ _id: id }, { status });
    if (orderInfo.email) {
      const orderDetails = {
        username: orderInfo.userName,
        destination: `${orderInfo.wilaya}, ${orderInfo.baladya}`,
        price: orderInfo.totalPrice.toFixed(2),
        email: orderInfo.email,
        method: orderInfo.deliveryMethod,
      };
      serverEvents.emit("orderConfirmed", orderDetails);
    }

    if (!order) {
      return new Response(JSON.stringify({ msg: "Not Found!" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
    await decrementStock(orderInfo.item as orderProduct[]);
    return new Response(JSON.stringify({ msg: "Order Updated!" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify(err), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;
  if (!id) {
    return new Response(JSON.stringify({ msg: "No Valid ID!" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  const session = await auth();
  const isAdmin = session?.user?.role === "admin" ? true : false;
  if (!isAdmin) {
    return new Response(JSON.stringify({ msg: "Not Authorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  await ConnectDB(process.env.MONGO_URI!);
  try {
    const order = await Orders.deleteOne({ _id: id });
    if (!order) {
      return new Response(JSON.stringify({ msg: "Not Found!" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ msg: "Order Deleted!" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify(err), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

async function decrementStock(products: orderProduct[]) {
  console.log("Decrement stock started!");

  try {
    // 1. Prepare a single bulk operation array

    const checkingProducts = await Product.find({
      _id: { $in: products.map((p) => p.productId) },
    });
    console.log(checkingProducts);

    const bulkOps = products.map((product) => ({
      updateOne: {
        filter: {
          _id: product.productId,
          stock: { $gte: product.quantity },
        },
        update: { $inc: { stock: -product.quantity } },
      },
    }));

    // 2. Execute all updates in ONE database hit
    const result = await Product.bulkWrite(bulkOps);

    // 3. Verify that every single item was successfully updated
    if (result.modifiedCount !== products.length) {
      throw new Error(
        "One or more items could not be decremented due to insufficient stock.",
      );
    }

    console.log("Decrement stock finished successfully!");
  } catch (error) {
    console.error("Failed to decrement stock:", error);
    throw error; // Re-throw to handle this failure in your order controller
  }
}
