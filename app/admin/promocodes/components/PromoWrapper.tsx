"use client";
import { promocode } from "@/apptypes/types";
import { useSearchParams } from "next/navigation";
import { PromoDisplay } from "./PromoDisplay";

export const PromoWrapper = ({ promocodes }: { promocodes: promocode[] }) => {
  const searchParams = useSearchParams();
  const query = searchParams?.get("query") || "";
  console.log(query);
  const filtredPromo = promocodes.filter((promo: promocode) =>
    promo.promoCode.toLowerCase().includes(query.toLowerCase()),
  );

  const condition = promocodes.every((e) => filtredPromo.includes(e));
  return <PromoDisplay promocodes={condition ? promocodes : filtredPromo} />;
};
