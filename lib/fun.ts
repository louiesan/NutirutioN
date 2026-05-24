import { product } from "@/apptypes/types";
import { GandGlogin } from "@/app/actions/action";

export function filterProducts(
  products: product[],
  query: string | undefined,
  category: string | undefined,
  minprice: string | undefined,
  maxprice: string | undefined,
) {
  let result = products;

  if (query) {
    console.log("filtering query");
    console.log(query);

    result = result.filter(
      (e) =>
        e.name.toLowerCase().includes(query.toLowerCase()) ||
        e.shortDescription.toLowerCase().includes(query.toLowerCase()),
    );
    console.log(result);
  }

  if (category) {
    console.log("filtering category");
    console.log(category);

    result = result.filter(
      (e) => e.category.toLowerCase() === category.toLowerCase(),
    );
    console.log(result);
  }
  if (maxprice !== undefined && Number(maxprice)) {
    console.log("filtering maxp");
    result = result.filter((e) => e.price <= Number(maxprice));
    console.log(result);
  }
  if (minprice !== undefined) {
    console.log("filtering minp");
    result = result.filter((e) => e.price >= Number(minprice));
    console.log(result);
  }

  return result;
}
