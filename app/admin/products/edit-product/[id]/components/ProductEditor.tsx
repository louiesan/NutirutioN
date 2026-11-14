"use client";
import { ProductById } from "@/apptypes/types";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { IoMdCloseCircle } from "react-icons/io";

import React, { useContext, useState } from "react";
import { CircleX, Loader2 } from "lucide-react";
import { adminContext } from "@/app/admin/context/adminContext";

export const ProductEditor = ({ product }: { product: ProductById }) => {
  const { updateProduct } = useContext(adminContext);
  const [badges, setBadges] = useState(product.badges);
  const [loading, setLoading] = useState(false);
  const [currBadge, setCurrBadge] = useState("");
  const [currHighlight, setCurrHighlight] = useState("");
  const [currIngredient, setCurrIngredient] = useState("");
  const [ingredients, setIngredients] = useState(product.ingredients);
  const [highlights, setHighlights] = useState(product.highlights);
  const [images, setImages] = useState<{ url: string; public_id: string }[]>(
    product.images,
  );
  const [name, setName] = useState(product.name);
  const [brand, setBrand] = useState(product.brand);
  const [shortDes, setShortDes] = useState(product.shortDescription);
  const [sections, setSections] = useState(product.longDescription.sections);
  const [section, setSection] = useState({ title: "", content: "" });
  const [intro, setIntro] = useState(product.longDescription.intro);
  const [conclusion, setConclusion] = useState(
    product.longDescription.conclusion,
  );
  const [stock, setStock] = useState(product.stock);
  const [price, setPrice] = useState(product.price);
  const [nutritionFacts, setNutritionFacts] = useState(product.nutritionFacts);
  const [featured, setFeatured] = useState<{
    isFeatured?: boolean;
    order?: number | string;
  }>(product.featured ?? { isFeatured: false, order: "" });

  const handleRemove = (index: number, type: string) => {
    if (type === "badge") {
      setBadges((pre) => pre.filter((_, i) => i !== index));
    } else if (type === "highlight") {
      setHighlights((pre) => pre.filter((_, i) => i !== index));
    } else if (type === "ingredient") {
      setIngredients((pre) => pre.filter((_, i) => i !== index));
    } else if (type === "image") {
      setImages((pre) => pre.filter((_, i) => i !== index));
    }
  };

  const handleNutChange = (name: string, value: string) => {
    setNutritionFacts((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handleFeaturedChange = (
    name: string,
    value: boolean | number | string,
  ) => {
    setFeatured((pre) => ({ ...pre, [name]: value }));
  };

  const handleUpdate = async () => {
    const productData = {
      _id: product._id,
      category: product.category,
      subCategory: product.subCategory,
      name,
      brand,
      images,
      highlights,
      badges,
      stock,
      ingredients,
      nutritionFacts,
      featured,
      price,
      shortDescription: shortDes,
      longDescription: {
        intro,
        sections,
        conclusion,
      },
    };

    try {
      setLoading(true);
      await updateProduct(productData);
    } catch (err) {

      throw err;
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full h-fit flex flex-col">
      <h2 className="w-full text-2xl font-bold text-white mb-5">
        Edit Product
      </h2>
      {/* Product Name, Brand, Stock */}
      <div className="w-full h-fit flex flex-col gap-4 p-2">
        <div className="w-full h-fit flex flex-col items-start gap-2.5">
          <label className="text-lg font-medium text-white">
            Product Name:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-800 text-white placeholder:text-gray-500 border border-white/20 outline-none rounded-md px-2 py-1 shadow-black shadow-md hover:shadow-green-400 transition-all ease-in-out duration-300"
          />
        </div>
        <div className="w-full h-fit flex flex-col items-start gap-2.5">
          <label className="text-lg font-medium text-white">Brand:</label>
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full bg-gray-800 text-white placeholder:text-gray-500 border border-white/20 outline-none rounded-md px-2 py-1 shadow-black shadow-md hover:shadow-green-400 transition-all ease-in-out duration-300"
          />
        </div>
        <div className="w-full h-fit flex flex-col items-start gap-2.5">
          <label className="text-lg font-medium text-white">Stock:</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(parseInt(e.target.value))}
            className="w-full bg-gray-800 text-white placeholder:text-gray-500 border border-white/20 outline-none rounded-md px-2 py-1 shadow-black shadow-md hover:shadow-green-400 transition-all ease-in-out duration-300"
          />
        </div>
        <div className="w-full h-fit flex flex-col items-start gap-2.5">
          <label className="text-lg font-medium text-white">Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
            className="w-full bg-gray-800 text-white placeholder:text-gray-500 border border-white/20 outline-none rounded-md px-2 py-1 shadow-black shadow-md hover:shadow-green-400 transition-all ease-in-out duration-300"
          />
        </div>
      </div>
      <h2 className="text-lg  font-medium text-white">Add Or Remove Images:</h2>
      <div className="w-full h-fit flex flex-col flex-nowrap items-center gap-2.5 p-2">
        <CldUploadWidget
          onSuccess={(results) => {
            const info = results?.info;

            if (!info || typeof info === "string") return;

            setImages((pre) => [
              ...pre,
              { url: info.secure_url, public_id: info.public_id },
            ]);
          }}
          signatureEndpoint="/api/sign-cloudinary-params"
        >
          {({ open }) => {
            return (
              <button
                className="w-full h-fit rounded-lg px-2.5 py-1.5 flex items-center justify-center bg-green-200/60 cursor-pointer"
                onClick={() => open()}
              >
                Upload an Image
              </button>
            );
          }}
        </CldUploadWidget>
        <div className="w-full  h-fit flex flex-row items-center justify-start gap-1 overflow-x-scroll p-2">
          {images && images.length > 0
            ? images.map((ele, index) => (
                <div
                  key={index}
                  className="w-fit h-fit relative border border-white/5"
                >
                  <Image
                    src={ele.url}
                    alt="productImage"
                    width={120}
                    className="rounded-md"
                    height={120}
                  />{" "}
                  <button
                    onClick={() => handleRemove(index, "image")}
                    className="absolute -top-2 -right-2 cursor-pointer"
                  >
                    <IoMdCloseCircle color="red" size={16} />
                  </button>
                </div>
              ))
            : null}
        </div>
      </div>
      <div className="w-full h-fit flex flex-col bg-slate-950 border border-white/50 backdrop-blur-md rounded-md p-4 mt-5">
        <h1 className="text-3xl font-semibold text-white text-center">
          Product Properties:
        </h1>
        <h2 className="text-lg  font-medium text-white my-1.5">Badges:</h2>
        <div className="mb-5 w-full h-fit relative">
          <input
            type="text"
            className="w-full bg-gray-800 text-white placeholder:text-gray-500 border border-white/20 outline-none rounded-md px-2 py-1 shadow-black shadow-md hover:shadow-green-400 transition-all ease-in-out duration-300"
            name="badge"
            value={currBadge}
            onChange={(e) => setCurrBadge(e.target.value)}
            id=""
          />
          <button
            className="w-fit h-fit px-2 py-1 rounded-md bg-transparent border border-green-400 cursor-pointer hover:shadow-xs hover:shadow-green-200 transition-all duration-300 ease-in-out text-white/80 absolute top-0 right-0"
            onClick={() => {
              if (currBadge.trim() !== "") {
                setBadges([...badges, currBadge]);
                setCurrBadge("");
              }
            }}
          >
            Add Badge
          </button>
        </div>
        <div className="w-full h-fit flex flex-row flex-wrap items-center justify-start gap-1.5">
          {badges && badges.length > 0
            ? badges.map((ele, index) => (
                <div
                  key={index}
                  className="w-fit h-fit flex flex-row items-center justify-between gap-2.5 p-2 bg-slate-400/50 rounded-md"
                >
                  <p className="text-white">{ele}</p>
                  <button
                    onClick={() => handleRemove(index, "badge")}
                    className="cursor-pointer"
                  >
                    <IoMdCloseCircle color="red" size={16} />
                  </button>
                </div>
              ))
            : null}
        </div>
        <h2 className="text-lg  font-medium text-white my-1.5">Highlights:</h2>
        <div className="w-full h-fit relative mb-5">
          <input
            type="text"
            className="w-full bg-gray-800 text-white placeholder:text-gray-500 border border-white/20 outline-none rounded-md px-2 py-1 shadow-black shadow-md hover:shadow-green-400 transition-all ease-in-out duration-300"
            name="highlight"
            value={currHighlight}
            onChange={(e) => setCurrHighlight(e.target.value)}
            id=""
          />
          <button
            className="w-fit h-fit px-2 py-1 rounded-md bg-transparent border border-green-400 cursor-pointer hover:shadow-xs hover:shadow-green-200 transition-all duration-300 ease-in-out text-white/80 absolute top-0 right-0"
            onClick={() => {
              if (currHighlight.trim() !== "") {
                setHighlights([...highlights, currHighlight]);
                setCurrHighlight("");
              }
            }}
          >
            Add Highlight
          </button>
        </div>
        <div className="w-full h-fit flex flex-row flex-wrap items-center justify-start gap-1.5">
          {highlights && highlights.length > 0
            ? highlights.map((ele, index) => (
                <div
                  key={index}
                  className="w-fit h-fit flex flex-row items-center justify-between gap-2.5 p-2 bg-slate-400/50 rounded-md"
                >
                  <p className="text-white">{ele}</p>
                  <button
                    onClick={() => handleRemove(index, "highlight")}
                    className="cursor-pointer"
                  >
                    <IoMdCloseCircle color="red" size={16} />
                  </button>
                </div>
              ))
            : null}
        </div>
        <h2 className="text-lg  font-medium text-white my-1.5">Ingredients:</h2>
        <div className="w-full h-fit relative mb-5">
          <input
            type="text"
            name="ingredient"
            onChange={(e) => setCurrIngredient(e.target.value)}
            value={currIngredient}
            id=""
            className="w-full bg-gray-800 text-white placeholder:text-gray-500 border border-white/20 outline-none rounded-md px-2 py-1 shadow-black shadow-md hover:shadow-green-400 transition-all ease-in-out duration-300"
          />
          <button
            className="w-fit h-fit px-2 py-1 rounded-md bg-transparent border border-green-400 cursor-pointer hover:shadow-xs hover:shadow-green-200 transition-all duration-300 ease-in-out text-white/80 absolute top-0 right-0"
            onClick={() => {
              if (currIngredient.trim() !== "") {
                setIngredients([...ingredients, currIngredient]);
                setCurrIngredient("");
              }
            }}
          >
            Add Ingredient
          </button>
        </div>
        <div className="w-full h-fit flex flex-row flex-wrap items-center justify-start gap-1.5">
          {ingredients && ingredients.length > 0
            ? ingredients.map((ele, index) => (
                <div
                  key={index}
                  className="w-fit h-fit flex flex-row items-center justify-between gap-2.5 p-2 bg-slate-400/50 rounded-md"
                >
                  <p className="text-white">{ele}</p>
                  <button
                    onClick={() => handleRemove(index, "ingredient")}
                    className="cursor-pointer"
                  >
                    <IoMdCloseCircle color="red" size={16} />
                  </button>
                </div>
              ))
            : null}
        </div>
      </div>
      <div className="w-full h-fit flex flex-col bg-slate-950 border border-white/50 backdrop-blur-md rounded-md p-4 mt-5">
        <h1 className="text-3xl font-semibold text-white text-center mb-2.5">
          Featured:
        </h1>
        <div className="w-full h-fit flex flex-col items-start gap-4 mb-2.5">
          <label className="text-white font-medium flex items-center gap-2">
            <input
              type="checkbox"
              checked={!!featured.isFeatured}
              onChange={(e) =>
                handleFeaturedChange("isFeatured", e.target.checked)
              }
            />
            Is Featured
          </label>
          <div className="w-fit h-fit flex flex-row items-center gap-2">
            <label className="text-white font-medium">Order</label>
            <input
              type="number"
              value={featured.order ?? ""}
              disabled={!featured.isFeatured}
              onChange={(e) =>
                handleFeaturedChange(
                  "order",
                  e.target.value ? parseInt(e.target.value) : "",
                )
              }
              className="w-24 bg-gray-800 text-white placeholder:text-gray-500 border border-white/20 outline-none rounded-md px-2 py-1"
            />
          </div>
        </div>
      </div>
      <div className="w-full h-fit flex flex-col bg-slate-950 border border-white/50 backdrop-blur-md rounded-md p-4 mt-5">
        <h1 className="text-3xl font-semibold text-white text-center mb-2.5">
          Nutrition Facts:
        </h1>
        <div className="w-full h-fit flex flex-col items-center justify-start gap-1.5">
          <div className="w-full h-fit flex flex-col items-start justify-center gap-1">
            <label
              className="text-white font-medium text-lg capitalize"
              htmlFor="servingSize"
            >
              serving Size
            </label>
            <input
              type="text"
              onChange={(e) => handleNutChange(e.target.name, e.target.value)}
              value={nutritionFacts.servingSize}
              name="servingSize"
              className="w-full bg-gray-800 text-white placeholder:text-gray-500 border border-white/20 outline-none rounded-md px-2 py-1 shadow-black shadow-md hover:shadow-green-400 transition-all ease-in-out duration-300"
            />
          </div>
          <div className="w-full h-fit flex flex-col items-start justify-center gap-1">
            <label
              className="text-white font-medium text-lg capitalize"
              htmlFor="servingsPerContainer"
            >
              servings Per Container
            </label>
            <input
              type="text"
              onChange={(e) => handleNutChange(e.target.name, e.target.value)}
              value={nutritionFacts.servingsPerContainer}
              name="servingsPerContainer"
              className="w-full bg-gray-800 text-white placeholder:text-gray-500 border border-white/20 outline-none rounded-md px-2 py-1 shadow-black shadow-md hover:shadow-green-400 transition-all ease-in-out duration-300"
            />
          </div>
          <div className="w-full h-fit flex flex-col items-start justify-center gap-1">
            <label
              className="text-white font-medium text-lg capitalize"
              htmlFor="servingSize"
            >
              protein
            </label>
            <input
              type="text"
              onChange={(e) => handleNutChange(e.target.name, e.target.value)}
              value={nutritionFacts.protein}
              name="protein"
              className="w-full bg-gray-800 text-white placeholder:text-gray-500 border border-white/20 outline-none rounded-md px-2 py-1 shadow-black shadow-md hover:shadow-green-400 transition-all ease-in-out duration-300"
            />
          </div>
          <div className="w-full h-fit flex flex-col items-start justify-center gap-1">
            <label
              className="text-white font-medium text-lg capitalize"
              htmlFor="carbs"
            >
              carbs
            </label>
            <input
              type="text"
              onChange={(e) => handleNutChange(e.target.name, e.target.value)}
              value={nutritionFacts.carbs}
              name="carbs"
              className="w-full bg-gray-800 text-white placeholder:text-gray-500 border border-white/20 outline-none rounded-md px-2 py-1 shadow-black shadow-md hover:shadow-green-400 transition-all ease-in-out duration-300"
            />
          </div>
          <div className="w-full h-fit flex flex-col items-start justify-center gap-1">
            <label
              className="text-white font-medium text-lg capitalize"
              htmlFor="fat"
            >
              fat
            </label>
            <input
              type="text"
              onChange={(e) => handleNutChange(e.target.name, e.target.value)}
              value={nutritionFacts.fat}
              name="fat"
              className="w-full bg-gray-800 text-white placeholder:text-gray-500 border border-white/20 outline-none rounded-md px-2 py-1 shadow-black shadow-md hover:shadow-green-400 transition-all ease-in-out duration-300"
            />
          </div>
          <div className="w-full h-fit flex flex-col items-start justify-center gap-1">
            <label
              className="text-white font-medium text-lg capitalize"
              htmlFor="calories"
            >
              calories
            </label>
            <input
              type="text"
              onChange={(e) => handleNutChange(e.target.name, e.target.value)}
              value={nutritionFacts.calories}
              name="calories"
              className="w-full bg-gray-800 text-white placeholder:text-gray-500 border border-white/20 outline-none rounded-md px-2 py-1 shadow-black shadow-md hover:shadow-green-400 transition-all ease-in-out duration-300"
            />
          </div>
        </div>
      </div>
      <div className="w-full h-fit flex flex-col bg-slate-950 border border-white/50 backdrop-blur-md rounded-md p-4 mt-5">
        <h1 className="text-3xl font-semibold text-white text-center mb-2.5">
          Description Settings:
        </h1>
        <div className="w-full h-fit flex flex-col items-start justify-center gap-2.5">
          <div className="w-full h-fit flex flex-col items-start justify-center gap-2.5 mb-1.5">
            <label
              className="text-white font-medium text-base"
              htmlFor="shortDes"
            >
              Short Description
            </label>
            <textarea
              rows={4}
              name="shortDes"
              className="w-full bg-gray-800 text-white placeholder:text-gray-500 border border-white/20 outline-none rounded-md px-2 py-1 shadow-black shadow-md hover:shadow-green-400 transition-all ease-in-out duration-300"
              onChange={(e) => setShortDes(e.target.value)}
              id="shortDes"
              value={shortDes}
            ></textarea>
          </div>
          <h2 className="text-white font-medium text-lg text-center">
            Long Description Setting:
          </h2>
          <div className="w-full h-fit flex flex-col items-start justify-center gap-2.5">
            <label className="text-white font-medium text-base" htmlFor="intro">
              Intro
            </label>
            <textarea
              rows={4}
              name="intro"
              className="w-full bg-gray-800 text-white placeholder:text-gray-500 border border-white/20 outline-none rounded-md px-2 py-1 shadow-black shadow-md hover:shadow-green-400 transition-all ease-in-out duration-300"
              onChange={(e) => setIntro(e.target.value)}
              id="intro"
              value={intro}
            ></textarea>
          </div>
          <div className="relative w-full h-fit flex flex-col gap-1 mt-2.5 items-start">
            <h2 className="text-white font-medium text-lg">sections:</h2>
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
              className="w-full bg-gray-800 text-white placeholder:text-gray-500 border border-white/20 outline-none rounded-md px-2 py-1 shadow-black shadow-md hover:shadow-green-400 transition-all ease-in-out duration-300"
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
            <textarea
              rows={4}
              placeholder="section Content"
              className="w-full bg-gray-800 text-white placeholder:text-gray-500 border border-white/20 outline-none rounded-md px-2 py-1 shadow-black shadow-md hover:shadow-green-400 transition-all ease-in-out duration-300"
              value={section.content}
              name="content"
              id="content"
              onChange={(e) =>
                setSection((pre) => ({ ...pre, content: e.target.value }))
              }
            />
            <button
              onClick={() => {
                if (!section.title || !section.content) return;
                setSections((pre) => [...pre, section]);
                setSection({
                  title: "",
                  content: "",
                });
              }}
              className="w-full h-fit px-1.5 py-2 self-end cursor-pointer mt-2 rounded-md bg-tranparent shadow-md shadow-green-400/20 hover:bg-indigo-400 border border-white/10  text-white font-medium text-lg transition-colors duration-300 ease-in-out"
            >
              Add Section
            </button>
            {sections && sections.length > 0 ? (
              <>
                {" "}
                <h2 className="text-white text-xl font-bold ">Sections:</h2>
                <div className="w-full h-fit flex flex-col items-start max-h-28 overflow-y-scroll justify-start gap-2 mt-2.5">
                  {sections.map((e, index) => (
                    <div
                      key={`${e.title}-${index}`}
                      className="w-full relative h-fit flex flex-col items-start justify-start gap-1 p-2.5 rounded-md bg-slate-400/20 border border-white/10"
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
          </div>{" "}
          <div className="w-full h-fit flex flex-col items-start justify-center gap-2.5">
            <label
              className="text-white font-medium text-base"
              htmlFor="Conclusion"
            >
              Conclusion
            </label>
            <textarea
              rows={4}
              name="Conclusion"
              className="w-full bg-gray-800 text-white placeholder:text-gray-500 border border-white/20 outline-none rounded-md px-2 py-1 shadow-black shadow-md hover:shadow-green-400 transition-all ease-in-out duration-300"
              onChange={(e) => setConclusion(e.target.value)}
              id="Conclusion"
              value={conclusion}
            ></textarea>
          </div>
        </div>
      </div>
      <button
        onClick={async () => await handleUpdate()}
        disabled={loading}
        className={`${loading ? "opacity-30 bg-green-400/50 pointer-events-none" : "opacity-100 pointer-events-auto bg-green-500"} w-full h-fit px-1.5 py-2 self-end cursor-pointer mt-2 rounded-md hover:bg-green-600 text-white font-medium text-lg transition-colors duration-300 ease-in-out`}
      >
        Save Product{" "}
        {loading && <Loader2 className="animate-spin text-white" size={16} />}
      </button>
    </div>
  );
};
