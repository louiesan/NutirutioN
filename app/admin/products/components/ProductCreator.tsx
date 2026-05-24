"use client";
import { useContext, useEffect, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { CreatorIteration } from "./CreatorIteration";
import Image from "next/image";
import dummyCat from "@/data/market.json";
import { CircleX, Loader2, Plus, X } from "lucide-react";
import { adminContext } from "../../context/adminContext";
import { useRouter } from "next/navigation";

type ProductImage = {
  url: string;
  public_id: string;
};

type NutritionFactsState = {
  [key: string]: string | number | undefined;
  servingSize?: string;
  servingsPerContainer?: string | number;
  protein?: string;
  carbs?: string;
  fat?: string;
  calories?: string | number;
};

type FeaturedState = {
  [key: string]: string | number | boolean;
};

type ProductCreatorProps = {
  onCloseAction: () => void;
};

export const ProductCreator = ({ onCloseAction }: ProductCreatorProps) => {
  const {
    setProduct,
    product,
    badges,
    setBadgees,
    highlight,
    setHighlight,
    ingredient,
    createProduct,
    setIngredient,
  } = useContext(adminContext);

  const [step, setStep] = useState(0);
  const [images, setImages] = useState<ProductImage[]>([]);
  const [currBadge, setCurrBadge] = useState<string>("");
  const [currHighlight, setCurrHighlight] = useState<string>("");
  const [currIngredient, setCurrIngredient] = useState<string>("");
  const [nutritionFacts, setNutritionFacts] = useState<NutritionFactsState>({});

  const [error, setErrror] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [intro, setIntro] = useState<string>("");
  const [section, setSection] = useState<{ title: string; content: string }>({
    title: "",
    content: "",
  });
  const [sections, setSections] = useState<
    { title: string; content: string }[]
  >([]);
  const [conclusion, setConclusion] = useState<string>("");
  const [featured, setFeatured] = useState<FeaturedState>({});
  const categories = dummyCat.categories;
  const router = useRouter();
  useEffect(() => {
    setProduct((pre) => ({
      ...pre,
      longDescription: {
        intro,
        sections,
        conclusion,
      },
    }));
  }, [section, intro, conclusion]);

  useEffect(() => {
    setProduct((pre) => ({ ...pre, images: images }));
  }, [images]);

  useEffect(() => {
    setProduct((pre) => ({ ...pre, nutritionFacts: nutritionFacts }));
  }, [nutritionFacts]);

  useEffect(() => {
    setProduct((pre) => ({ ...pre, featured: featured }));
  }, [featured]);

  const handleItemsToRemove = (index: number, type: string) => {
    if (type === "images") {
      setImages((prevImages) =>
        prevImages.filter((_, ImageIndex) => index !== ImageIndex),
      );
      setProduct((pre) => ({
        ...pre,
        images: product.images.filter(
          (_, ImagesIndex) => index !== ImagesIndex,
        ),
      }));
    } else if (type === "badges") {
      setBadgees((prevBadges) =>
        prevBadges.filter((_, BadgeIndex) => index !== BadgeIndex),
      );
    } else if (type === "highlights") {
      setHighlight((prevHighlight) =>
        prevHighlight.filter((_, HighlightIndex) => index !== HighlightIndex),
      );
    } else if (type === "ingredients") {
      setIngredient((prevIngredient) =>
        prevIngredient.filter(
          (_, IngredientIndex) => index !== IngredientIndex,
        ),
      );
    }
  };

  const handleSubmit = () => {
    if (currBadge !== "") {
      setBadgees((pre) => [...pre, currBadge]);
      setCurrBadge("");
    }
    if (currHighlight !== "") {
      setHighlight((pre) => [...pre, currHighlight]);
      setCurrHighlight("");
    }
    if (currIngredient !== "") {
      setIngredient((pre) => [...pre, currIngredient]);
      setCurrIngredient("");
    }
  };

  const handleProductDetails = (key: string, value: string | number) => {
    setProduct((pre) => ({
      ...pre,
      [key]: value,
    }));
  };
  const handleNutritionFacts = (key: string, value: string | number) => {
    setNutritionFacts((pre) => ({
      ...pre,
      [key]: value,
    }));
  };
  const handleFeautured = (key: string, value: string | number | boolean) => {
    setFeatured((pre) => ({
      ...pre,
      [key]: value,
    }));
  };

  const handleNextStep = () => {
    if (step < 1) {
      const { name, brand, category, subCategory, stock, price } = product;
      if (
        !name ||
        !brand ||
        !category ||
        !subCategory ||
        !stock ||
        !price ||
        !(images.length > 0)
      ) {
        setErrror("Please fill all the fields");
        return;
      }
      setStep((pre) => pre + 1);
      setErrror("");
    }
    if (step < 2 && step > 0) {
      const {
        servingSize,
        servingsPerContainer,
        protein,
        carbs,
        fat,
        calories,
      } = nutritionFacts;
      if (
        !servingSize ||
        !servingsPerContainer ||
        !protein ||
        !carbs ||
        !fat ||
        !calories ||
        !highlight ||
        !ingredient ||
        !badges
      ) {
        setErrror("Please fill all the fields");
        return;
      }
      setStep((pre) => pre + 1);
      setErrror("");
    }
  };
  const handleCreateProduct = async () => {
    if (
      !product.shortDescription ||
      !product.longDescription.intro ||
      !product.longDescription.conclusion ||
      !(product.longDescription.sections.length > 0)
    ) {
      setErrror("Please fill all the * fields");
      return;
    }
    try {
      setLoading(true);
      await createProduct();
      router.push("/admin/products");
      onCloseAction();
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };
  console.log(product);

  return (
    <main className="fixed inset-0 z-120 flex items-center justify-center bg-slate-950/75 p-3 backdrop-blur-sm">
      <div
        className={`w-full ${loading ? "opacity-50 pointer-events-none" : ""} max-w-5xl max-h-[92vh] overflow-y-auto rounded-2xl border border-white/20 bg-slate-800/90 p-3 shadow-2xl shadow-black/50 sm:p-5`}
      >
        <div className="mb-4 flex items-start justify-between gap-3 border-b border-white/10 pb-3">
          <div>
            <h2 className="text-white font-semibold text-lg md:text-3xl">
              {step === 0
                ? "Product Details"
                : step === 1
                  ? "Product Properties"
                  : "Finalization"}
            </h2>
            <p className="text-sm text-slate-300">Step {step + 1} of 3</p>
          </div>
          {onCloseAction && (
            <button
              onClick={onCloseAction}
              className="rounded-md border border-white/15 bg-slate-900/60 p-2 text-white transition hover:border-white/40 hover:bg-slate-900"
              aria-label="Close product creator"
            >
              <X size={18} />
            </button>
          )}
        </div>
        <CreatorIteration
          indexAction={(index: number) => setStep(index)}
          index={step}
        />
        {step === 0 && (
          <div className="w-full h-fit flex flex-col items-center justify-center mt-5">
            <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 gap-2.5 mt-2.5">
              <CldUploadWidget
                onSuccess={(results) => {
                  const info = results?.info;

                  if (!info || typeof info === "string") return;

                  setImages((pre) => [
                    ...pre,
                    {
                      url: info.secure_url,
                      public_id: info.public_id,
                    },
                  ]);

                  setProduct((pre) => ({
                    ...pre,
                    images: [
                      ...pre.images,
                      {
                        url: info.secure_url,
                        public_id: info.public_id,
                      },
                    ],
                  }));
                }}
                signatureEndpoint="/api/sign-cloudinary-params"
              >
                {({ open }) => {
                  return (
                    <button
                      className="w-full h-full px-2.5 py-1.5 flex items-center justify-center bg-emerald-400/90 rounded-md cursor-pointer"
                      onClick={() => open()}
                    >
                      Upload an Image
                    </button>
                  );
                }}
              </CldUploadWidget>
              <div className="w-full h-full max-h-30 grid grid-cols-4 justify-start gap-2.5 overflow-y-scroll">
                {images && images.length > 0 ? (
                  images.map((image, index) => (
                    <div className="w-fit h-fit relative" key={image.public_id}>
                      <CircleX
                        onClick={() => handleItemsToRemove(index, "images")}
                        className="absolute top-0 right-0 cursor-pointer bg-white rounded-full"
                        size={16}
                        color={"red"}
                      />
                      <Image
                        width={50}
                        height={50}
                        src={image.url}
                        alt={"product_image" + index}
                        className="w-fit h-fit aspect-square rounded-md border border-white"
                      />
                    </div>
                  ))
                ) : (
                  <div className="w-full h-full col-span-4 ">
                    <h2 className="text-white font-semibold text-xl text-center">
                      Your Images Will shown here:
                    </h2>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full h-fit flex flex-col gap-1.5 p-2.5">
              <div className="w-full h-fit flex flex-col gap-1 mt-2.5 items-start">
                <label
                  className="text-white font-medium text-lg"
                  htmlFor="product_name"
                >
                  Product Name:
                </label>
                <input
                  className="w-full h-fit px-3.5 py-2 rounded-md bg-slate-950/5 border border-white/10 hover:border-green-400/90 shadow-lg shadow-transparent hover:shadow-green-400/20 placeholder:text-gray-500 text-white/80 transition-all duration-300 ease-in-out"
                  placeholder="eg:isolate"
                  type="text"
                  value={product.name || ""}
                  onChange={(e) =>
                    handleProductDetails(e.target.name, e.target.value)
                  }
                  id="product_name"
                  name="name"
                />
              </div>
              <div className="w-full h-fit flex flex-col gap-1 mt-2.5 items-start">
                <label
                  className="text-white font-medium text-lg"
                  htmlFor="product_brand"
                >
                  Product Brand:
                </label>
                <input
                  className="w-full h-fit px-3.5 py-2 rounded-md bg-slate-950/5 border border-white/10 hover:border-green-400/90 shadow-lg shadow-transparent hover:shadow-green-400/20 placeholder:text-gray-500 text-white/80 transition-all     duration-300 ease-in-out"
                  placeholder="eg:OptimumNutirution"
                  type="text"
                  value={product.brand || ""}
                  onChange={(e) =>
                    handleProductDetails(e.target.name, e.target.value)
                  }
                  id="product_brand"
                  name="brand"
                />
              </div>
              <div className="w-full h-fit flex flex-col gap-1 mt-2.5 items-start">
                <label
                  className="text-white font-medium text-lg"
                  htmlFor="product_category"
                >
                  Product Category:
                </label>
                <select
                  className="w-full h-fit px-3.5 py-2 rounded-md bg-slate-950/5 border border-white/10 hover:border-green-400/90 shadow-lg shadow-transparent hover:shadow-green-400/20 placeholder:text-gray-500 text-white transition-all     duration-300 ease-in-out"
                  id="product_category"
                  value={product.category || ""}
                  onChange={(e) =>
                    handleProductDetails(e.target.name, e.target.value)
                  }
                  name="category"
                >
                  <option className="text-black">Select a category</option>
                  {categories.map((cat) => (
                    <option
                      className="text-black"
                      key={cat.id}
                      value={cat.name}
                    >
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full h-fit flex flex-col gap-1 mt-2.5 items-start">
                <label
                  className="text-white font-medium text-lg"
                  htmlFor="product_sub_category"
                >
                  Sub Category:
                </label>
                <input
                  className="w-full h-fit px-3.5 py-2 rounded-md bg-slate-950/5 border border-white/10 hover:border-green-400/90 shadow-lg shadow-transparent hover:shadow-green-400/20 placeholder:text-gray-500 text-white/80 transition-all     duration-300 ease-in-out"
                  placeholder="eg: Whey Protein"
                  onChange={(e) =>
                    handleProductDetails(e.target.name, e.target.value)
                  }
                  value={product.subCategory || ""}
                  type="text"
                  id="productsubCategory"
                  name="subCategory"
                />
              </div>
              <div className="w-full h-fit flex flex-row items-center justify-between gap-2.5 ">
                <div className="w-full h-fit flex flex-col gap-1 mt-2.5 items-start">
                  <label
                    className="text-white font-medium text-lg"
                    htmlFor="product_brand"
                  >
                    Stocks:
                  </label>
                  <input
                    className="w-full h-fit px-3.5 py-2 rounded-md bg-slate-950/5 border border-white/10 hover:border-green-400/90 shadow-lg shadow-transparent hover:shadow-green-400/20 placeholder:text-gray-500 text-white/80 transition-all     duration-300 ease-in-out"
                    placeholder="eg: 100"
                    onChange={(e) =>
                      handleProductDetails(e.target.name, e.target.value)
                    }
                    value={product.stock || ""}
                    type="text"
                    id="product_stock"
                    name="stock"
                  />
                </div>
                <div className="w-full h-fit flex flex-col gap-1 mt-2.5 items-start">
                  <label
                    className="text-white font-medium text-lg"
                    htmlFor="product_price"
                  >
                    Price:
                  </label>
                  <input
                    className="w-full h-fit px-3.5 py-2 rounded-md bg-slate-950/5 border border-white/10 hover:border-green-400/90 shadow-lg shadow-transparent hover:shadow-green-400/20 placeholder:text-gray-500 text-white/80 transition-all     duration-300 ease-in-out"
                    placeholder="eg: 2000 DA"
                    value={product.price || ""}
                    onChange={(e) =>
                      handleProductDetails(e.target.name, e.target.value)
                    }
                    type="text"
                    id="product_price"
                    name="price"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        {step === 1 && (
          <div className="w-full h-fit flex flex-col ">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="relative w-full h-fit flex flex-col gap-1 mt-2.5 items-start">
                <label
                  className="text-white font-medium text-lg"
                  htmlFor="badges"
                >
                  Product Badges:
                </label>
                <input
                  className="w-full h-fit px-3.5 py-2 rounded-md bg-slate-950/5 border border-white/10 hover:border-green-400/90 shadow-lg shadow-transparent hover:shadow-green-400/20 placeholder:text-gray-500 text-white/80 transition-all duration-300 ease-in-out"
                  placeholder="eg: High Protein"
                  type="text"
                  id="badges"
                  value={currBadge}
                  onChange={(e) => setCurrBadge(e.target.value)}
                  name="badges"
                />
                <button
                  onClick={handleSubmit}
                  className="absolute right-1 top-1/2 w-fit h-fit px-2.5 py-1 rounded-md text-white cursor-pointer flex flex-row items-center justify-center gap-1 bg-green-400"
                >
                  ADD <Plus size={16} />
                </button>
              </div>
              {badges && badges.length > 0 ? (
                <div className="w-full h-fit flex flex-row flex-wrap items-center justify-start gap-1 mt-2.5">
                  {badges.map((e, index) => (
                    <span
                      key={`${e}-${index}`}
                      className="text-white text-lg font-medium px-1.5 py-1 bg-white/10 rounded-lg relative"
                    >
                      {e}{" "}
                      <CircleX
                        onClick={() => handleItemsToRemove(index, "badges")}
                        className="absolute top-0 right-0 cursor-pointer bg-white rounded-full"
                        size={10}
                        color={"red"}
                      />
                    </span>
                  ))}
                </div>
              ) : null}
              <div className="relative w-full h-fit flex flex-col gap-1 mt-2.5 items-start">
                <label
                  className="text-white font-medium text-lg"
                  htmlFor="highlight"
                >
                  Product Highlights:
                </label>
                <input
                  className="w-full h-fit px-3.5 py-2 rounded-md bg-slate-950/5 border border-white/10 hover:border-green-400/90 shadow-lg shadow-transparent hover:shadow-green-400/20 placeholder:text-gray-500 text-white/80 transition-all duration-300 ease-in-out"
                  placeholder="eg: Supports muscle growth"
                  type="text"
                  id="badges"
                  value={currHighlight}
                  onChange={(e) => setCurrHighlight(e.target.value)}
                  name="badges"
                />
                <button
                  onClick={handleSubmit}
                  className="absolute right-1 top-1/2 w-fit h-fit px-2.5 py-1 rounded-md text-white cursor-pointer flex flex-row items-center justify-center gap-1 bg-green-400"
                >
                  ADD <Plus size={16} />
                </button>
              </div>
              {highlight && highlight.length > 0 ? (
                <div className="w-full h-fit flex flex-row flex-wrap items-center justify-start gap-1 mt-2.5">
                  {highlight.map((e, index) => (
                    <span
                      key={`${e}-${index}`}
                      className="text-white text-lg font-medium px-1.5 py-1 bg-white/10 rounded-lg relative"
                    >
                      {e}{" "}
                      <CircleX
                        onClick={() => handleItemsToRemove(index, "highlights")}
                        className="absolute top-0 right-0 cursor-pointer bg-white rounded-full"
                        size={10}
                        color={"red"}
                      />
                    </span>
                  ))}
                </div>
              ) : null}
              <div className="relative w-full h-fit flex flex-col gap-1 mt-2.5 items-start">
                <label
                  className="text-white font-medium text-lg"
                  htmlFor="highlight"
                >
                  Product Ingredients:
                </label>
                <input
                  className="w-full h-fit px-3.5 py-2 rounded-md bg-slate-950/5 border border-white/10 hover:border-green-400/90 shadow-lg shadow-transparent hover:shadow-green-400/20 placeholder:text-gray-500 text-white/80 transition-all duration-300 ease-in-out"
                  placeholder="eg: Supports muscle growth"
                  type="text"
                  id="badges"
                  value={currIngredient}
                  onChange={(e) => setCurrIngredient(e.target.value)}
                  name="badges"
                />
                <button
                  onClick={handleSubmit}
                  className="absolute right-1 top-1/2 w-fit h-fit px-2.5 py-1 rounded-md text-white cursor-pointer flex flex-row items-center justify-center gap-1 bg-green-400"
                >
                  ADD <Plus size={16} />
                </button>
              </div>
              {ingredient && ingredient.length > 0 ? (
                <div className="w-full h-fit flex flex-row flex-wrap items-center justify-start gap-1 mt-2.5">
                  {ingredient.map((e, index) => (
                    <span
                      key={`${e}-${index}`}
                      className="text-white text-lg font-medium px-1.5 py-1 bg-white/10 rounded-lg relative"
                    >
                      {e}{" "}
                      <CircleX
                        onClick={() =>
                          handleItemsToRemove(index, "ingredients")
                        }
                        className="absolute top-0 right-0 cursor-pointer bg-white rounded-full"
                        size={10}
                        color={"red"}
                      />
                    </span>
                  ))}
                </div>
              ) : null}
              <div className="w-full h-fit flex flex-col gap-1.5 my-2.5">
                <h2 className="text-white text-center font-bold text-xl my-2.5">
                  Nutrition Facts
                </h2>
                <div className="w-full h-fit flex flex-row flex-nowrap gap-1 mt-2.5 items-start">
                  <label
                    className="text-white font-medium text-lg w-full"
                    htmlFor="servingSize"
                  >
                    Serving Size:
                  </label>
                  <input
                    className="w-full h-fit px-3.5 py-2 rounded-md bg-slate-950/5 border border-white/10 hover:border-green-400/90 shadow-lg shadow-transparent hover:shadow-green-400/20 placeholder:text-gray-500 text-white/80 transition-all     duration-300 ease-in-out"
                    placeholder="eg: 2 scoops (60g)"
                    onChange={(e) =>
                      handleNutritionFacts(e.target.name, e.target.value)
                    }
                    type="text"
                    id="servingSize"
                    value={nutritionFacts.servingSize || ""}
                    name="servingSize"
                  />
                </div>
                <div className="w-full h-fit flex flex-row flex-nowrap gap-1 mt-2.5 items-start">
                  <label
                    className="text-white font-medium text-lg w-full"
                    htmlFor="servingsPerContainer"
                  >
                    Servings Per Container:
                  </label>
                  <input
                    className="w-full h-fit px-3.5 py-2 rounded-md bg-slate-950/5 border border-white/10 hover:border-green-400/90 shadow-lg shadow-transparent hover:shadow-green-400/20 placeholder:text-gray-500 text-white/80 transition-all     duration-300 ease-in-out"
                    placeholder="eg: 60"
                    onChange={(e) =>
                      handleNutritionFacts(e.target.name, e.target.value)
                    }
                    type="number"
                    value={nutritionFacts.servingsPerContainer || ""}
                    id="servingsPerContainer"
                    name="servingsPerContainer"
                  />
                </div>
                <div className="w-full h-fit flex flex-row flex-nowrap gap-1 mt-2.5 items-start">
                  <label
                    className="text-white font-medium text-lg w-full"
                    htmlFor="protein"
                  >
                    protein:
                  </label>
                  <input
                    className="w-full h-fit px-3.5 py-2 rounded-md bg-slate-950/5 border border-white/10 hover:border-green-400/90 shadow-lg shadow-transparent hover:shadow-green-400/20 placeholder:text-gray-500 text-white/80 transition-all     duration-300 ease-in-out"
                    placeholder="eg: 20g"
                    onChange={(e) =>
                      handleNutritionFacts(e.target.name, e.target.value)
                    }
                    type="text"
                    value={nutritionFacts.protein || ""}
                    id="protein"
                    name="protein"
                  />
                </div>
                <div className="w-full h-fit flex flex-row flex-nowrap gap-1 mt-2.5 items-start">
                  <label
                    className="text-white font-medium text-lg w-full"
                    htmlFor="carbs"
                  >
                    carbs:
                  </label>
                  <input
                    className="w-full h-fit px-3.5 py-2 rounded-md bg-slate-950/5 border border-white/10 hover:border-green-400/90 shadow-lg shadow-transparent hover:shadow-green-400/20 placeholder:text-gray-500 text-white/80 transition-all     duration-300 ease-in-out"
                    placeholder="eg: 20g"
                    onChange={(e) =>
                      handleNutritionFacts(e.target.name, e.target.value)
                    }
                    type="text"
                    id="carbs"
                    name="carbs"
                    value={nutritionFacts.carbs || ""}
                  />
                </div>
                <div className="w-full h-fit flex flex-row flex-nowrap gap-1 mt-2.5 items-start">
                  <label
                    className="text-white font-medium text-lg w-full"
                    htmlFor="fat"
                  >
                    fat:
                  </label>
                  <input
                    className="w-full h-fit px-3.5 py-2 rounded-md bg-slate-950/5 border border-white/10 hover:border-green-400/90 shadow-lg shadow-transparent hover:shadow-green-400/20 placeholder:text-gray-500 text-white/80 transition-all     duration-300 ease-in-out"
                    placeholder="eg: 5g"
                    onChange={(e) =>
                      handleNutritionFacts(e.target.name, e.target.value)
                    }
                    type="text"
                    id="fat"
                    value={nutritionFacts.fat || ""}
                    name="fat"
                  />
                </div>
                <div className="w-full h-fit flex flex-row flex-nowrap gap-1 mt-2.5 items-start">
                  <label
                    className="text-white font-medium text-lg w-full"
                    htmlFor="calories"
                  >
                    calories:
                  </label>
                  <input
                    className="w-full h-fit px-3.5 py-2 rounded-md bg-slate-950/5 border border-white/10 hover:border-green-400/90 shadow-lg shadow-transparent hover:shadow-green-400/20 placeholder:text-gray-500 text-white/80 transition-all     duration-300 ease-in-out"
                    placeholder="eg: 200"
                    value={nutritionFacts.calories || ""}
                    onChange={(e) =>
                      handleNutritionFacts(e.target.name, e.target.value)
                    }
                    type="number"
                    id="calories"
                    name="calories"
                  />
                </div>
              </div>
              <div className="w-full h-fit flex flex-col gap-1.5 my-2.5">
                <h2 className="text-white text-left font-bold text-xl my-2.5">
                  Feautured ?
                </h2>
                <div className="w-full h-fit flex flex-row flex-nowrap gap-1 mt-2.5 items-start">
                  <label
                    className="text-white font-medium text-lg w-full"
                    htmlFor="servingSize"
                  >
                    Is this product feautured?
                  </label>
                  <select
                    className="w-full h-fit px-3.5 py-2 rounded-md bg-slate-950/5 border border-white/10 hover:border-green-400/90 shadow-lg shadow-transparent hover:shadow-green-400/20 placeholder:text-gray-500 text-white transition-all     duration-300 ease-in-out"
                    id="isFeatured"
                    name="isFeatured"
                    value={
                      featured.isFeatured === true
                        ? "true"
                        : featured.isFeatured === false
                          ? "false"
                          : ""
                    }
                    onChange={(e) =>
                      handleFeautured(
                        e.target.name,
                        e.target.value === "true" ? true : false,
                      )
                    }
                  >
                    <option className="text-black" value={""}>
                      Select an option
                    </option>
                    <option className="text-black" value={"true"}>
                      Yes
                    </option>
                    <option className="text-black" value={"false"}>
                      No
                    </option>
                  </select>
                </div>
                <span className="text-lg text-green-200 font-normal text-right">
                  {" "}
                  will be shown in the homepage feautured section
                </span>
                <div className="w-full h-fit flex flex-row flex-nowrap gap-1 mt-2.5 items-start">
                  <label
                    className="text-white font-medium text-lg w-full"
                    htmlFor="order"
                  >
                    Product Order:
                  </label>
                  <input
                    disabled={!featured.isFeatured}
                    className="w-full h-fit px-3.5 py-2 rounded-md bg-slate-950/5 border border-white/10 hover:border-green-400/90 shadow-lg shadow-transparent hover:shadow-green-400/20 placeholder:text-gray-500 text-white/80 transition-all     duration-300 ease-in-out"
                    placeholder="eg: 1 "
                    type="text"
                    id="order"
                    name="order"
                    onChange={(e) =>
                      handleFeautured(e.target.name, e.target.value)
                    }
                  />
                </div>
                <span className="text-lg text-green-200 font-normal text-right">
                  {" "}
                  the smaller the order the more feautured the product will
                  be{" "}
                </span>
              </div>
            </form>
          </div>
        )}
        {step === 2 && (
          <div className="w-full h-fit flex flex-col ">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="relative w-full h-fit flex flex-col gap-1 mt-2.5 items-start">
                <label
                  className="text-white font-medium text-lg"
                  htmlFor="shortDescription"
                >
                  Product short description:
                </label>
                <input
                  onChange={(e) =>
                    handleProductDetails(e.target.name, e.target.value)
                  }
                  className="w-full h-fit px-3.5 py-2 rounded-md bg-slate-950/5 border border-white/10 hover:border-green-400/90 shadow-lg shadow-transparent hover:shadow-green-400/20 placeholder:text-gray-500 text-white/80 transition-all duration-300 ease-in-out"
                  placeholder="eg: A high-quality whey protein powder for muscle growth and recovery."
                  type="text"
                  value={product.shortDescription || ""}
                  id="shortDescription"
                  name="shortDescription"
                />
              </div>
              <div className="relative w-full h-fit flex flex-col gap-1 mt-2.5 items-start">
                <h2 className="text-white font-semibold self-center text-xl my-2.5">
                  Product Long Description:
                </h2>
                <label
                  className="text-white font-medium text-lg"
                  htmlFor="intro"
                >
                  Intro:
                </label>
                <textarea
                  onChange={(e) => setIntro(e.target.value)}
                  className="w-full h-fit px-3.5 py-2 rounded-md bg-slate-950/5 border border-white/10 hover:border-green-400/90 shadow-lg shadow-transparent hover:shadow-green-400/20 placeholder:text-gray-500 text-white/80 transition-all duration-300 ease-in-out"
                  placeholder="eg: introduction about the product"
                  id="intro"
                  name="intro"
                  value={intro}
                />
                <div className="relative w-full h-fit flex flex-col gap-1 mt-2.5 items-start">
                  <label
                    className="text-white font-medium text-lg"
                    htmlFor="shortDescription"
                  >
                    sections:
                  </label>
                  <label
                    className="text-white pl-2.5 font-medium text-sm"
                    htmlFor="title"
                  >
                    Title:
                  </label>
                  <input
                    onChange={(e) =>
                      setSection((pre) => ({ ...pre, title: e.target.value }))
                    }
                    placeholder="section Title"
                    className="w-full h-fit px-3.5 py-2 rounded-md bg-slate-950/5 border border-white/10 hover:border-green-400/90 shadow-lg shadow-transparent hover:shadow-green-400/20 placeholder:text-gray-500 text-white/80 transition-all duration-300 ease-in-out"
                    type="text"
                    name="title"
                    value={section.title}
                    id="title"
                  />
                  <label
                    className="text-white pl-2.5 font-medium text-sm"
                    htmlFor="content"
                  >
                    Content:
                  </label>
                  <input
                    placeholder="section Content"
                    className="w-full h-fit px-3.5 py-2 rounded-md bg-slate-950/5 border border-white/10 hover:border-green-400/90 shadow-lg shadow-transparent hover:shadow-green-400/20 placeholder:text-gray-500 text-white/80 transition-all duration-300 ease-in-out"
                    type="text"
                    value={section.content}
                    name="content"
                    id="content"
                    onChange={(e) =>
                      setSection((pre) => ({ ...pre, content: e.target.value }))
                    }
                  />
                  <button
                    // onClick={handleAddSection}
                    onClick={() => {
                      if (!section.title || !section.content) return;
                      setSections((pre) => [...pre, section]);
                      setSection({
                        title: "",
                        content: "",
                      });
                    }}
                    className="w-fit h-fit px-1.5 py-2 self-end cursor-pointer mt-2 rounded-md bg-tranparent shadow-md shadow-green-400/20 hover:bg-indigo-400 border border-white/10  text-white font-medium text-lg transition-colors duration-300 ease-in-out"
                  >
                    Add Section
                  </button>
                  {sections && sections.length > 0 ? (
                    <>
                      {" "}
                      <h2 className="text-white text-xl font-bold ">
                        Sections:
                      </h2>
                      <div className="w-full h-fit flex flex-col items-start max-h-28 overflow-y-scroll justify-start gap-2 mt-2.5">
                        {sections.map((e, index) => (
                          <div
                            key={`${e.title}-${index}`}
                            className="w-full relative h-fit flex flex-col items-start justify-start gap-1 p-2.5 rounded-md bg-slate-950/5 border border-white/10"
                          >
                            <h2 className="text-white font-medium text-lg">
                              {e.title}
                            </h2>
                            <p className="text-white/80 text-sm">{e.content}</p>
                            <CircleX
                              onClick={() => {
                                setSections((pre) =>
                                  pre.filter((_, i) => i !== index),
                                );
                              }}
                              className="absolute top-1 right-1 cursor-pointer bg-white rounded-full"
                              size={16}
                              color={"red"}
                            />
                          </div>
                        ))}
                      </div>
                    </>
                  ) : null}
                </div>
                <label
                  className="text-white font-medium text-lg"
                  htmlFor="conclusion"
                >
                  Conclusion:
                </label>
                <textarea
                  value={conclusion}
                  onChange={(e) => setConclusion(e.target.value)}
                  className="w-full h-fit px-3.5 py-2 rounded-md bg-slate-950/5 border border-white/10 hover:border-green-400/90 shadow-lg shadow-transparent hover:shadow-green-400/20 placeholder:text-gray-500 text-white/80 transition-all duration-300 ease-in-out"
                  placeholder="eg: conclusion about the product"
                  id="conclusion"
                  name="conclusion"
                />
              </div>
            </form>
          </div>
        )}
        {error && (
          <span className="text-red-500 text-center font-medium text-lg mt-2.5">
            {error}
          </span>
        )}
        <button
          onClick={step < 2 ? handleNextStep : handleCreateProduct}
          className="w-full h-fit px-3.5 py-2.5 mt-5 flex flex-nowrap items-center justify-center gap-1.5 rounded-md bg-green-500 hover:bg-green-600 text-white font-medium text-lg transition-colors duration-300 ease-in-out"
          type="submit"
        >
          {step < 2 ? "Proceed to Next Step" : "Create Product"}{" "}
          {loading && <Loader2 className="animate-spin text-white" size={16} />}
        </button>
      </div>
    </main>
  );
};
