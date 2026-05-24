"use client";
import { product } from "@/apptypes/types";
import Image from "next/image";
import Link from "next/link";
import { CiEdit } from "react-icons/ci";
import { BsTrash } from "react-icons/bs";
import { useContext, useState } from "react";
import { adminContext } from "../../context/adminContext";

export const Product = ({ product }: { product: product }) => {
  const { deleteProduct, delLoading } = useContext(adminContext);
  const [confirmDelete, setConfirmDelete] = useState(false);
  return (
    <>
      {confirmDelete && (
        <>
          <div className="max-w-xs rounded-lg z-940 sticky top-1/4 left-1/2 -translate-y-1/2 bg-slate-950/80 backdrop-blur-md shadow-lg shadow-red-300/80 h-fit p-4">
            <h2 className="text-yellow-200 font-semibold text-2xl text-center">
              WARNING!
            </h2>
            <p className="text-white/80 text-center">
              The selected product will be permanently deleted.
            </p>
            <div>
              <button
                onClick={() => deleteProduct(product._id)}
                disabled={delLoading}
                className={`w-full h-fit px-3.5 py-2.5 mt-5 rounded-md ${delLoading ? "bg-gray-400/40" : "bg-red-500 hover:bg-red-600"} text-white font-medium text-lg transition-colors duration-300 ease-in-out`}
              >
                {delLoading ? "Deleting..." : "Delete"}
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="w-full h-fit px-3.5 py-2.5 mt-5 rounded-md bg-gray-500 hover:bg-gray-600 text-white font-medium text-lg transition-colors duration-300 ease-in-out"
              >
                Cancel
              </button>
            </div>
          </div>
          <div className="w-full h-full fixed z-930 bg-slate-900/70 backdrop-blur-xl " />
        </>
      )}
      <div className="group w-full h-full flex flex-col justify-between rounded-xl p-2 bg-slate-800/5 border border-white/10 shadow-lg shadow-black/40 transition-all duration-300 hover:border-green-400/40 hover:shadow-green-500/20">
        <div className="overflow-hidden rounded-lg">
          <Image
            src={product.images[0].url}
            alt="productpng"
            quality={90}
            width={100}
            height={100}
            className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-col gap-2 mt-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold uppercase text-green-400 tracking-wide">
              {product.category}
            </span>

            <span className="text-white/60">Stock: {product.stock}</span>
          </div>

          <Link href={`/product/${product._id}`}>
            <h1
              title={product.name}
              className="text-lg font-semibold text-white leading-tight hover:text-green-400 transition-colors"
            >
              {product.name.length > 16
                ? product.name.slice(0, 16) + "..."
                : product.name}
            </h1>
          </Link>

          <p className="text-sm text-white/70 line-clamp-2">
            {product.shortDescription}
          </p>

          <div className="flex items-center justify-between  mt-1">
            <span className="text-xl font-bold text-green-400">
              {product.price} DA
            </span>
            <div className="w-fit h-fit flex flex-nowrap items-center justify-center gap-1.5 ">
              <Link
                href={`/admin/products/edit-product/${product._id}`}
                className={`${delLoading ? "pointer-events-none" : "pointer-events-auto"} flex items-center justify-center p-2 rounded-lg cursor-pointer bg-green-400 text-black transition-all duration-200 hover:bg-green-300 hover:scale-105 active:scale-95 shadow-md shadow-green-500/30`}
              >
                <CiEdit size={18} />
              </Link>
              <button
                disabled={delLoading}
                onClick={() => setConfirmDelete(true)}
                className={`flex items-center justify-center p-2 rounded-lg cursor-pointer ${delLoading ? "bg-gray-400/40" : "bg-white"} text-black transition-all duration-200 hover:bg-red-300 hover:scale-105 active:scale-95 shadow-md shadow-green-500/30`}
              >
                <BsTrash size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
