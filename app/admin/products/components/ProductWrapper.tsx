"use client";
import { product } from "@/apptypes/types";
import { useSearchParams } from "next/navigation";
import { ProductDisplay } from "./ProductDisplay";

export const ProductWrapper = ({ products }: { products: product[] }) => {
  const searchParams = useSearchParams();
  const query = searchParams?.get("query") || "";
  console.log(products);

  const filtredProduct = products.filter(
    (ele) =>
      ele.name.toLowerCase().includes(query.toLowerCase()) ||
      ele.shortDescription.toLowerCase().includes(query.toLowerCase()),
  );
  const condition = filtredProduct.every((e) => products.includes(e));

  return (
    <div className="w-full relative h-fit grid grid-cols-1 sm:grid-cols-2 mg:grid-cols-3 xl:grid-cols-4 gap-2.5 mt-5 max-h-screen overflow-y-scroll p-2">
      <ProductDisplay products={condition ? filtredProduct : products} />
    </div>
  );
};
