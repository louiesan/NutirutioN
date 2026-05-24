import { promocode } from "@/apptypes/types";
import React from "react";
import { PromoComp } from "./PromoComp";

export const PromoDisplay = ({ promocodes }: { promocodes: promocode[] }) => {
  return (
    <div className="w-full h-fit grid grid-cols-1 ms:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-2.5 items-center justify-between mt-5">
      {promocodes && promocodes.length > 0 ? (
        promocodes.map((code: promocode, index: number) => (
          <PromoComp key={index} code={code} />
        ))
      ) : (
        <div>THERE IS NO CODES</div>
      )}
    </div>
  );
};
