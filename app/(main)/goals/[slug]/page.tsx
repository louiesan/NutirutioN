import market from "@/data/market.json";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Layers3,
  Sparkles,
} from "lucide-react";
import OnScroll from "../../components/OnScroll";
import { apiUrl } from "@/lib/siteUrl";

type GoalSection = {
  title: string;
  description: string;
  product: {
    productId: string;
    image: string;
    customTitle: string;
    highlights: string[];
  };
};

type GoalPlan = {
  title: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  sections: GoalSection[];
  image: string;
};

const goals = market.Goals as GoalPlan[];

export function generateStaticParams() {
  return goals.map((goal) => ({ slug: goal.slug }));
}

export default async function GoalSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const res = await fetch(apiUrl(`/api/goals/${slug}`));
  const data = await res.json();
  const goal = data[0] as GoalPlan;

  return (
    <main className="relative w-full overflow-hidden px-3 pb-16 pt-20 text-white sm:px-4 lg:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-8%] top-[-6%] h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="absolute right-[-10%] top-[10%] h-80 w-80 rounded-full bg-lime-300/10 blur-3xl" />
        <div className="absolute bottom-[12%] left-[16%] h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <OnScroll>
          <section className="grid gap-8 rounded-4xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl sm:p-6 lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
            <div className="flex flex-col justify-between gap-6 rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.22),transparent_34%),linear-gradient(180deg,rgba(6,7,10,0.92),rgba(6,7,10,0.55))] p-6 shadow-[0_0_80px_rgba(16,185,129,0.08)] sm:p-8">
              <div className="space-y-5">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-200">
                  <Sparkles size={14} />
                  Goal blueprint
                </div>

                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300/80">
                    /goals/{goal.slug}
                  </p>
                  <h1 className="max-w-2xl text-3xl font-black uppercase leading-[0.92] sm:text-5xl lg:text-6xl">
                    {goal.title}
                  </h1>
                  <p className="max-w-2xl text-sm leading-7 text-white/70 sm:text-base lg:text-lg">
                    {goal.shortDescription}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/goals"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold uppercase text-white/90 transition-colors duration-200 hover:bg-white/10"
                  >
                    <ArrowLeft size={16} />
                    Back to goals
                  </Link>
                  <Link
                    href="/markets"
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-4 py-3 text-sm font-semibold uppercase text-black transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    Explore products
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.25em] text-white/45">
                    Route
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    /goals/{slug}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.25em] text-white/45">
                    Sections
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    {goal.sections.length} plan blocks
                  </p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/25">
              <Image
                src={goal.image}
                alt={goal.title}
                width={1200}
                height={1200}
                className="h-full min-h-80 w-full object-cover"
                priority
              />

              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/90 via-black/40 to-transparent p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-100/90">
                  <BadgeCheck size={14} />
                  Built from the Goals JSON structure
                </div>
                <p className="mt-2 max-w-lg text-sm leading-6 text-white/75">
                  {goal.longDescription}
                </p>
              </div>
            </div>
          </section>
        </OnScroll>

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <OnScroll>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-8">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-3 text-emerald-300">
                  <Layers3 size={20} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300/80">
                    Overview
                  </p>
                  <h2 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
                    What this plan is built to do
                  </h2>
                </div>
              </div>

              <p className="mt-5 text-sm leading-7 text-white/70 sm:text-base">
                {goal.longDescription}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {goal.sections.map((section) => (
                  <div
                    key={section.title}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4"
                  >
                    <p className="text-sm font-semibold text-white">
                      {section.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-white/65">
                      {section.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </OnScroll>

          <OnScroll>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-8">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-3 text-emerald-300">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300/80">
                    Highlights
                  </p>
                  <h2 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
                    Everything included in this goal
                  </h2>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {goal.sections.map((section, index) => (
                  <article
                    key={section.product.productId}
                    className="rounded-3xl border border-white/10 bg-black/20 p-4 sm:p-5"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/45">
                          Section {index + 1}
                        </p>
                        <h3 className="mt-1 text-lg font-semibold text-white">
                          {section.product.customTitle}
                        </h3>
                      </div>
                      <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                        Product ready
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-white/70">
                      {section.description}
                    </p>

                    <div className="mt-4 grid gap-4 md:grid-cols-[170px_1fr]">
                      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                        <Image
                          src={section.product.image}
                          alt={section.product.customTitle}
                          width={500}
                          height={500}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/45">
                          Product action
                        </p>
                        <Link
                          href={`/product/${section.product.productId}`}
                          className="mt-1 inline-flex items-center gap-2 rounded-xl border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-100 transition-colors duration-200 hover:bg-emerald-400/20"
                        >
                          Buy product
                          <ArrowRight size={16} />
                        </Link>
                        <p className="mt-2 text-sm leading-6 text-white/60">
                          Open the product page to add it to your cart or buy it
                          now.
                        </p>

                        <ul className="mt-4 space-y-2">
                          {section.product.highlights.map((highlight) => (
                            <li
                              key={highlight}
                              className="flex items-start gap-2 text-sm text-white/75"
                            >
                              <CheckCircle2
                                size={16}
                                className="mt-0.5 shrink-0 text-emerald-300"
                              />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </OnScroll>
        </section>

        <OnScroll>
          <section className="grid gap-6 rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(16,185,129,0.14),rgba(255,255,255,0.04))] p-6 backdrop-blur-xl sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-200/90">
                Next step
              </p>
              <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                Ready to turn this goal into a buying path?
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
                Browse the market catalog if you want to compare products, or go
                back to the goals overview to inspect another plan.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link
                href="/markets"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold uppercase text-black transition-transform duration-200 hover:-translate-y-0.5"
              >
                Market catalog
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/goals"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold uppercase text-white/90 transition-colors duration-200 hover:bg-white/10"
              >
                All goals
              </Link>
            </div>
          </section>
        </OnScroll>
      </div>
    </main>
  );
}
