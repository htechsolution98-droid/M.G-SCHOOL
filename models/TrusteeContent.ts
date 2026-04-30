import mongoose, { Schema, Document } from "mongoose";

export interface ITrustee {
  name: string;
  designation: string;
  description: string;
  image: string;
}

export interface ITrusteeContent extends Document {
  hero: {
    heading: string;
    description: string;
    image: string;
  };
  trustees: ITrustee[];
  updatedAt: Date;
}

const TrusteeContentSchema: Schema = new Schema({
  hero: {
    heading: { type: String, default: "Our Trustees" },
    description: { type: String, default: "Meet the visionary leaders behind our institution." },
    image: { type: String, default: "" },
  },
  trustees: [
    {
      name: { type: String, default: "" },
      designation: { type: String, default: "" },
      description: { type: String, default: "" },
      image: { type: String, default: "" },
    },
  ],
  updatedAt: { type: Date, default: Date.now },
});

// Force clear model cache for schema updates
if (process.env.NODE_ENV === "development") {
  delete mongoose.models.TrusteeContent;
}

export default mongoose.models.TrusteeContent ||
  mongoose.model<ITrusteeContent>("TrusteeContent", TrusteeContentSchema);
