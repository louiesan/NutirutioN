import { Search } from "../users/components/Search";
import { ProductWrapper } from "./components/ProductWrapper";
import { ProductManage } from "./components/ProductManage";
import { ConnectDB } from "@/lib/database";
import Product from "@/lib/models/Product";

export const dynamic = "force-dynamic";

export default async function products() {
  await ConnectDB(process.env.MONGO_URI!);
  const products = JSON.parse(JSON.stringify(await Product.find({})));

  return (
    <main>
      <h1 className="text-2xl font-bold text-white mb-5">All Products:</h1>
      <Search page="products" />
      <ProductManage />
      <ProductWrapper products={products} />
    </main>
  );
}
