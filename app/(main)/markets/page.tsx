import { product, searchparam } from "@/apptypes/types";
import Searcher from "./components/Search";
import { filterProducts } from "@/lib/fun";
import GridCards from "./components/GridCards";
import Filtering from "./components/Filter";
import { auth } from "@/auth";
import { SmallScreenFilter } from "./components/SmallScreenFilter";
import { apiUrl } from "@/lib/siteUrl";
export default async function Markets({
  searchParams,
}: {
  searchParams: Promise<searchparam>;
}) {
  const session = await auth();
  const res = await fetch(apiUrl("/api/products"), {
    method: "GET",
  });

  const data = await res.json();
  const products: product[] = data.products;


  const { query, category, minprice, maxprice } = await searchParams;

  const filtredProduct = filterProducts(
    products,
    query,
    category,
    minprice,
    maxprice,
  );
  const condition = products.every((e) => filtredProduct.includes(e));

  return (
    <main className="mt-18.25 text-white w-full h-full max-w-6xl mx-auto p-2.5">
      <h1 className={`text-white text-5xl text-center mb-10 font-medium`}>
        Discover Our Markets:
      </h1>
      <SmallScreenFilter />
      <div className="grid grid-cols-1 sm:grid-cols-[300px_1fr] gap-5">
        <div className="w-full h-fit flex flex-row flex-nowrap relative sm:flex-col gap-2.5 sm:sticky sm:top-24">
          <Searcher />
          <Filtering />
        </div>
        {query && query.length > 0 ? (
          <span className="absolute -top-3 font-medium text-lg capitalize left-[32%] -translate-y-[30%] -translate-x-[30%]">
            Search: {query}
          </span>
        ) : null}
        <GridCards
          session={session}
          products={condition ? products : filtredProduct}
        />
      </div>
    </main>
  );
}
