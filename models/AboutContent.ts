import mongoose, { Schema, Document } from "mongoose";

export interface IAboutHero {
  image: string;
  subheading: string;
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
  images: string[]; // multiple images slideshow
}

export interface IExcellenceItem {
  title: string;
  description: string;
  image: string;
}

export interface IValuesScrollFeature {
  title: string;
  image: string;
  images: string[]; // multiple images slideshow
}

export interface IWhyChooseReason {
  title: string;
  description: string;
}

export interface IWhyChooseUs {
  heading: string;
  headingHighlight: string;
  reasons: IWhyChooseReason[];
}

export interface IPrincipalMessage {
  heading: string;
  message: string;
  name: string;
  qualifications: string;
  designation: string;
  image: string;
}

export interface IAboutContent extends Document {
  hero: IAboutHero;
  legacy: ILegacySection;
  whyChooseUs: IWhyChooseUs;
  principalMessage: IPrincipalMessage;
  excellence: IExcellenceItem[];
  valuesScroll: IValuesScroll;
  updatedAt: Date;
}

const AboutContentSchema: Schema = new Schema({
  hero: {
    image: { type: String, default: "" },
    subheading: { type: String, default: "" },
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
    images: [{ type: String }],
  },
  whyChooseUs: {
    heading: { type: String, default: "Why to study in M. G. School?" },
    headingHighlight: { type: String, default: "Why we are best?" },
    reasons: [
      {
        title: { type: String, default: "" },
        description: { type: String, default: "" },
      }
    ],
  },
  excellence: [
    {
      title: { type: String, default: "" },
      description: { type: String, default: "" },
      image: { type: String, default: "" },
    }
  ],
  valuesScroll: {
    heading: { type: String, default: "" },
    headingHighlight: { type: String, default: "" },
    description: { type: String, default: "" },
    features: [
      {
        title: { type: String, default: "" },
        image: { type: String, default: "" },
        images: [{ type: String }],
      }
    ],
  },
  principalMessage: {
    heading: { type: String, default: "Principal Message" },
    message: { type: String, default: "" },
    name: { type: String, default: "" },
    qualifications: { type: String, default: "" },
    designation: { type: String, default: "" },
    image: { type: String, default: "" },
  },
  updatedAt: { type: Date, default: Date.now },
});

// Force clear model cache for schema updates
if (process.env.NODE_ENV === "development") {
  delete mongoose.models.AboutContent;
}

export default mongoose.models.AboutContent || mongoose.model<IAboutContent>("AboutContent", AboutContentSchema);
