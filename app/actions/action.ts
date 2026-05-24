"use server";

import { cart, item } from "@/apptypes/types";
import { auth, signIn, signOut } from "@/auth";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

export async function GandGlogin(action: string) {
  try {
    await signIn(action as string, { redirect: true, redirectTo: "/profile" });
    redirect("/profile");
  } catch (err) {
    throw err;
  }
}

export async function CredentialsLogin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });
  } catch (err: any) {
    console.log(err);
    throw err;
  }
}

export async function Logout() {
  await signOut({ redirectTo: "/" });
}

export async function getAuthSession() {
  try {
    const session = await auth();
    return session;
  } catch (error) {
    console.error("Error fetching auth session:", error);
    throw error;
  }
}

export async function getCodeForBe(promo: string) {
  const res = await fetch(`http://localhost:3000/api/promocodes/${promo}`);
  const data = await res.json();
  return data[0];
}

export async function deleteUser() {
  const session = await auth();
  if (!session) {
    toast.error("You must be logged in to delete your account");
    throw new Error("User not authenticated");
  }
  await fetch(`http://localhost:3000/api/users/${session?.user?.id}`, {
    method: "DELETE",
  });
  await signOut({ redirectTo: "/" });
}
