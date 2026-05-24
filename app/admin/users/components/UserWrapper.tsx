"use client";
import { user, users } from "@/apptypes/types";
import { Search } from "./Search";
import { UserDisplay } from "./UserDisplay";
import { useSearchParams } from "next/navigation";

export const UserWrapper = ({ users }: { users: users }) => {
  const searchParams = useSearchParams();
  const query = searchParams?.get("query") || "";
  console.log(query);
  const filtredUser = users.filter(
    (user: user) =>
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase()),
  );
  console.log(users, "USERS ORG");
  console.log(filtredUser, "USERS FILTeRED");
  const condition = users.every((e) => filtredUser.includes(e));
  return (
    <div className="w-full h-full">
      <Search page="users" />
      <UserDisplay users={condition ? users : filtredUser} />
    </div>
  );
};
