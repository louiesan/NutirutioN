import { cart } from "@/apptypes/types";
import Image from "next/image";
import { useContext } from "react";
import { CheckoutContext } from "../context/checkoutcontext";
import { Loader2 } from "lucide-react";

export default function OrderSummary() {
  const {
    cart,
    price,
    order,
    handlePlaceOrder,
    handleGetPromoCode,
    handleChange,
    promoDis,
    loading,
    isCode,
  } = useContext(CheckoutContext);

  return (
    <div className="w-full h-fit flex flex-col gap-2.5 md:sticky md:top-24">
      <div className="w-full h-fit flex flex-col gap-2.5 rounded-3xl border border-white/15 bg-black/25 p-4 backdrop-blur-xl shadow-[0_18px_45px_rgba(0,0,0,0.35)] sm:p-6">
        <h4 className="text-white font-semibold text-2xl capitalize text-left mb-1">
          Order Summary
        </h4>
        <h5 className="text-white/90 font-medium text-base uppercase tracking-[0.18em]">
          Order Content
        </h5>
        <div className="w-full h-full max-h-64 flex flex-col gap-2 overflow-y-auto pr-1">
          {cart && cart.length > 0
            ? cart.map((ele) =>
                !ele.isBundle ? (
                  <div
                    key={ele.id}
                    className="w-full h-full p-2 grid grid-cols-[64px_1fr] gap-2 rounded-2xl border border-white/10 bg-black/25"
                  >
                    <Image
                      src={ele.image}
                      alt={`${ele.name}_png`}
                      width={60}
                      height={60}
                      className="rounded-lg w-full h-full object-cover"
                    />
                    <div className="w-full h-full flex flex-col justify-between">
                      <h5 className="text-white text-sm sm:text-base font-semibold">
                        {ele.name}
                      </h5>
                      <p className="text-white/75 flex flex-row flex-nowrap items-center justify-start gap-1.5 text-xs sm:text-sm">
                        <span>Quantity:</span>
                        {ele.quantity}
                      </p>
                      <p className="text-white/75 flex flex-row flex-nowrap items-center justify-start gap-1.5 text-xs sm:text-sm">
                        <span>Price:</span>
                        {ele.price} DA
                      </p>
                    </div>
                  </div>
                ) : null,
              )
            : null}
        </div>
      </div>
      <div className="w-full flex flex-col gap-1 relative rounded-3xl border border-white/15 bg-black/25 p-4 backdrop-blur-xl shadow-[0_18px_45px_rgba(0,0,0,0.35)] sm:p-6">
        <label
          htmlFor="fullname"
          className="text-sm font-semibold uppercase tracking-[0.16em] text-white/85"
        >
          Promo Code
        </label>
        <input
          type="text"
          name="promoCode"
          onChange={(e) => handleChange("promoCode", e.target.value)}
          placeholder="Enter a Code"
          className="w-full rounded-xl border border-white/15 bg-black/35 px-3 py-2.5 text-base text-white outline-none transition-all duration-200 placeholder:text-white/35 focus:border-emerald-300/70 focus:ring-2 focus:ring-emerald-300/25"
        />
        <button
          onClick={async () => {
            await handleGetPromoCode(order.promoCode!);
          }}
          disabled={loading || !order.promoCode}
          className={`text-white ${loading ? "opacity-40" : "opacity-100"} min-w-24 px-3 py-2 rounded-lg flex flex-row flex-nowrap items-center justify-center gap-1.5 bg-transparent border border-white/35 hover:border-emerald-300/70 hover:bg-emerald-400/20 transition-all ease-in duration-300 cursor-pointer`}
        >
          Apply
          {loading && <Loader2 className="animate-spin text-white" size={23} />}
        </button>
        {isCode && isCode.length > 0 && (
          <p className="text-red-500 text-sm mt-0.5">{isCode}</p>
        )}
      </div>
      <div className="w-full h-fit flex flex-col gap-2.5 rounded-3xl border border-white/15 bg-black/25 p-4 backdrop-blur-xl shadow-[0_18px_45px_rgba(0,0,0,0.35)] sm:p-6">
        <h4 className="text-white font-semibold text-2xl capitalize text-left mb-1">
          Order Total
        </h4>

        <div className="w-full h-fit flex flex-row flex-nowrap items-center justify-between text-white font-normal border-b border-white/10 pb-2">
          <span>
            <strong>Subtotal {cart?.length || 0} items :</strong>
          </span>
          <span>{price.toFixed(2)} DA</span>
        </div>
        <div className="w-full h-fit flex flex-row flex-nowrap items-center justify-between text-white font-normal border-b border-white/10 pb-2">
          <span>
            <strong>Shipping :</strong>
          </span>
          <span>
            {order.shipping !== null
              ? `${order.shipping === 0 ? "Free Shipping!" : `${order.shipping} DA`}`
              : "add address for shipping!"}
          </span>
        </div>
        {!isCode && promoDis > 0 && (
          <div className="w-full h-fit flex flex-row flex-nowrap items-center justify-between text-white font-normal border-b border-white/10 pb-2">
            <span>
              <strong>Discount :</strong>
            </span>
            <span>-{((promoDis * price) / 100).toFixed(2)} DA</span>
          </div>
        )}
        <div className="w-full h-fit flex flex-row flex-nowrap items-center justify-between text-white font-semibold text-lg pt-1">
          <span>
            <strong>Total :</strong>
          </span>
          <span>{order.totalPrice.toFixed(2)} DA</span>
        </div>
        <button
          disabled={loading}
          onClick={handlePlaceOrder}
          className={`w-full ${loading ? "opacity-40" : "opacity-100"} border border-emerald-300/40 hover:border-emerald-300 flex flex-row flex-nowrap items-center justify-center gap-2.5 bg-emerald-400/15 hover:bg-emerald-300 text-emerald-100 hover:text-black shadow-md shadow-emerald-800/20 transition-all ease-in duration-300 cursor-pointer self-center font-bold py-2.5 px-4 rounded-xl mt-1.5`}
        >
          Place Order{" "}
          {loading && <Loader2 className="animate-spin text-white" size={23} />}
        </button>
      </div>
    </div>
  );
}
