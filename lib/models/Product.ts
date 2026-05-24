import mongoose, { Schema, type Model } from "mongoose";

type Sections = {
  title: string;
  content: string;
};
type ProDescription = {
  intro: string;
  sections: Sections[];
  conclusion: string;
};

type ProductServing = {
  servingSize: string;
  servingsPerContainer: number;
  protein: string;
  carbs: string;
  fat: string;
  calories: number;
};

export interface ProductFields {
  name: string;

  brand: string;

  category: string;

  subCategory: string;

  price: number;
  stock: number;
  rating: number;
  reviewsCount: number;

  images: string[];

  badges: string[];

  shortDescription: string;

  highlights: string[];

  featured?: {
    isFeautred: boolean;
    order: number;
  };

  longDescription: ProDescription;

  nutritionFacts: ProductServing;

  ingredients: string[];
}

const productSchema = new Schema({
  name: { type: String, required: true },

  brand: { type: String, default: "Unknown" },

  category: { type: String, required: true },
  subCategory: { type: String, required: true },

  price: { type: Number, required: true },
  stock: { type: Number, required: true },

  rating: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 },
  images: [{ url: String, public_id: String }],

  badges: { type: [String], default: ["Product"] },

  shortDescription: { type: String, required: true },

  highlights: [String],

  longDescription: {
    intro: String,
    sections: [
      {
        title: String,
        content: String,
      },
    ],
    conclusion: String,
  },

  nutritionFacts: {
    servingSize: String,
    servingsPerContainer: Number,
    protein: String,
    carbs: String,
    fat: String,
    calories: Number,
  },

  ingredients: [String],
  featured: {
    isFeatured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product as Model<ProductFields>;
