import { NutritionFacts, product, ProductById } from "@/apptypes/types";
import Link from "next/link";
import { CheckCircle2, Star, StarHalf } from "lucide-react";
import Plans from "@/app/(main)/components/Plans";
import type { cart, item } from "@/apptypes/types";
import { AddToCartButton } from "../component/AddToCartButton";
import { auth } from "@/auth";
import { ReviewsMang } from "../component/ReviewsMang";
import { ImageSlider } from "./components/ImageSlider";
import { reviewsSchemaInterface } from "@/lib/models/Reviews";
import Cards from "../../markets/components/Cards";

async function getProductDetail<T>(url: string): Promise<T> {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data[0];
  } catch (err) {
    throw err;
  }
}

async function getProductReview<T>(url: string): Promise<T> {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.reviews;
  } catch (err) {
    throw err;
  }
}

async function getSimilarProduct<T>(url: string): Promise<T> {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.products;
  } catch (err) {
    throw err;
  }
}

export default async function productPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();

  const [product, reviews, similarProduct] = await Promise.all([
    getProductDetail<ProductById>(`http://localhost:3000/api/products/${id}`),
    getProductReview<reviewsSchemaInterface[]>(
      `http://localhost:3000/api/reviews?productId=${id}`,
    ),
    getSimilarProduct<product[]>(
      `http://localhost:3000/api/products?category=Protein`,
    ),
  ]);

  console.log(similarProduct);

  // const res = await fetch(`http://localhost:3000/api/products/${id}`);
  // const data = await res.json();
  // const revs = await fetch(`http://localhost:3000/api/reviews?productId=${id}`);
  // const revData = await revs.json();
  // const reviews = revData.reviews;
  // const product: ProductById = data[0];
  console.log(product);
  console.log(reviews);

  const item: cart = {
    id: product._id,
    name: product.name,
    price: product.price,
    image: product.images[0].url,
    isBundle: false,
    quantity: 1,
  };
  console.log(product.nutritionFacts);

  const nutKeys = Object.keys(
    product?.nutritionFacts,
  ) as (keyof NutritionFacts)[];

  return (
    <main className="mt-20 max-w-6xl mx-auto px-3 text-white flex flex-col gap-16">
      <section className="grid md:grid-cols-2 gap-10">
        <div className="flex gap-4">
          <ImageSlider images={product.images} />
        </div>

        <div className="space-y-5">
          <ul className="flex gap-2 text-sm text-white/50">
            <li>
              <Link href="/">NutritioN</Link>
            </li>
            <li>&gt;</li>
            <li>
              <Link href="/markets">Markets</Link>
            </li>
            <li>&gt;</li>
            <li className="text-white">{product.name}</li>
          </ul>

          <h1 className="text-4xl font-bold">{product.name}</h1>

          <div className="flex flex-wrap gap-6 items-center text-sm">
            <p className="text-white/70">Brand: {product.brand}</p>

            <div className="flex items-center gap-1">
              <span>{product.rating?.toFixed(2)}</span>

              {product.rating === 0 ? (
                [...Array(5)].map((_, i) => (
                  <Star key={i} size={15} color="white" />
                ))
              ) : (product?.rating ?? 0) % 1 === 0 ? (
                [...Array(product.rating)].map((_, i) => (
                  <Star key={i} size={15} color="yellow" fill="yellow" />
                ))
              ) : (
                <>
                  {[...Array(Math.floor(product?.rating ?? 0))].map((_, i) => (
                    <Star key={i} size={15} color="yellow" fill="yellow" />
                  ))}
                  <StarHalf size={15} color="yellow" fill="yellow" />
                </>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            {product.category && (
              <span
                title="category"
                className="px-3 py-1 rounded-full text-sm bg-white/10 border border-white/10"
              >
                {product.category}
              </span>
            )}

            {product.subCategory && (
              <span
                title="subcategory"
                className="px-3 py-1 rounded-full text-sm bg-white/10 border border-green-400/40"
              >
                {product.subCategory}
              </span>
            )}
          </div>

          <p className="text-white/80">{product.shortDescription}</p>

          <span
            className={`inline-block px-3 py-1 rounded-md text-sm font-medium ${
              product.stock
                ? "bg-green-400 text-black"
                : "bg-red-400 text-black"
            }`}
          >
            {product.stock ? "Available" : "Sold Out"}
          </span>

          <div className="text-4xl font-bold text-green-400">
            {product.price} DA
          </div>

          {product.reviewsCount ? (
            <span className="text-sm text-white/60 italic">
              {Math.floor(((product.rating ?? 0) * product.reviewsCount) / 5)}{" "}
              of {product.reviewsCount} satisfied reviews
            </span>
          ) : (
            <span className="text-sm text-white/60 italic">
              no reviews yet !
            </span>
          )}

          <AddToCartButton session={session} item={item} />
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-10 border-t border-white/10 pt-10">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Highlights</h2>

          <ul className="space-y-2">
            {product.highlights.map((e, i) => (
              <li key={i} className="flex items-center gap-2 text-white/80">
                <CheckCircle2 size={18} className="text-green-400" />
                {e}
              </li>
            ))}
          </ul>

          {product.ingredients?.length > 0 ? (
            <>
              <h3 className="text-xl font-semibold">Ingredients</h3>
              <p className="text-white/70">{product.ingredients.join(", ")}</p>
            </>
          ) : (
            <p className="text-white/70">{product.ingredients}</p>
          )}

          <h3 className="text-xl font-semibold">Why {product.name}?</h3>

          <p className="text-white/80">{product.longDescription.intro}</p>

          {product.longDescription.sections?.map((e, i) => (
            <div key={i}>
              <h4 className="font-semibold text-green-400">{e.title}</h4>
              <p className="text-white/70">{e.content}</p>
            </div>
          ))}

          <p className="italic text-white/60">
            {product.longDescription.conclusion}
          </p>
        </div>

        <div className="sticky top-24 h-fit bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Nutritional Facts</h2>

          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-white/60">
                <th className="text-left py-2">Value</th>
                <th>{product.nutritionFacts.servingsPerContainer}</th>
                <th>{product.nutritionFacts.servingSize}</th>
              </tr>
            </thead>

            <tbody>
              {nutKeys.map((e, i) => (
                <tr key={i} className="border-b border-white/5">
                  <td className="py-2">{e.toUpperCase()}</td>
                  <td>{product.nutritionFacts[e]}</td>
                  <td>{product.nutritionFacts[e]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <ReviewsMang
        totalRating={product.rating || 0}
        reviewCount={product.reviewsCount || 0}
        reviews={reviews}
        productId={product._id}
        user={{
          id: session?.user?.id || "",
          userName: session?.user?.name || "",
        }}
      />
      <section className="border-t border-white/10 pt-10">
        <h2 className="text-2xl font-semibold mb-6">Similar Products:</h2>

        {similarProduct && (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {similarProduct.map((e: product) => (
              <Cards key={e._id} product={e} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
