import mongoose, { Model, Schema } from "mongoose";

interface PromoCode {
  promoCode: string;
  discountPercentage: number;
  usedCount: number;
  usageLimits: number;
  expiresAt: Date;
}

const promoCodeSchema = new Schema({
  promoCode: {
    type: String,
    required: [true, "please enter a valid code!"],
    unique: true,
  },
  discountPercentage: {
    type: Number,
    required: [true, "Enter the discount percentage!"],
  },
  usedCount: {
    type: Number,
    default: 0,
  },
  usageLimits: {
    type: Number,
    required: [true, "Please enter a usage limit!"],
  },
  expiresAt: {
    type: Date,
    required: [true, "please enter when to expires!"],
  },
});

const Promo = mongoose.models.Promo ?? mongoose.model("Promo", promoCodeSchema);

export default Promo as Model<PromoCode>;
