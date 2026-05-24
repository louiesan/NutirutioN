"use client";

import { useAppSelector } from "@/redux/appstore/storeHooks/storeHooks";
import { redirect } from "next/navigation";
import PayForm from "./components/PayForm";
import { Montserrat } from "next/font/google";
import "./check.css";
import OrderSammury from "./components/OrderSummary";
import { SessionProvider } from "next-auth/react";
import CheckoutContextProvider from "./context/checkoutcontext";

const montserrat = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export default function CheckoutPage() {
  const cart = useAppSelector((state) => state.cartSlice.cart);

  if (cart.length === 0) {
    redirect("/cart");
  }

  return (
    <main
      className={`relative mt-18.25 w-full max-w-6xl mx-auto grid grid-cols-1 gap-4 px-3 pb-8 sm:px-4 lg:px-6 md:mt-20 md:grid-cols-[1.05fr_0.95fr] ${montserrat.className}`}
    >
      <div className="md:col-span-2 rounded-3xl border border-white/40 bg-slate-900/30 px-4 py-5 backdrop-blur-xl sm:px-6 shadow-lg shadow-white/5">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300/90 sm:text-sm">
          Secure checkout
        </p>
        <h2 className="mt-2 text-3xl font-black uppercase text-white sm:text-4xl">
          Complete your order
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-white/65 sm:text-base">
          Fill your delivery details, choose your payment method, and review
          your order before placing it.
        </p>
      </div>
      <SessionProvider>
        <CheckoutContextProvider>
          <PayForm />
          <OrderSammury />
        </CheckoutContextProvider>
      </SessionProvider>
    </main>
  );
}
