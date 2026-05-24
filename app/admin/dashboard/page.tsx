import { cookies } from "next/headers";
import { BarChart3, Package, ShoppingCart, Users2 } from "lucide-react";
import DashboardCharts from "./components/DashboardCharts";

type DashboardUser = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

type DashboardProduct = {
  _id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  featured?: {
    isFeatured?: boolean;
    isFeautred?: boolean;
    order?: number;
  };
};

type DashboardOrder = {
  _id: string;
  userName: string;
  totalPrice: number;
  status: string;
  paymentMethod: string;
  deliveryMethod: string;
  item: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
};

async function fetchDashboardData<T>(url: string): Promise<T> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

  const response = await fetch(url, {
    cache: "no-store",
    headers: {
      ...(cookieHeader ? { cookie: cookieHeader } : {}),
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }

  return response.json();
}

export default async function Page() {
  const [usersData, productsData, ordersData] = await Promise.all([
    fetchDashboardData<DashboardUser[]>("http://localhost:3000/api/users"),
    fetchDashboardData<{ products: DashboardProduct[] }>(
      "http://localhost:3000/api/products",
    ),
    fetchDashboardData<DashboardOrder[]>("http://localhost:3000/api/orders"),
  ]);

  const users = usersData || [];
  const products = productsData.products || [];
  const orders = ordersData || [];

  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.totalPrice || 0),
    0,
  );
  const totalOrderItems = orders.reduce(
    (sum, order) =>
      sum + order.item.reduce((itemSum, item) => itemSum + item.quantity, 0),
    0,
  );
  const pendingOrders = orders.filter(
    (order) => order.status === "pending",
  ).length;
  const acceptedOrders = orders.filter(
    (order) => order.status === "accepted",
  ).length;
  const featuredProducts = products.filter(
    (product) => product.featured?.isFeatured || product.featured?.isFeautred,
  ).length;
  const lowStockProducts = products.filter(
    (product) => product.stock <= 10,
  ).length;
  const outOfStockProducts = products.filter(
    (product) => product.stock <= 0,
  ).length;
  const adminUsers = users.filter((user) => user.role === "admin").length;
  const userUsers = users.filter((user) => user.role === "user").length;
  const averageOrderValue =
    orders.length > 0 ? totalRevenue / orders.length : 0;

  const topProducts = [...products]
    .sort((a, b) => b.stock - a.stock)
    .slice(0, 6)
    .map((product) => ({
      label: product.name,
      value: product.stock,
    }));

  const categoryCounts = products.reduce<Record<string, number>>(
    (acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    },
    {},
  );

  const categoryChartData = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([label, value]) => ({ label, value }));

  const statusChartData = [
    { label: "Pending", value: pendingOrders },
    { label: "Accepted", value: acceptedOrders },
  ];

  const stockChartData = [
    {
      label: "Healthy",
      value: Math.max(
        products.length - lowStockProducts - outOfStockProducts,
        0,
      ),
    },
    { label: "Low stock", value: lowStockProducts },
    { label: "Out of stock", value: outOfStockProducts },
  ];

  const recentOrders = [...orders].slice(0, 5);

  return (
    <div className="space-y-8 text-white">
      <section className="rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.16),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-6 shadow-xl shadow-black/20 backdrop-blur-xl sm:p-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300/80">
              Admin analytics
            </p>
            <h1 className="mt-2 text-3xl font-black leading-tight sm:text-5xl">
              Dashboard overview
            </h1>
            <p className="mt-3 text-sm leading-7 text-white/70 sm:text-base">
              Live data from the users, orders, and products APIs, organized
              into clear analytics cards and charts.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 2xl:grid-cols-4 md:min-w-105">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <Users2 className="text-emerald-300" size={20} />
              <p className="mt-3 text-xs uppercase tracking-[0.25em] text-white/45">
                Users
              </p>
              <p className="mt-1 text-2xl font-bold">{users.length}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <ShoppingCart className="text-emerald-300" size={20} />
              <p className="mt-3 text-xs uppercase tracking-[0.25em] text-white/45">
                Orders
              </p>
              <p className="mt-1 text-2xl font-bold">{orders.length}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <Package className="text-emerald-300" size={20} />
              <p className="mt-3 text-xs uppercase tracking-[0.25em] text-white/45">
                Products
              </p>
              <p className="mt-1 text-2xl font-bold">{products.length}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <BarChart3 className="text-emerald-300" size={20} />
              <p className="mt-3 text-xs uppercase tracking-[0.25em] text-white/45">
                Revenue
              </p>
              <p className="mt-1 text-2xl 2xl:text-xl font-bold">
                {totalRevenue.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Average order value",
            value: averageOrderValue.toFixed(2),
            note: "Based on all paid API orders",
          },
          {
            label: "Order items",
            value: totalOrderItems,
            note: "Total quantity across every order",
          },
          {
            label: "Featured products",
            value: featuredProducts,
            note: "Products marked as featured",
          },
          {
            label: "Low stock products",
            value: lowStockProducts,
            note: "Stock at 10 or below",
          },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/10 backdrop-blur-md"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/45">
              {card.label}
            </p>
            <p className="mt-3 text-3xl font-black text-emerald-300">
              {card.value}
            </p>
            <p className="mt-2 text-sm leading-6 text-white/60">{card.note}</p>
          </div>
        ))}
      </section>

      <DashboardCharts
        categoryData={categoryChartData}
        orderStatusData={statusChartData}
        stockData={stockChartData}
        userRoles={[
          { label: "Users", value: userUsers },
          { label: "Admins", value: adminUsers },
        ]}
      />

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300/80">
                Recent orders
              </p>
              <h2 className="mt-1 text-2xl font-bold">
                Latest order snapshots
              </h2>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {recentOrders.map((order) => (
              <div
                key={order._id}
                className="rounded-2xl border border-white/10 bg-black/20 p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-base font-semibold text-white">
                      {order.userName}
                    </p>
                    <p className="text-sm text-white/55">
                      {order.paymentMethod} · {order.deliveryMethod}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-emerald-300">
                      {Number(order.totalPrice).toFixed(2)}
                    </p>
                    <p className="text-xs uppercase tracking-[0.25em] text-white/45">
                      {order.status}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {recentOrders.length === 0 && (
              <div className="rounded-2xl border border-dashed border-white/10 p-6 text-center text-white/55">
                No orders returned from the API yet.
              </div>
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300/80">
            Quick insights
          </p>
          <h2 className="mt-1 text-2xl font-bold">What the API says</h2>

          <div className="mt-5 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-sm text-white/65">Users</p>
              <p className="mt-1 text-xl font-bold">{users.length} total</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-sm text-white/65">Orders</p>
              <p className="mt-1 text-xl font-bold">
                {pendingOrders} pending / {acceptedOrders} accepted
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-sm text-white/65">Products</p>
              <p className="mt-1 text-xl font-bold">
                {featuredProducts} featured, {outOfStockProducts} out of stock
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
