import { ConnectDB } from "@/lib/database";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  await ConnectDB(process.env.MONGO_URI!);

  try {
    const body = await req.json();
    console.log(body);
    const { name, email, password } = body;
    if (!name || !email || !password)
      throw new Error("Please Provide A valid value");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return new NextResponse(JSON.stringify({ message: "user created!" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.log(err);

    return new NextResponse(JSON.stringify(err), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
