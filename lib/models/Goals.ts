import mongoose, { Schema, Model } from "mongoose";

export interface GoalsSchema {
  title: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  sections: Array<{
    title: string;
    description: string;
    product: {
      productId: string;
      image: string;
      customTitle: string;
      highlights: string[];
    };
  }>;
  image: string;
}

const goalsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  longDescription: {
    type: String,
    required: true,
  },
  sections: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      product: {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        image: {
          type: String,
        },
        customTitle: {
          type: String,
          required: true,
        },
        highlights: {
          type: [String],
          required: true,
        },
      },
    },
  ],
  image: {
    type: String,
    required: true,
  },
});

export const Goals =
  mongoose.models.Goals || mongoose.model("Goals", goalsSchema);
