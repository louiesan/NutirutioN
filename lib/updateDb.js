import JsonDb from "../data/market.json";
import { ConnectDB } from "./database.js";
import { Goals } from "./models/Goals.js";

const SeedDataBase = async () => {

  try {
    await ConnectDB(process.env.MONGO_URI);
    await Goals.deleteMany({});

    const goalsData = JsonDb.Goals;

    const goals = await Goals.create(goalsData);
    if (goals) {
    }
    process.exit(0);
  } catch (err) {
    process.exit(1);
    throw new Error("Failed to seed the database");
  }
};

SeedDataBase();
