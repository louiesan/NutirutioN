import { ProductEditor } from "./components/ProductEditor";

export default async function EditProduct({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(`http://localhost:3000/api/products/${id}`);
  const data = await res.json();
  const product = data[0];
  console.log(product);

  return (
    <main className="w-full h-fit flex flex-col">
      <ProductEditor product={product} />?
    </main>
  );
}
