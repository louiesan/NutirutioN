import { headers } from "next/headers";
import { Search } from "../users/components/Search";
import { ProductWrapper } from "./components/ProductWrapper";
import { ProductManage } from "./components/ProductManage";

export default async function products() {
  const res = await fetch("http://localhost:3000/api/products", {
    headers: await headers(),
  });
  const data = await res.json();
  const products = data.products;

  return (
    <main>
      <h1 className="text-2xl font-bold text-white mb-5">All Products:</h1>
      <Search page="products" />
      <ProductManage />
      <ProductWrapper products={products} />
    </main>
  );
}
