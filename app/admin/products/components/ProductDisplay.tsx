import { product } from "@/apptypes/types";
import { Product } from "./Product";

export const ProductDisplay = ({ products }: { products: product[] }) => {
  return products.map((product) => (
    <Product key={product._id} product={product} />
  ));
};
