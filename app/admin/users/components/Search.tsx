"use client";

import Form from "next/form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CiCircleRemove } from "react-icons/ci";

const placeholders = {
  users: "email or name",
  promocodes: "promocodes",
  orders: "user name or user email",
  products: "product name",
};

export const Search = ({ page }: { page: keyof typeof placeholders }) => {
  const [query, setQuery] = useState<string>("");
  const router = useRouter();

  function handleClear() {
    setQuery("");
    router.push(`/admin/${page}`);
  }

  return (
    <Form
      action={`/admin/${page}`}
      className="w-full h-fit flex flex-col gap-2.5 "
    >
      <div className="w-full h-fit relative">
        <input
          type="text"
          name="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Enter ${placeholders[page]}...`}
          autoSave="off"
          className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-base text-white placeholder:text-white/35 outline-none transition focus:border-emerald-400/70 focus:ring-2 focus:ring-emerald-400/20"
        />
        {query && query.length > 3 && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute top-0 right-22  h-full text-white font-semibold hover:text-red-300"
          >
            <CiCircleRemove size={28} />{" "}
          </button>
        )}
        <button className="absolute top-0 right-0 w-fit h-full z-30 rounded-2xl border border-white/40 bg-slate-950/40 px-4 text-base text-white placeholder:text-white/35 outline-none transition hover:border-emerald-400/70 hover:ring-2 hover:ring-emerald-400/20">
          Search
        </button>
      </div>
    </Form>
  );
};
