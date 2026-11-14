import { getCodeForBe } from "@/app/actions/action";
import { item, product } from "@/apptypes/types";
import { auth } from "@/auth";
import { ConnectDB } from "@/lib/database";
import { Orders } from "@/lib/models/Order";
import Product, { ProductFields } from "@/lib/models/Product";
import Promo from "@/lib/models/PromoCode";
import User from "@/lib/models/User";

export const GET = async (req: Request) => {
  await ConnectDB(process.env.MONGO_URI!);
  const session = await auth();
  if (!session?.user) {
    throw new Error("Not Authorized!");
  }
  try {
    if (session?.user?.role === "admin") {
      const orders = await Orders.find({});
      return new Response(JSON.stringify(orders), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else if (session?.user?.role === "user") {
      const userId = session.user.id;
      const orders = await Orders.find({ userId });
      return new Response(JSON.stringify(orders), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      return new Response(JSON.stringify({ msg: "Not Authorized" }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } catch (err) {
    return new Response(JSON.stringify(err), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const POST = async (req: Request) => {
  await ConnectDB(process.env.MONGO_URI!);
  const body = await req.json();

  try {
    //create new order var , initial it with order coming from the client
    let order: any;

    const { shipping, promoCode, userId } = body;

    if (!userId && !(userId.length > 0)) {
      const { userId, ...withoutUserId } = body;
      order = new Object(withoutUserId);
    } else {
      order = new Object(body);
      await User.updateOne({ _id: userId }, { $inc: { orders: 1 } });
    }

    //getting the cart from the order!
    const cartItems = body.item;
    //seperating the product items , bundle items
    const productItems = cartItems.filter((e: any) => !e.isBundle);
    const bundleItems = cartItems.filter((e: any) => e.isBundle);

    //getting the real value incase the user manipulate our localStorage
    const producttItemsFdb = await Product.find({
      _id: { $in: productItems.map((ele: any) => ele.id) },
    }).select("name price");
    //same for bundles
    const bundletItemsFdb: [] = [];
    // const bundletItemsFdb = await Product.find({
    //   _id: { $in: bundleItems.map((ele: any) => ele.id) },
    // }).select("name price");

    //joining the arr together so we can get the fixeed cart in case its corrupted!
    const items = producttItemsFdb.concat(bundletItemsFdb ?? []);
    //refformatting it !
    const formattedItems = items.map((ele) => ({
      productId: ele.id,
      name: ele.name,
      price: ele.price,
      // isBundle: cartItems.find((el: any) => el.id === ele.id).isBundle,
      image: cartItems.find((el: any) => el.id === ele.id).image,
      quantity: cartItems.find((el: any) => el.id === ele.id).quantity,
    }));
    //setting it in the new obj
    order.item = formattedItems;
    //looping throught the fixed order cart so we can get the real price
    order.totalPrice = Number(
      formattedItems
        .reduce((curr, nxt) => curr + nxt.price * nxt.quantity, 0)
        .toFixed(2),
    ).toFixed(2);

    if (promoCode && promoCode.length > 0) {
      const promoProp = await getCodeForBe(promoCode);
      if (promoProp && Object.keys(promoProp).length > 0) {
        const currentDate = new Date().getTime();
        const expiresData = new Date(promoProp.expiresAt).getTime();
        if (
          promoProp.usageLimits > promoProp.usedCount &&
          expiresData > currentDate
        ) {
          order.promoCode = promoProp.promoCode;
          order.totalPrice =
            order.totalPrice -
            (order.totalPrice * promoProp.discountPercentage) / 100;
        }
        await Promo.updateOne({ promoCode }, { $inc: { usedCount: 1 } });
      }
    }

    if (shipping) {
      order.totalPrice += shipping;
    }
    //handling discount

    // creating the order!

    const createdOrder = await Orders.create(order);
    // return new Response(JSON.stringify({ msg: "Order Submitted!" }), {
    //   status: 201,
    //   headers: { "Content-Type": "application/json" },
    // });

    return new Response(
      JSON.stringify({ msg: "Order has been Placed!", createdOrder }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (err) {
    throw err;
    return new Response(JSON.stringify(err), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
