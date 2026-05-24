"use client";
import { useState } from "react";
import { ProductCreator } from "./ProductCreator";
import { Filter, Plus } from "lucide-react";

export const ProductManage = () => {
  const [openpCreator, setOpenPcreator] = useState(false);

  return (
    <>
      <div className="my-5 flex w-full flex-col gap-3 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Manage Products</h2>
          <p className="text-sm text-slate-300">
            Create products and maintain your catalog from one place.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpenPcreator(true)}
            className="inline-flex items-center gap-2 rounded-md bg-emerald-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600"
          >
            <Plus size={16} /> Add Product
          </button>
        </div>
      </div>
      {openpCreator && (
        <ProductCreator onCloseAction={() => setOpenPcreator(false)} />
      )}
    </>
  );
};
