import mongoose, { Schema, Document } from "mongoose";

export interface IAboutHero {
  image: string;
  heading: string;
  headingHighlight: string;
  description: string;
}

export interface ILegacySection {
  headingPrefix: string;
  headingHighlight: string;
  paragraphs: string[];
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  archiveYear: string;
  archiveTitle: string;
  imageMain: string;
  imageSmall1: string;
  imageSmall2: string;
}

export interface IAboutContent extends Document {
  hero: IAboutHero;
  legacy: ILegacySection;
  updatedAt: Date;
}

const AboutContentSchema: Schema = new Schema({
  hero: {
    image: { type: String, default: "" },
    heading: { type: String, default: "" },
    headingHighlight: { type: String, default: "" },
    description: { type: String, default: "" },
  },
  legacy: {
    headingPrefix: { type: String, default: "" },
    headingHighlight: { type: String, default: "" },
    paragraphs: [{ type: String }],
    stat1Value: { type: String, default: "" },
    stat1Label: { type: String, default: "" },
    stat2Value: { type: String, default: "" },
    stat2Label: { type: String, default: "" },
    archiveYear: { type: String, default: "" },
    archiveTitle: { type: String, default: "" },
    imageMain: { type: String, default: "" },
    imageSmall1: { type: String, default: "" },
    imageSmall2: { type: String, default: "" },
  },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.AboutContent || mongoose.model<IAboutContent>("AboutContent", AboutContentSchema);
