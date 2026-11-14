import { auth } from "@/auth";
import { ConnectDB } from "@/lib/database";
import { Goals } from "@/lib/models/Goals";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ slug: string }> },
) => {
  await ConnectDB(process.env.MONGO_URI!);
  const { slug } = await params;
  if (!slug) {
    return new Response(JSON.stringify({ msg: "No Valid Slug!" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const goal = await Goals.find({ slug: slug });
    if (!goal || goal.length === 0) {
      return new Response(JSON.stringify({ msg: "Goal not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    return new Response(JSON.stringify(goal), {
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
  { params }: { params: Promise<{ slug: string }> },
) => {
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
    const { slug } = await params;
    const body = await req.json();

    const updatedGoal = await Goals.findOneAndUpdate(
      { slug },
      { $set: body },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedGoal) {
      return new Response(JSON.stringify({ msg: "Goal not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new Response(JSON.stringify(updatedGoal), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error("Error during goal update:", err);
    return new Response(JSON.stringify({ msg: "Failed to update goal" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
