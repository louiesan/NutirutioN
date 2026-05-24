import React from "react";
import { Montserrat, Mona_Sans, Poppins } from "next/font/google";
import { product } from "@/apptypes/types";
import Cards from "./Cards";

// const montserrat = Montserrat({
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
//   style: ["normal", "italic"],
//   subsets: ["latin"],
// });
// const monasans = Mona_Sans({
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
//   style: ["normal", "italic"],
//   subsets: ["latin"],
// });
// const poppins = Poppins({
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
//   style: ["normal", "italic"],
//   subsets: ["latin"],
// });

export default function GridCards({
  products,
  session,
}: {
  products: product[];
  session: any | null;
}) {
  return (
    <div
      className={`w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-1.5 gap-2.5`}
    >
      {products && products.length > 0 ? (
        products.map((e) => <Cards key={e._id} product={e} />)
      ) : (
        <div>Nothing To Show</div>
      )}
    </div>
  );
}
