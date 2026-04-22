import mongoose, { Schema, Document } from "mongoose";

export interface IBranchesHero {
  heading: string;
  headingHighlight: string;
  description: string;
}

export interface IBranchCard {
  id: string;
  name: string;
  subtitle: string;
  grades: string;
  medium: string;
  location: string;
  image: string;
}

export interface IBlockContent {
  name: string;
  subtitle: string;
  grades: string;
  medium: string;
  description: string;
  images: string[];
  location: string;
  principal: string;
  specialties: string[];
}

export interface IBranchesContent extends Document {
  hero: IBranchesHero;
  branchesList: IBranchCard[];
  blockA: IBlockContent;
  blockB: IBlockContent;
  blockC: IBlockContent;
  updatedAt: Date;
}

const BlockContentSchema = new Schema<IBlockContent>({
  name: { type: String, default: "" },
  subtitle: { type: String, default: "" },
  grades: { type: String, default: "" },
  medium: { type: String, default: "" },
  description: { type: String, default: "" },
  images: { type: [String], default: [] },
  location: { type: String, default: "" },
  principal: { type: String, default: "" },
  specialties: { type: [String], default: [] },
});

const BranchesContentSchema = new Schema<IBranchesContent>({
  hero: {
    heading: { type: String, default: "Distributed " },
    headingHighlight: { type: String, default: "Excellence." },
    description: { type: String, default: "Three distinct campuses, one unified vision of nurturing tomorrow's leaders." },
  },
  branchesList: [
    {
      id: { type: String, default: "" },
      name: { type: String, default: "" },
      subtitle: { type: String, default: "" },
      grades: { type: String, default: "" },
      medium: { type: String, default: "" },
      location: { type: String, default: "" },
      image: { type: String, default: "" },
    },
  ],
  blockA: { type: BlockContentSchema, default: () => ({}) },
  blockB: { type: BlockContentSchema, default: () => ({}) },
  blockC: { type: BlockContentSchema, default: () => ({}) },
  updatedAt: { type: Date, default: Date.now },
});

if (mongoose.models.BranchesContent) {
  delete mongoose.models.BranchesContent;
}
export default mongoose.model<IBranchesContent>("BranchesContent", BranchesContentSchema);
