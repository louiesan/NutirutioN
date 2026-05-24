import React from "react";

export const CreatorIteration = ({
  index,
  indexAction,
}: {
  index: number;
  indexAction: (index: number) => void;
}) => {
  return (
    <div className="w-full h-fit flex flex-nowrap items-center justify-center my-2.5">
      <div
        onClick={() => indexAction(index > 0 ? index - 1 : index)}
        className={`w-7.5 h-7.5 relative ${index > 0 ? "bg-indigo-400 text-white animate-pulse" : "bg-slate-600 text-gray-300"} flex items-center justify-center rounded-full font-semibold before:absolute before:text-xs  before:-bottom-4 before:-left-0.5 before:content-["Details"] before:text-slate-600`}
      >
        1
      </div>
      <div
        className={`w-12.5 h-1 ${index > 0 ? "bg-indigo-400 text-white" : "bg-slate-400 text-gray-300"}`}
      />
      <div
        onClick={() => indexAction(index > 1 ? index - 1 : index)}
        className={`w-7.5 h-7.5 relative ${index > 1 ? "bg-indigo-400 text-white animate-pulse" : "bg-slate-600 text-gray-300"} flex items-center justify-center rounded-full font-semibold before:absolute before:text-xs  before:-bottom-4 before:-left-3.5 before:content-["Properties"] before:text-slate-600`}
      >
        2
      </div>
      <div
        className={`w-12.5 h-1 ${index > 1 ? "bg-indigo-400 text-white" : "bg-slate-400 text-gray-300"}`}
      />
      <div
        onClick={() => indexAction(index > 2 ? index - 1 : index)}
        className={`w-7.5 h-7.5 relative ${index > 2 ? "bg-indigo-400 text-white animate-pulse" : "bg-slate-600 text-gray-300"} flex items-center justify-center rounded-full font-semibold before:absolute before:text-xs  before:-bottom-4 before:-left-2 before:content-["Finalize"] before:text-slate-600`}
      >
        3
      </div>
    </div>
  );
};
