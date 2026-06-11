import mongoose, { Schema, Document } from "mongoose";

export interface ILifeAtMGSlide {
  url: string;
  type: "image" | "video";
  title?: string;
}

export interface ILifeAtMGContent extends Document {
  hero: {
    heading: string;
    description: string;
    image: string;
  };
  slider: ILifeAtMGSlide[];
  updatedAt: Date;
}

const LifeAtMGContentSchema: Schema = new Schema({
  hero: {
    heading: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
  },
  slider: [
    {
      url: { type: String, required: true },
      type: { type: String, enum: ["image", "video"], default: "image" },
      title: { type: String },
    }
  ],
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.LifeAtMGContent ||
  mongoose.model<ILifeAtMGContent>("LifeAtMGContent", LifeAtMGContentSchema);
