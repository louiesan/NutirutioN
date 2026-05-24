import { Search } from "./components/Search";
import { UserDisplay } from "./components/UserDisplay";
import { UserWrapper } from "./components/UserWrapper";

export default async function page() {
  const res = await fetch("http://localhost:3000/api/users");
  const data = await res.json();

  const users = data;
  console.log(data);

  return (
    <main className="w-full h-fit ">
      <h2 className="text-white font-semibold text-4xl capitalize mb-10">
        All Users:
      </h2>
      {users && users.length > 0 ? (
        <UserWrapper users={users} />
      ) : (
        <h2 className="text-white font-medium text-lg mt-5">No users found.</h2>
      )}
    </main>
  );
}
