import { auth } from "@/auth";
import { Poppins } from "next/font/google";
import { redirect } from "next/navigation";
import { Order as ORDER } from "../components/Order";
import Order from "@/public/orders.gif";
import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { apiUrl } from "@/lib/siteUrl";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  style: ["normal"],
});
export default async function Orders() {
  const session = await auth();
  if (session?.user?.role === "admin") {
    redirect("/admin/dashboard");
  }

  const id = session?.user?.id;
  if (!id) {
    redirect("/auth/sign-in");
  }
  const res = await fetch(apiUrl(`/api/orders/${id}`), {
    headers: await headers(),
  });
  const data = await res.json();
  const orders = data;
  console.log(orders);

  return (
    <main
      className={`mt-18.25 flex-1 text-white w-full h-full max-w-6xl sm:mx-auto p-2.5 rounded-lg ${poppins.className}`}
    >
      <h2 className="capitalize font-semibold text-4xl sm:text-5xl text-white my-4 text-center">
        Orders :
      </h2>
      {orders && orders.length > 0 ? (
        <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders.map((order: any) => (
            <ORDER key={order._id} order={order} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-start gap-5 items-center mt-5">
          <Link href={"/markets"} className="flex flex-col items-center">
            <h5 className="text-white  text-lg sm:text-2xl font-semibold capitalize">
              You did not buy anything yet !
            </h5>
            <Image className="w-40 h-40" src={Order} alt="hearts" />
          </Link>
        </div>
      )}
    </main>
  );
}
