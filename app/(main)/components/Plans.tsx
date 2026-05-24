import { CheckCircle2, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type GoalPlan = {
  title: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  sections: Array<{
    title: string;
    description: string;
    product: {
      productId: string;
      image: string;
      customTitle: string;
      highlights: string[];
    };
  }>;
  image: string;
};

export default function Plans({ goal }: { goal: GoalPlan }) {
  return (
    <div className="group w-full h-full flex flex-col justify-between rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.15),transparent_60%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6 backdrop-blur-xl shadow-lg shadow-black/40 transition-all duration-300 hover:border-emerald-400/40 hover:shadow-emerald-500/20">
      {/* Badge */}
      <div className="mb-4">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-200">
          <Sparkles size={12} />
          Goal plan
        </div>
      </div>
      <div className="mb-6 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <Image
          src={goal.image}
          alt={goal.title}
          width={500}
          height={300}
          className="h-48 w-full object-cover"
        />
      </div>
      <h1 className="text-white font-bold text-2xl sm:text-3xl mb-2 leading-tight">
        {goal.title}
      </h1>

      <p className="text-sm text-white/70 mb-1 leading-relaxed">
        {goal.shortDescription}
      </p>

      <ul className="flex flex-col gap-3 mb-2.5">
        {goal.sections.map((section, index) => (
          <li
            key={index}
            className="flex items-start gap-2.5 text-white/80 text-sm"
          >
            <CheckCircle2
              size={16}
              className="text-emerald-300 mt-0.5 shrink-0"
            />
            <span>{section.product.customTitle}</span>
          </li>
        ))}
      </ul>

      <Link
        href={`/goals/${goal.slug}`}
        className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-400/10 border border-emerald-400/25 px-4 py-2.5 text-sm font-semibold text-emerald-100 transition-all duration-200 hover:bg-emerald-400/20 hover:border-emerald-400/40 active:scale-95"
      >
        View Plan
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
