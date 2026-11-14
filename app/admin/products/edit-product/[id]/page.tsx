import { ProductEditor } from "./components/ProductEditor";
import { apiUrl } from "@/lib/siteUrl";

export default async function EditProduct({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(apiUrl(`/api/products/${id}`));
  const data = await res.json();
  const product = data[0];

  return (
    <main className="w-full h-fit flex flex-col">
      <ProductEditor product={product} />?
    </main>
  );
}
