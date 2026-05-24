"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ImagePlus,
  Plus,
  Save,
  Sparkles,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";

type ProductItem = {
  _id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  images: Array<{ url: string }>;
};

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

type GoalDocument = {
  _id?: string;
  title: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  sections: GoalSection[];
  image: string;
};

type GoalDraft = {
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
      highlights: string;
    };
  }>;
  image: string;
};

const emptyDraft = (products: ProductItem[]): GoalDraft => {
  const firstProduct = products[0];
  const firstImage = firstProduct?.images?.[0]?.url || "";

  return {
    title: "",
    slug: "",
    shortDescription: "",
    longDescription: "",
    image: "",
    sections: [
      {
        title: "",
        description: "",
        product: {
          productId: firstProduct?._id || "",
          image: firstImage,
          customTitle: firstProduct?.name || "",
          highlights: "",
        },
      },
    ],
  };
};

const draftFromGoal = (goal: GoalDocument): GoalDraft => ({
  title: goal.title || "",
  slug: goal.slug || "",
  shortDescription: goal.shortDescription || "",
  longDescription: goal.longDescription || "",
  image: goal.image || "",
  sections:
    goal.sections.length > 0
      ? goal.sections.map((section) => ({
          title: section.title || "",
          description: section.description || "",
          product: {
            productId: section.product?.productId || "",
            image: section.product?.image || "",
            customTitle: section.product?.customTitle || "",
            highlights: Array.isArray(section.product?.highlights)
              ? section.product.highlights.join(", ")
              : "",
          },
        }))
      : [
          {
            title: "",
            description: "",
            product: {
              productId: "",
              image: "",
              customTitle: "",
              highlights: "",
            },
          },
        ],
});

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export default function GoalsManager({
  initialGoals,
  initialProducts,
}: {
  initialGoals: GoalDocument[];
  initialProducts: ProductItem[];
}) {
  const [goals, setGoals] = useState<GoalDocument[]>(initialGoals);
  const [products] = useState<ProductItem[]>(initialProducts);
  const [draft, setDraft] = useState<GoalDraft>(
    initialGoals.length > 0
      ? draftFromGoal(initialGoals[0])
      : emptyDraft(initialProducts),
  );
  const [selectedSlug, setSelectedSlug] = useState<string>(
    initialGoals[0]?.slug || "new",
  );
  const [editingSlug, setEditingSlug] = useState<string | null>(
    initialGoals[0]?.slug || null,
  );
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string>("");

  const selectedGoal = useMemo(
    () => goals.find((goal) => goal.slug === editingSlug) || null,
    [editingSlug, goals],
  );

  const openGoal = (goal: GoalDocument) => {
    setDraft(draftFromGoal(goal));
    setEditingSlug(goal.slug);
    setSelectedSlug(goal.slug);
    setFeedback("");
  };

  const startNewGoal = () => {
    setDraft(emptyDraft(products));
    setEditingSlug(null);
    setSelectedSlug("new");
    setFeedback("");
  };

  const updateDraft = <K extends keyof GoalDraft>(
    key: K,
    value: GoalDraft[K],
  ) => {
    setDraft((current) => ({ ...current, [key]: value }));
  };

  const updateSection = (
    index: number,
    key: "title" | "description",
    value: string,
  ) => {
    setDraft((current) => {
      const sections = [...current.sections];
      sections[index] = {
        ...sections[index],
        [key]: value,
      };
      return { ...current, sections };
    });
  };

  const updateSectionProduct = (
    index: number,
    key: "productId" | "image" | "customTitle" | "highlights",
    value: string,
  ) => {
    setDraft((current) => {
      const sections = [...current.sections];
      sections[index] = {
        ...sections[index],
        product: {
          ...sections[index].product,
          [key]: value,
        },
      };
      return { ...current, sections };
    });
  };

  const onProductPick = (sectionIndex: number, productId: string) => {
    const product = products.find((item) => item._id === productId);
    const image = product?.images?.[0]?.url || "";

    setDraft((current) => {
      const sections = [...current.sections];
      sections[sectionIndex] = {
        ...sections[sectionIndex],
        product: {
          productId,
          image,
          customTitle: product?.name || "",
          highlights: sections[sectionIndex].product.highlights,
        },
      };
      return { ...current, sections };
    });
  };

  const addSection = () => {
    const firstProduct = products[0];
    setDraft((current) => ({
      ...current,
      sections: [
        ...current.sections,
        {
          title: "",
          description: "",
          product: {
            productId: firstProduct?._id || "",
            image: firstProduct?.images?.[0]?.url || "",
            customTitle: firstProduct?.name || "",
            highlights: "",
          },
        },
      ],
    }));
  };

  const removeSection = (index: number) => {
    setDraft((current) => ({
      ...current,
      sections: current.sections.filter(
        (_, sectionIndex) => sectionIndex !== index,
      ),
    }));
  };

  const saveGoal = async () => {
    setSaving(true);
    setFeedback("");

    const payload = {
      title: draft.title,
      slug: draft.slug || slugify(draft.title),
      shortDescription: draft.shortDescription,
      longDescription: draft.longDescription,
      image: draft.image,
      sections: draft.sections.map((section) => ({
        title: section.title,
        description: section.description,
        product: {
          productId: section.product.productId,
          image: section.product.image,
          customTitle: section.product.customTitle,
          highlights: section.product.highlights
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
        },
      })),
    };

    try {
      const isEditing = Boolean(editingSlug);
      const response = await fetch(
        isEditing ? `/api/goals/${editingSlug}` : "/api/goals",
        {
          method: isEditing ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.msg || "Failed to save goal");
      }

      const normalizedGoal: GoalDocument = result;

      setGoals((current) => {
        if (isEditing && editingSlug) {
          return current.map((goal) =>
            goal.slug === editingSlug ? normalizedGoal : goal,
          );
        }

        return [normalizedGoal, ...current];
      });

      setDraft(draftFromGoal(normalizedGoal));
      setEditingSlug(normalizedGoal.slug);
      setSelectedSlug(normalizedGoal.slug);
      toast.success(isEditing ? "Goal updated!" : "Goal created!", {
        duration: 2000,
        icon: "✅",
      });
    } catch (error) {
      setFeedback(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 text-white">
      <section className="rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.18),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-6 shadow-xl shadow-black/20 backdrop-blur-xl sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300/80">
              Goal manager
            </p>
            <h1 className="mt-2 text-3xl font-black leading-tight sm:text-5xl">
              Edit, create, and expand your goals
            </h1>
            <p className="mt-3 text-sm leading-7 text-white/70 sm:text-base">
              Each section can point to a product, so you can grow the plan with
              more product blocks or create brand new goals.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:min-w-90">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-white/45">
                Goals
              </p>
              <p className="mt-2 text-2xl font-bold text-emerald-300">
                {goals.length}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-white/45">
                Products
              </p>
              <p className="mt-2 text-2xl font-bold text-emerald-300">
                {products.length}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-white/45">
                Mode
              </p>
              <p className="mt-2 text-sm font-semibold text-white">
                {editingSlug ? "Editing existing" : "Creating new"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr] relative">
        <aside className="space-y-4 h-fit xl:sticky xl:top-10 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300/80">
                Goals list
              </p>
              <h2 className="mt-1 text-2xl font-bold text-white">All goals</h2>
            </div>

            <button
              type="button"
              onClick={startNewGoal}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-emerald-300"
            >
              <Plus size={16} />
              New goal
            </button>
          </div>

          <div className="space-y-3">
            {goals.length > 0 ? (
              goals.map((goal) => (
                <button
                  key={goal.slug}
                  type="button"
                  onClick={() => openGoal(goal)}
                  className={`w-full rounded-2xl border p-4 text-left transition ${selectedSlug === goal.slug ? "border-emerald-400/50 bg-emerald-400/10" : "border-white/10 bg-black/20 hover:border-emerald-400/30 hover:bg-white/5"}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5">
                      {goal.image ? (
                        <Image
                          src={goal.image}
                          alt={goal.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-white/40">
                          <ImagePlus size={18} />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-base font-semibold text-white">
                            {goal.title}
                          </p>
                          <p className="mt-1 truncate text-sm text-white/55">
                            {goal.slug}
                          </p>
                        </div>
                        <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                          {goal.sections?.length || 0} sections
                        </span>
                      </div>

                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/65">
                        {goal.shortDescription}
                      </p>
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-white/10 p-6 text-center text-white/55">
                No goals found yet.
              </div>
            )}
          </div>
        </aside>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:p-6">
          <div className="flex flex-col gap-3 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300/80">
                Editor
              </p>
              <h2 className="mt-1 text-2xl font-bold text-white">
                {editingSlug
                  ? `Editing ${selectedGoal?.title || draft.title || "goal"}`
                  : "Create a new goal"}
              </h2>
            </div>

            <button
              type="button"
              onClick={saveGoal}
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={16} />
              {saving
                ? "Saving..."
                : editingSlug
                  ? "Save changes"
                  : "Create goal"}
            </button>
          </div>

          {feedback ? (
            <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/75">
              {feedback}
            </div>
          ) : null}

          <div className="mt-5 space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-white/90">
                  Title
                </label>
                <input
                  value={draft.title}
                  onChange={(e) => updateDraft("title", e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition hover:border-emerald-400/40 focus:border-emerald-400/60"
                  placeholder="Lean Muscle Stack"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-white/90">
                  Slug
                </label>
                <input
                  value={draft.slug}
                  onChange={(e) => updateDraft("slug", e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition hover:border-emerald-400/40 focus:border-emerald-400/60"
                  placeholder="lean-muscle-stack"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-white/90">
                Goal image URL
              </label>
              <input
                value={draft.image}
                onChange={(e) => updateDraft("image", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition hover:border-emerald-400/40 focus:border-emerald-400/60"
                placeholder="https://..."
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-white/90">
                  Short description
                </label>
                <textarea
                  value={draft.shortDescription}
                  onChange={(e) =>
                    updateDraft("shortDescription", e.target.value)
                  }
                  rows={5}
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition hover:border-emerald-400/40 focus:border-emerald-400/60"
                  placeholder="One line summary shown on the goal page"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-white/90">
                  Long description
                </label>
                <textarea
                  value={draft.longDescription}
                  onChange={(e) =>
                    updateDraft("longDescription", e.target.value)
                  }
                  rows={5}
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition hover:border-emerald-400/40 focus:border-emerald-400/60"
                  placeholder="Full explanation used in the goal details page"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300/80">
                    Sections
                  </p>
                  <h3 className="mt-1 text-xl font-bold text-white">
                    Add product blocks to this goal
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={addSection}
                  className="inline-flex items-center gap-2 cursor-pointer rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-emerald-400/40 hover:bg-white/10"
                >
                  <Plus size={16} />
                  Add section
                </button>
              </div>

              <div className="space-y-4">
                {draft.sections.map((section, index) => {
                  const selectedProduct = products.find(
                    (product) => product._id === section.product.productId,
                  );
                  const sectionPreview =
                    section.product.image ||
                    selectedProduct?.images?.[0]?.url ||
                    "";

                  return (
                    <article
                      key={`${index}-${section.title}`}
                      className="rounded-3xl border border-white/10 bg-black/20 p-4 sm:p-5"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/45">
                            Section {index + 1}
                          </p>
                          <h4 className="mt-1 text-lg font-semibold text-white">
                            {section.title || "Untitled section"}
                          </h4>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeSection(index)}
                          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white transition hover:border-rose-400/40 hover:text-rose-300"
                        >
                          <Trash2 size={16} />
                          Remove
                        </button>
                      </div>

                      <div className="mt-4 grid gap-4">
                        <div className="space-y-3 grid grid-cols-2 gap-2.5">
                          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                            {sectionPreview ? (
                              <Image
                                src={sectionPreview}
                                alt={
                                  section.product.customTitle ||
                                  section.title ||
                                  "Product preview"
                                }
                                width={700}
                                height={700}
                                className="h-56 w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-56 items-center justify-center text-white/40">
                                <ImagePlus size={28} />
                              </div>
                            )}
                          </div>

                          <div className="rounded-2xl h-fit border border-white/10 bg-black/20 p-4">
                            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300/80">
                              <Sparkles size={14} />
                              Preview
                            </div>
                            <p className="mt-3 text-sm font-semibold text-white">
                              {section.product.customTitle ||
                                "No product selected"}
                            </p>
                            <p className="mt-1 text-sm leading-6 text-white/60">
                              {selectedProduct?.category ||
                                "Choose a product to auto-fill the preview"}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="grid gap-4 ">
                            <div>
                              <label className="mb-2 block text-sm font-semibold text-white/90">
                                Section title
                              </label>
                              <input
                                value={section.title}
                                onChange={(e) =>
                                  updateSection(index, "title", e.target.value)
                                }
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition hover:border-emerald-400/40 focus:border-emerald-400/60"
                                placeholder="Performance Base"
                              />
                            </div>

                            <div>
                              <label className="mb-2 block text-sm font-semibold text-white/90">
                                Product
                              </label>
                              <select
                                value={section.product.productId}
                                onChange={(e) =>
                                  onProductPick(index, e.target.value)
                                }
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition hover:border-emerald-400/40 focus:border-emerald-400/60"
                              >
                                <option value="">Select a product</option>
                                {products.map((product) => (
                                  <option key={product._id} value={product._id}>
                                    {product.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="mb-2 block text-sm font-semibold text-white/90">
                              Section description
                            </label>
                            <textarea
                              value={section.description}
                              onChange={(e) =>
                                updateSection(
                                  index,
                                  "description",
                                  e.target.value,
                                )
                              }
                              rows={4}
                              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition hover:border-emerald-400/40 focus:border-emerald-400/60"
                              placeholder="Explain what this product block does"
                            />
                          </div>

                          <div className="grid gap-4 md:grid-cols-2">
                            <div>
                              <label className="mb-2 block text-sm font-semibold text-white/90">
                                Product title
                              </label>
                              <input
                                value={section.product.customTitle}
                                onChange={(e) =>
                                  updateSectionProduct(
                                    index,
                                    "customTitle",
                                    e.target.value,
                                  )
                                }
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition hover:border-emerald-400/40 focus:border-emerald-400/60"
                                placeholder="Daily Stack Starter"
                              />
                            </div>

                            <div>
                              <label className="mb-2 block text-sm font-semibold text-white/90">
                                Product image URL
                              </label>
                              <input
                                value={section.product.image}
                                onChange={(e) =>
                                  updateSectionProduct(
                                    index,
                                    "image",
                                    e.target.value,
                                  )
                                }
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition hover:border-emerald-400/40 focus:border-emerald-400/60"
                                placeholder="https://..."
                              />
                            </div>
                          </div>

                          <div>
                            <label className="mb-2 block text-sm font-semibold text-white/90">
                              Highlights
                            </label>
                            <textarea
                              value={section.product.highlights}
                              onChange={(e) =>
                                updateSectionProduct(
                                  index,
                                  "highlights",
                                  e.target.value,
                                )
                              }
                              rows={3}
                              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition hover:border-emerald-400/40 focus:border-emerald-400/60"
                              placeholder="High protein, Fast absorption, Great taste"
                            />
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 border-t border-white/10 pt-5">
              <button
                type="button"
                onClick={saveGoal}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Save size={16} />
                {saving
                  ? "Saving..."
                  : editingSlug
                    ? "Save changes"
                    : "Create goal"}
              </button>

              <button
                type="button"
                onClick={startNewGoal}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-emerald-400/40 hover:bg-white/10"
              >
                <ArrowRight size={16} />
                Start a fresh goal
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
