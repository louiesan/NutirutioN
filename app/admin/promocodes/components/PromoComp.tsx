"use client";
import { promocode } from "@/apptypes/types";
import { Copy, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { adminContext } from "../../context/adminContext";

export const PromoComp = ({ code }: { code: promocode }) => {
  const { deletePromocode, delLoading } = React.useContext(adminContext);
  const expiresAt = new Date(code.expiresAt).toISOString().split("T")[0];
  const isActive = new Date(code.expiresAt) > new Date();
  const [copied, setIsCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code.promoCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.log("copy failed because", err);
    }
  }

  return (
    <div className="w-full h-fit flex flex-col px-1 py-2 rounded-md bg-white/4 border border-white/10 ">
      <nav className="w-full h-fit flex flex-row flex-nowrap items-center justify-between px-1.5 mb-3">
        <h2 className="font-medium text-white/80 text-sm">PROMO</h2>
        <span className="bg-white/5 rounded-md px-1.5 py-0.5 text-green-200 font-medium">
          {code.discountPercentage}%
        </span>
      </nav>
      <div className="w-full h-fit flex flex-row items-center justify-between px-1.5">
        <h2 className="text-white font-semibold text-2xl uppercase">
          {code.promoCode}
        </h2>
        <button
          onClick={async () => await handleCopy()}
          className="w-fit flex flex-nowrap items-center bg-white/10 px-1.5 py-0.5 rounded-md cursor-pointer gap-1.5 text-white/80 font-semibold"
        >
          {copied ? "Copied" : "Copy"} <Copy size={20} />
        </button>
      </div>
      <div className="w-full h-fit grid grid-cols-[1fr_100px] gap-2.5">
        <div className="w-full h-fit flex flex-col">
          <div className="w-full h-fit flex flex-row items-center justify-start gap-2.5 px-1.5 mt-4">
            <p className="text-white text-sm font-medium">Expires:</p>
            <p className="text-white text-sm font-medium">{expiresAt}</p>
          </div>
          <div className="w-full h-fit flex flex-row items-center justify-start gap-2.5 px-1.5 mt-4">
            <p className="text-white/60 text-sm">Used Count:</p>
            <p className="text-white text-sm font-medium">{code.usedCount}</p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div
            className={`w-fit h-fit px-1.5 py-0.5 rounded-md text-sm font-medium ${isActive ? "bg-green-400/80 text-green-200" : "bg-red-500/80 text-red-200"}`}
          >
            {isActive ? "Active" : "Inactive"}
          </div>
        </div>
      </div>
      <button
        onClick={() => deletePromocode(code._id)}
        disabled={delLoading}
        className="w-full h-fit mt-2.5 bg-red-500/80 py-1.5 text-base font-medium text-white hover:bg-red-500/90 focus:outline-none focus:ring-2 focus:ring-red-400/20 rounded-md"
      >
        Delete{" "}
        {delLoading && (
          <span className="text-white animate-spin">
            <Loader2 size={20} />
          </span>
        )}
      </button>
    </div>
  );
};
