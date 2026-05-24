import Image from "next/image";
import { HiBadgeCheck } from "react-icons/hi";
import { BiTestTube } from "react-icons/bi";
import { FaShippingFast } from "react-icons/fa";
import heroPack from "@/public/heroPackk.png";
import OnScroll from "./components/OnScroll";
import { Montserrat } from "next/font/google";
import Cards from "./markets/components/Cards";
import { auth } from "@/auth";
import type { product } from "@/apptypes/types";
import Link from "next/link";
import { apiUrl } from "@/lib/siteUrl";

const montserrat = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export default async function Home() {
  const session = await auth();
  const res = await fetch(apiUrl("/api/products?isFeatured=true"));

  const data = await res.json();

  const featuredProducts = (data.products ?? []) as product[];

  return (
    <main
      className={`${montserrat.className} ${montserrat.style} relative z-1 mt-18.25 w-full overflow-hidden px-3 pb-8 text-white sm:px-4 lg:px-6 md:mt-20`}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-10%] top-[-8%] h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="absolute right-[-8%] top-[12%] h-80 w-80 rounded-full bg-lime-300/10 blur-3xl" />
        <div className="absolute bottom-[12%] left-[18%] h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      <section className="min-h-screen py-6 sm:py-10 flex  flex-col">
        <OnScroll>
          <div className="mx-auto grid min-h-[calc(100vh-9rem)] w-full max-w-6xl items-center gap-8 rounded-4xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl sm:p-6 lg:p-8">
            <div className=" h-full grid grid-cols-1 mg:grid-cols-2 justify-center rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.22),transparent_34%),linear-gradient(180deg,rgba(6,7,10,0.92),rgba(6,7,10,0.55))] p-6 shadow-[0_0_80px_rgba(16,185,129,0.08)] sm:p-8 lg:p-10">
              <div className="w-full h-fit flex flex-col ">
                <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest sm:tracking-[0.3em] text-emerald-200">
                  Nutrition made sharper
                </div>
                <h1 className="max-w-xl text-2xl font-black uppercase leading-[0.92]  sm:text-5xl lg:text-6xl xl:text-7xl">
                  Build a stronger routine.
                  <span className="mt-3 block text-emerald-300 drop-shadow-[0_0_18px_rgba(74,222,128,0.45)]">
                    Fuel every rep.
                  </span>
                </h1>
                <p className="mt-5 max-w-xl text-sm leading-7 text-white/70 sm:text-base lg:text-lg">
                  Premium supplements and nutrition essentials designed to
                  support muscle growth, recovery, and daily energy without
                  making the storefront feel heavy.
                </p>
                <div className="mt-7 flex flex-wrap gap-3 justify-center sm:justify-start">
                  <Link
                    href="/markets"
                    className="rounded-xl bg-white px-5 py-3 text-sm font-semibold uppercase text-black transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    View products
                  </Link>
                  <Link
                    href="/goals"
                    className="rounded-xl border border-emerald-300/40 bg-emerald-400/15 px-5 py-3 text-sm font-semibold uppercase text-emerald-100 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-emerald-400/25"
                  >
                    Explore goals
                  </Link>
                </div>
              </div>
              <div className="relative w-full self-center max-w-xl">
                <Image
                  src={heroPack}
                  alt="HeroPackPng"
                  className="h-auto w-full drop-shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
                  placeholder="blur"
                  priority
                />
              </div>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3 col-span-1 mg:col-span-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.25em] text-white/45">
                  Fast delivery
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
                  24-48 hours
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.25em] text-white/45">
                  Clean formulas
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
                  Lab tested
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.25em] text-white/45">
                  Support
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
                  Smart guidance
                </p>
              </div>
            </div>
          </div>
        </OnScroll>
      </section>
      <OnScroll>
        <section className="min-h-screen py-6 sm:py-10">
          <div className="mx-auto flex min-h-[calc(100vh-9rem)] w-full max-w-6xl flex-col justify-center rounded-4xl border border-white/10 bg-black/20 p-4 backdrop-blur-xl sm:p-6 lg:p-8">
            <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300/90 sm:text-sm">
                  Featured selection
                </p>
                <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                  Featured Products
                </h2>
              </div>
              <Link
                href="/markets"
                className="w-fit rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold uppercase text-white/90 transition-colors duration-200 hover:bg-white/10"
              >
                See all
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {featuredProducts.map((product) => (
                <Cards key={product._id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </OnScroll>
      <OnScroll>
        <section className="min-h-screen py-6 sm:py-10">
          <div className="mx-auto flex min-h-[calc(100vh-9rem)] w-full max-w-6xl items-center rounded-4xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl sm:p-6 lg:p-8">
            <div className="w-full">
              <div className="mb-6 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300/90 sm:text-sm">
                  What we offer
                </p>
                <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                  Built for better performance
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
                  Every part of the store is designed to make the shopping
                  experience feel fast, reliable, and focused on real results.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <OnScroll>
                  <div className="flex h-full flex-col justify-center rounded-3xl border border-white/10 bg-black/20 p-6 text-center shadow-[0_0_60px_rgba(16,185,129,0.08)]">
                    <h3 className="flex items-center justify-center gap-2 text-xl font-bold text-white">
                      <HiBadgeCheck size={24} color="white" />
                      Guarantee
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-white/70">
                      If you're not completely satisfied with your purchase, we
                      offer a hassle-free money-back guarantee.
                    </p>
                  </div>
                </OnScroll>

                <OnScroll>
                  <div className="flex h-full flex-col justify-center rounded-3xl border border-white/10 bg-black/20 p-6 text-center shadow-[0_0_60px_rgba(16,185,129,0.08)]">
                    <h3 className="flex items-center justify-center gap-2 text-xl font-bold text-white">
                      <BiTestTube size={24} color="white" />
                      Lab Tested
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-white/70">
                      Every product is independently tested to ensure purity,
                      potency, and safety.
                    </p>
                  </div>
                </OnScroll>

                <OnScroll>
                  <div className="flex h-full flex-col justify-center rounded-3xl border border-white/10 bg-black/20 p-6 text-center shadow-[0_0_60px_rgba(16,185,129,0.08)] sm:col-span-2 lg:col-span-1">
                    <h3 className="flex items-center justify-center gap-2 text-xl font-bold text-white">
                      <FaShippingFast size={24} color="white" />
                      Free Shipping
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-white/70">
                      Enjoy fast and secure delivery on all orders over $50.
                    </p>
                  </div>
                </OnScroll>
              </div>
            </div>
          </div>
        </section>
      </OnScroll>
    </main>
  );
}
