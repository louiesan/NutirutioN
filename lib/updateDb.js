import JsonDb from "../data/market.json";
import { ConnectDB } from "./database.js";
import { Goals } from "./models/Goals.js";

const SeedDataBase = async () => {
  console.log("Seed Starting....");

  try {
    await ConnectDB(process.env.MONGO_URI);
    await Goals.deleteMany({});
    console.log("deleted ✅");

    const goalsData = JsonDb.Goals;

    const goals = await Goals.create(goalsData);
    if (goals) {
      console.log("seed completed successfully");
    }
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
    throw new Error("Failed to seed the database");
  }
};

SeedDataBase();
