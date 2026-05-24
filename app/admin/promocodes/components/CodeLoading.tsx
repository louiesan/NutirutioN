import React from "react";

export const CodeLoading = () => {
  return (
    <div className="w-fit h-fit flex flex-col items-center justify-between gap-2.5 p-2.5 bg-white/10 rounded-md border border-white/40">
      <div className="w-full h-32 rounded-md p-1.5 place-items-center place-content-center bg-slate-950/20 animate-pulse"></div>
      <div className="w-full h-fit flex flex-nowrap items-center justify-center gap-2.5">
        <span className="w-full h-5 bg-slate950/20 animate-pulse"></span>
      </div>
      <div className="w-full h-fit flex flex-nowrap items-center justify-center gap-2.5">
        <span className="w-full h-5 bg-slate950/20 animate-pulse"></span>

        <span className="w-full h-5 bg-slate950/20 animate-pulse"></span>
      </div>
      <div className="w-full h-fit flex flex-nowrap items-center justify-center gap-2.5">
        <span className="w-full h-5 bg-slate950/20 animate-pulse"></span>
      </div>
    </div>
  );
};
