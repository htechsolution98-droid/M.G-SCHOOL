import mongoose, { Schema, Document } from "mongoose";

export interface IGalleryImage {
  src: string;
  category: string;
  title: string;
}

export interface IGalleryContent extends Document {
  images: IGalleryImage[];
  categories: string[];
  updatedAt: Date;
}

const GalleryContentSchema: Schema = new Schema({
  images: [
    {
      src: { type: String, required: true },
      category: { type: String, required: true },
      title: { type: String, required: true },
    },
  ],
  categories: [{ type: String }],
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.GalleryContent ||
  mongoose.model<IGalleryContent>("GalleryContent", GalleryContentSchema);
