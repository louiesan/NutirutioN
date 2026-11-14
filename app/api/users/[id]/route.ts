import { ConnectDB } from "@/lib/database";
import User from "@/lib/models/User";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;
  await ConnectDB(process.env.MONGO_URI!);

  const user = await User.find({ _id: id }).select("-password");
  if (!user) {
    throw new Error("User not Found!");
  }

  return new Response(JSON.stringify(user), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const DELETE = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  await ConnectDB(process.env.MONGO_URI!);
  const { id } = await params;

  const user = await User.deleteOne({ _id: id });

  if (!user) {
    throw new Error(`User No/${id}/ Not Found!`);
  }

  return new Response(JSON.stringify({ msg: "User Deleted Successfully!" }), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
};

export const PATCH = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  await ConnectDB(process.env.MONGO_URI!);
  const { id } = await params;
  const body = await req.json();
  const { id: productId } = body;
  try {
    let newFavorites = [];
    const user = await User.findOne({ _id: id });
    if (!user) {
      return new Response(JSON.stringify({ msg: "NOT AUTHENTICATED!" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
    const { favorites } = user;
    const index = favorites.findIndex((e) => e._id === productId);
    if (index === -1) {
      newFavorites = [...favorites, { ...body }];
    } else {
      newFavorites = favorites.filter((e) => e._id !== productId);
    }

    const updatedUser = await User.updateOne(
      { _id: id },
      { favorites: newFavorites },
    );
    return new Response(JSON.stringify({ msg: "Favorite UPDATED!" }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    throw err;
  }
};
