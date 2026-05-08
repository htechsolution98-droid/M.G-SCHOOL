import mongoose, { Schema, Document } from "mongoose";

export interface IHeroSlide {
  tagline: string;
  title: string;
  description: string;
  cta: string;
  link: string;
  image: string;
  images: string[]; // multiple background images for this slide
  video?: string;
}

export interface IStat {
  label: string;
  value: string;
  icon: string;
}

export interface IPhilosophy {
  badge: string;
  heading: string;
  headingHighlight: string;
  description: string;
  image: string;
  floatingText: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
}

export interface ISchool {
  name: string;
  details: string;
  subDetails: string;
}

export interface IBackgroundSection {
  badge: string;
  title: string;
  titleHighlight: string;
  description: string;
  history: string[];
  approvedCentreTitle: string;
  approvedCentreDesc: string;
  sindhiMediumTitle: string;
  sindhiSchools: ISchool[];
  englishMediumTitle: string;
  englishSchools: ISchool[];
}

export interface ICampusHub {
  id: string; // "block-a", "block-b", etc. (used for linking)
  name: string;
  hub: string;
  title: string;
  desc: string;
  img: string; // kept for backward compat
  images: string[]; // multiple images for slideshow
}

export interface IHomeContent extends Document {
  heroSlides: IHeroSlide[];
  stats: IStat[];
  philosophy: IPhilosophy;
  campusHubs: ICampusHub[];
  background: IBackgroundSection;
  updatedAt: Date;
}

const HomeContentSchema = new Schema<IHomeContent>({
  heroSlides: [
    {
      tagline: { type: String, default: "" },
      title: { type: String, default: "" },
      description: { type: String, default: "" },
      cta: { type: String, default: "" },
      link: { type: String, default: "/" },
      image: { type: String, default: "" },
      images: [{ type: String }],
      video: { type: String, default: "" },
    },
  ],
  stats: [
    {
      label: { type: String, default: "" },
      value: { type: String, default: "" },
      icon: { type: String, default: "Users" },
    },
  ],
  philosophy: {
    badge: { type: String, default: "Established 1995" },
    heading: { type: String, default: "Cultivating" },
    headingHighlight: { type: String, default: "Wisdom" },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    floatingText: { type: String, default: "Child-Centric Learning Approach" },
    features: [{ type: String }],
    ctaText: { type: String, default: "Explore Our Legacy" },
    ctaLink: { type: String, default: "/about" },
  },
  campusHubs: [
    {
      id: { type: String, default: "" },
      name: { type: String, default: "" },
      hub: { type: String, default: "" },
      title: { type: String, default: "" },
      desc: { type: String, default: "" },
      img: { type: String, default: "" },
      images: [{ type: String }],
    },
  ],
  background: {
    badge: { type: String, default: "Established 1948" },
    title: { type: String, default: "Background of" },
    titleHighlight: { type: String, default: "The School." },
    description: { type: String, default: "" },
    history: [{ type: String }],
    approvedCentreTitle: { type: String, default: "Approved Centre" },
    approvedCentreDesc: { type: String, default: "Official centre for SCOPE and GKS courses." },
    sindhiMediumTitle: { type: String, default: " Sindhi Medium" },
    sindhiSchools: [
      {
        name: { type: String, default: "" },
        details: { type: String, default: "" },
        subDetails: { type: String, default: "" },
      },
    ],
    englishMediumTitle: { type: String, default: "English Medium" },
    englishSchools: [
      {
        name: { type: String, default: "" },
        details: { type: String, default: "" },
        subDetails: { type: String, default: "" },
      },
    ],
  },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.HomeContent ||
  mongoose.model<IHomeContent>("HomeContent", HomeContentSchema);
