import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { ConnectDB } from "@/lib/database";
import { Orders } from "@/lib/models/Order";
import { Search } from "../users/components/Search";
import { OrdersWrapper } from "./components/OrdersWrapper";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== "admin") {
    redirect("/auth/sign-in");
  }

  await ConnectDB(process.env.MONGO_URI!);

  const ordersQuery =
    session.user.role === "admin"
      ? Orders.find({})
      : Orders.find({ userId: session.user.id });

  const orders = JSON.parse(JSON.stringify(await ordersQuery));

  console.log(orders);

  return (
    <main className="w-full h-fit">
      <h1 className="text-2xl font-bold text-white mb-5">All Orders:</h1>
      <Search page="orders" />
      {orders && orders.length > 0 ? (
        <OrdersWrapper orders={orders} />
      ) : (
        <div>NO ORDERS TO SHOW!</div>
      )}
    </main>
  );
}
