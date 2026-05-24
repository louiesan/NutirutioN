import { ConnectDB } from "@/lib/database";
import User from "@/lib/models/User";

export const GET = async (req: Request) => {
  await ConnectDB(process.env.MONGO_URI!);
  const users = await User.find({}).select("email name image role");

  return new Response(JSON.stringify(users), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
