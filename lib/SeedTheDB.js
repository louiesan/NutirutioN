import Product from "./models/Product.js";
import JsonDb from "../data/market.json";
import { ConnectDB } from "./database.js";
import { UploadImage } from "./uploadImage.js";

const SeedDataBase = async () => {
  console.log("Seed Starting....");

  try {
    await ConnectDB(process.env.MONGO_URI);
    console.log("Deleting Data...");

    await Product.deleteMany({});

    console.log("Deleting Data Done ✅");
    let OldDb = JsonDb.product;

    const newProduct = await Promise.all(
      OldDb.map(async (item) => {
        const images = await Promise.all(
          item.images.map((image) => UploadImage(image)),
        );

        return {
          ...item,
          images,
        };
      }),
    );

    const product = await Product.create(newProduct);
    if (product) {
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
