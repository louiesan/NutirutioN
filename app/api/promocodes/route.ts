import { ConnectDB } from "@/lib/database";
import Promo from "@/lib/models/PromoCode";

export const POST = async (req: Request) => {
  const body = await req.json();

  await ConnectDB(process.env.MONOG_URI!);
  try {
    const promo = await Promo.create(body);
    if (!promo) {
      return new Response(JSON.stringify({ msg: "ERROR  OCCURED!" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new Response(
      JSON.stringify({
        msg: `Promo Code:${promo.promoCode} has been created! `,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (err) {
    throw err;
  }
};

export const GET = async (req: Request) => {
  await ConnectDB(process.env.MONGO_URI!);

  try {
    const promocodes = await Promo.find({});

    return new Response(JSON.stringify(promocodes), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    throw err;
  }
};
