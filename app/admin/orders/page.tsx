import { headers } from "next/headers";
import { Search } from "../users/components/Search";
import { OrdersWrapper } from "./components/OrdersWrapper";

export default async function Orders() {
  const res = await fetch("http://localhost:3000/api/orders", {
    headers: await headers(),
  });
  const orders = await res.json();

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
