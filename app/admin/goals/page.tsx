import { headers } from "next/headers";
import GoalsManager from "./components/GoalsManager";

export default async function GoalsAdminPage() {
  const requestHeaders = await headers();

  const [goalsResponse, productsResponse] = await Promise.all([
    fetch("http://localhost:3000/api/goals", {
      cache: "no-store",
      headers: requestHeaders,
    }),
    fetch("http://localhost:3000/api/products", {
      cache: "no-store",
      headers: requestHeaders,
    }),
  ]);

  const goals = await goalsResponse.json();
  const productsData = await productsResponse.json();

  return (
    <GoalsManager
      initialGoals={Array.isArray(goals) ? goals : []}
      initialProducts={
        Array.isArray(productsData?.products) ? productsData.products : []
      }
    />
  );
}
