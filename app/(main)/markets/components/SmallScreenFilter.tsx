"use client";

import { Categories, Category } from "@/apptypes/types";
import categoriess from "@/data/market.json";
import { Filter, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const SmallScreenFilter = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const categories: Categories = categoriess.categories;
  const category = searchParams?.get("category") || "";
  const minprice = searchParams?.get("minprice") || "";
  const maxprice = searchParams?.get("maxprice") || "";
  const [show, setShow] = useState(false);

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams || undefined);

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="sm:hidden relative w-full my-2.5">
      <button
        type="button"
        onClick={() => setShow(true)}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 backdrop-blur-md transition hover:border-emerald-400/40 hover:bg-white/10"
      >
        <Filter size={18} className="text-emerald-300" />
        Filter markets
      </button>

      {show && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setShow(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
          />

          <div className="absolute bottom-0 left-0 right-0 rounded-t-3xl border-t border-white/10 bg-[linear-gradient(180deg,rgba(8,10,14,0.98),rgba(13,15,20,0.96))] p-5 shadow-[0_-20px_80px_rgba(0,0,0,0.45)]">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300/80">
                  Filter panel
                </p>
                <h2 className="mt-1 text-lg font-bold text-white">
                  Refine your search
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setShow(false)}
                className="rounded-full border border-white/10 bg-white/5 p-2 text-white transition hover:border-emerald-400/40 hover:bg-white/10"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="mobile-category"
                  className="mb-2 block text-sm font-semibold text-white/90"
                >
                  Category
                </label>
                <select
                  id="mobile-category"
                  value={category}
                  onChange={(e) => updateFilter("category", e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-white outline-none transition hover:border-emerald-400/40 focus:border-emerald-400/60"
                >
                  <option className="text-black" value="">
                    All categories
                  </option>
                  {categories?.map((item: Category) => (
                    <option
                      key={item.id}
                      className="text-black"
                      value={item.name}
                    >
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="mobile-minprice"
                    className="mb-2 block text-sm font-semibold text-white/90"
                  >
                    Min Price
                  </label>
                  <input
                    id="mobile-minprice"
                    type="number"
                    min={0}
                    placeholder="20"
                    value={minprice}
                    onChange={(e) => updateFilter("minprice", e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-white outline-none transition hover:border-emerald-400/40 focus:border-emerald-400/60"
                  />
                </div>

                <div>
                  <label
                    htmlFor="mobile-maxprice"
                    className="mb-2 block text-sm font-semibold text-white/90"
                  >
                    Max Price
                  </label>
                  <input
                    id="mobile-maxprice"
                    type="number"
                    min={0}
                    placeholder="10000"
                    value={maxprice}
                    onChange={(e) => updateFilter("maxprice", e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-white outline-none transition hover:border-emerald-400/40 focus:border-emerald-400/60"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShow(false)}
                className="mt-2 w-full rounded-xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-black transition hover:bg-emerald-300"
              >
                Apply filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
