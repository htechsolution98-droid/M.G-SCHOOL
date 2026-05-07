import mongoose, { Schema, Document } from "mongoose";

export interface ILifeAtMGContent extends Document {
  hero: {
    heading: string;
    description: string;
    image: string;
  };
  slider: string[];
  updatedAt: Date;
}

const LifeAtMGContentSchema: Schema = new Schema({
  hero: {
    heading: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
  },
  slider: [{ type: String }],
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.LifeAtMGContent ||
  mongoose.model<ILifeAtMGContent>("LifeAtMGContent", LifeAtMGContentSchema);
