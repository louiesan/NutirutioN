import GoalsManager from "./components/GoalsManager";
import { ConnectDB } from "@/lib/database";
import { Goals } from "@/lib/models/Goals";
import Product from "@/lib/models/Product";

export const dynamic = "force-dynamic";

export default async function GoalsAdminPage() {
  await ConnectDB(process.env.MONGO_URI!);

  const [goals, products] = await Promise.all([
    Goals.find({}),
    Product.find({}),
  ]);

  return (
    <GoalsManager
      initialGoals={JSON.parse(JSON.stringify(goals))}
      initialProducts={JSON.parse(JSON.stringify(products))}
    />
  );
}
