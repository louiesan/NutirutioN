import mongoose, { Schema } from "mongoose";

const OrederItemSchema = new Schema({
  type: {
    type: String,
    enum: ["product", "bundle"],
    default: "product",
  },
  productId: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
  },
  // bundleId: {
  //   type: mongoose.Types.ObjectId,
  //   ref: "Bundle",
  // },
  name: String,
  price: String,
  quantity: Number,
  // bundleItems: [
  //   {
  //     productId: mongoose.Types.ObjectId,
  //     name: String,
  //     image: String,
  //     price: String,
  //     quantity: Number,
  //   },
  // ],
});

const orederSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  userPhone: {
    type: String,
    required: [true, " is required!"],
  },
  userName: {
    type: String,
    required: [true, " is required!"],
  },
  userAddress: {
    type: String,
  },
  email: {
    type: String,
  },

  wilaya: {
    type: String,
    required: [true, "Please Provide your wilaaya"],
  },
  baladya: {
    type: String,
    required: [true, "Please Provide your baladya"],
  },
  item: [OrederItemSchema],
  promoCode: {
    type: String,
  },
  totalPrice: {
    type: Number,
    required: [true, " is required!"],
  },
  status: {
    type: String,
    enum: ["pending", "accepted"],
    default: "pending",
  },
  paymentMethod: {
    type: String,
    enum: ["Cart", "Hand-to-Hand"],
    required: [true, "please provide a payment method!"],
  },
  deliveryMethod: {
    type: String,
    enum: ["home", "pick-up"],
    required: [true, "Please provide a deliveryMethod"],
  },
});

export const Orders =
  mongoose.models.Orders || mongoose.model("Orders", orederSchema);
