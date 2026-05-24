import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
export const ConnectDB = async (url: string) => {
  console.log(url);

  if (mongoose.connection.readyState >= 1) return;

  mongoose
    .connect(url || process.env.MONGO_URI!)
    .then(() => console.log("connected to Database! ✅"))
    .catch((err) => console.log(err, " has occured!"));
};
