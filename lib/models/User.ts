import mongoose, { Model, Schema } from "mongoose";
import { product } from "@/apptypes/types";

export interface UserSchemaInterface {
  _id: string;
  name: string;
  email: string;
  password: string | null;
  provider: {
    name: string;
    providerId: string;
  }[];
  image: string;
  role: "user" | "admin";
  favorites: product[];
  orders: number;
}

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "please provide username"],
  },
  email: {
    type: String,
    required: [true, "please provide an email!"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Invalid email!",
    ],
  },
  password: {
    type: String,
    required: false,
    default: null,
  },
  provider: [
    {
      name: { type: String },
      providerId: { type: String, required: false },
    },
  ],
  image: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  favorites: {
    type: [
      {
        _id: String,
        name: String,
        category: String,
        price: Number,
        shortDescription: String,
        images: String,
      },
    ],
    default: [],
  },
  orders: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.models.User ?? mongoose.model("User", userSchema);

export default User as Model<UserSchemaInterface>;
