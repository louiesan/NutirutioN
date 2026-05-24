"use client";
import { useState } from "react";
import { Search } from "../../users/components/Search";
import { CodeCreator } from "./CodeCreator";

export const CodeMang = () => {
  const [isCopen, setIsCopen] = useState(false);

  return (
    <div className="w-full h-fit flex flex-col ms:grid ms:grid-cols-[1fr_200px] items-center gap-1.5">
      <h3 className="text-white font-medium text-2xl mb-2.5 col-span-2">
        Search for a promocode:
      </h3>
      <Search page="promocodes" />
      <div className="w-full h-full flex items-center justify-center">
        <button
          onClick={() => setIsCopen((pre) => !pre)}
          className="w-full px-2.5 py-1.5 text-white rounded-md text-2xl font-medium bg-green-400 cursor-pointer self-center hover:opacity-80 duration-300 ease-in-out"
        >
          Create Code
        </button>
      </div>
      {isCopen && <CodeCreator closAction={() => setIsCopen(false)} />}
    </div>
  );
};
