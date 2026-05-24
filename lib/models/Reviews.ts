import mongoose, { Model, Schema } from "mongoose";
import { unique } from "next/dist/build/utils";

export interface reviewsSchemaInterface {
  productId: string;
  userId: string;
  userName: string;
  comment: string;
  rate: number;
  createdAt: string;
}

const reviewsSchema = new Schema({
  productId: {
    type: mongoose.Types.ObjectId,
    require: [true, "Please Provided a product id"],
  },
  userId: {
    type: mongoose.Types.ObjectId,
    require: [true, "Please Provided a product id"],
  },
  comment: {
    type: String,
    required: [true, "please provide your review"],
  },
  userName: {
    type: String,
    required: [true, "please provide your name"],
  },
  rate: {
    type: Number,
    required: [true, "Please Provide your rating"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

reviewsSchema.index({ userId: 1, productId: 1 }, { unique: true });

const Reviews =
  mongoose.models.Reviews || mongoose.model("Reviews", reviewsSchema);

export default Reviews as Model<reviewsSchemaInterface>;
