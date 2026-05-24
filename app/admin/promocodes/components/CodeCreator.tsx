import { promocode } from "@/apptypes/types";
import { useContext, useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { adminContext } from "../../context/adminContext";
import { Loader2 } from "lucide-react";

export const CodeCreator = ({ closAction }: { closAction: () => void }) => {
  const { createPromocode } = useContext(adminContext);
  const [promoCode, setPromoCode] = useState({} as promocode);
  const [loading, setLoading] = useState<boolean>(false);

  async function handlePost() {
    if (
      !promoCode.discountPercentage ||
      !promoCode.expiresAt ||
      !promoCode.usageLimits ||
      !promoCode.promoCode
    )
      return;
    try {
      setLoading(true);
      await createPromocode(promoCode);
      closAction();
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  }

  function handleChange(key: string, value: number | string) {
    setPromoCode((pre) => ({
      ...pre,
      [key]: value,
    }));
  }

  console.log(promoCode);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md"
      onClick={closAction}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.18),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.12),transparent_28%)]" />
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/40 bg-slate-900/80 backdrop-blur-lg drop-shadow-lg drop-shadow-white/10 p-6 text-white shadow-2xl shadow-black/40"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_26%)]" />
        <div className="relative flex items-start justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-300/80">
              Promo codes
            </p>
            <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">
              Create Promo Code
            </h2>
          </div>
          <button
            className="rounded-full border border-white/10 bg-white/5 p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
            onClick={closAction}
            aria-label="Close promo code creator"
          >
            <FaWindowClose size={28} />
          </button>
        </div>
        <div className="relative mt-6 flex flex-col gap-3">
          <label
            htmlFor="promocode"
            className="text-sm font-medium text-white/80"
          >
            Promo Code
          </label>
          <input
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            type="text"
            id="promocode"
            name="promoCode"
            placeholder="Enter promo code"
            className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-base text-white placeholder:text-white/35 outline-none transition focus:border-emerald-400/70 focus:ring-2 focus:ring-emerald-400/20"
          />
          <p className="text-sm text-white/45">
            Use a short, memorable code that fits your campaign.
          </p>
        </div>
        <div className="relative mt-6 flex flex-col gap-3">
          <label
            htmlFor="expiresAt"
            className="text-sm font-medium text-white/80"
          >
            Expiration Time
          </label>
          <input
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            type="date"
            id="expiresAt"
            name="expiresAt"
            max="2060-12-31"
            placeholder="Enter expiration time"
            className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-base text-white placeholder:text-white/35 outline-none transition focus:border-emerald-400/70 focus:ring-2 focus:ring-emerald-400/20"
          />
          <p className="text-sm text-white/45">
            Set the time when the promo code will expire.
          </p>
        </div>
        <div className="w-full h-fit grid grid-cols-2 mt-6">
          <div className="relative flex flex-col gap-3">
            <label
              htmlFor="discountPercentage"
              className="text-sm font-medium text-white/80"
            >
              percentage off
            </label>
            <input
              onChange={(e) =>
                handleChange(e.target.name, Number(e.target.value))
              }
              type="number"
              name="discountPercentage"
              id="discountPercentage"
              max="100"
              placeholder="20 for 20% off"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-base text-white placeholder:text-white/35 outline-none transition focus:border-emerald-400/70 focus:ring-2 focus:ring-emerald-400/20"
            />
            <p className="text-sm text-white/45">
              Set the percentage off for the promo code.
            </p>
          </div>
          <div className="relative flex flex-col gap-3">
            <label
              htmlFor="usageLimit"
              className="text-sm font-medium text-white/80"
            >
              Usage Limit
            </label>
            <input
              onChange={(e) =>
                handleChange(e.target.name, Number(e.target.value))
              }
              type="number"
              id="usageLimit"
              name="usageLimits"
              min="1"
              placeholder="Enter usage limit"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-base text-white placeholder:text-white/35 outline-none transition focus:border-emerald-400/70 focus:ring-2 focus:ring-emerald-400/20"
            />
            <p className="text-sm text-white/45">
              Set the maximum number of times the promo code can be used.
            </p>
          </div>
        </div>
        <button
          onClick={async () => await handlePost()}
          disabled={loading}
          className={`${loading ? "opacity-70" : "opacity-100"} mt-6 w-full rounded-2xl bg-emerald-500/80 py-3 text-base font-medium text-white hover:bg-emerald-500/90 focus:outline-none focus:ring-2 focus:ring-emerald-400/20`}
        >
          Create Promo Code{" "}
          {loading && (
            <span className="text-white animate-spin">
              <Loader2 size={25} />
            </span>
          )}
        </button>
      </div>
    </div>
  );
};
