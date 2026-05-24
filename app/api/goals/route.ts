import { auth } from "@/auth";
import { ConnectDB } from "@/lib/database";
import { Goals } from "@/lib/models/Goals";

export const GET = async (request: Request) => {
  await ConnectDB(process.env.MONGO_URI!);

  try {
    const goals = await Goals.find({});

    return new Response(JSON.stringify(goals), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ message: "Failed to fetch goals" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

export const POST = async (req: Request) => {
  await ConnectDB(process.env.MONGO_URI!);
  const session = await auth();

  if (!session?.user || session.user.role !== "admin") {
    return new Response(JSON.stringify({ msg: "Not Authorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const body = await req.json();

    const existingGoal = await Goals.findOne({ slug: body.slug });
    if (existingGoal) {
      return new Response(JSON.stringify({ msg: "Goal slug already exists" }), {
        status: 409,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const goal = await Goals.create(body);

    return new Response(JSON.stringify(goal), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ msg: "Failed to create goal" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
