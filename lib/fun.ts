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

    result = result.filter(
      (e) =>
        e.name.toLowerCase().includes(query.toLowerCase()) ||
        e.shortDescription.toLowerCase().includes(query.toLowerCase()),
    );
  }

  if (category) {

    result = result.filter(
      (e) => e.category.toLowerCase() === category.toLowerCase(),
    );
  }
  if (maxprice !== undefined && Number(maxprice)) {
    result = result.filter((e) => e.price <= Number(maxprice));
  }
  if (minprice !== undefined) {
    result = result.filter((e) => e.price >= Number(minprice));
  }

  return result;
}
