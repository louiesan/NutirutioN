import Product from "./models/Product.js";
import JsonDb from "../data/market.json";
import { ConnectDB } from "./database.js";
import { UploadImage } from "./uploadImage.js";

const SeedDataBase = async () => {

  try {
    await ConnectDB(process.env.MONGO_URI);

    await Product.deleteMany({});

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
    }
    process.exit(0);
  } catch (err) {
    process.exit(1);
    throw new Error("Failed to seed the database");
  }
};

SeedDataBase();
