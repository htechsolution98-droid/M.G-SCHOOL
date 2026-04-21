import mongoose, { Schema, Document } from "mongoose";

export interface IHeroSlide {
  tagline: string;
  title: string;
  description: string;
  cta: string;
  link: string;
  image: string;
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

export interface ICampusHub {
  id: string; // "block-a", "block-b", etc. (used for linking)
  name: string;
  hub: string;
  title: string;
  desc: string;
  img: string;
}

export interface IHomeContent extends Document {
  heroSlides: IHeroSlide[];
  stats: IStat[];
  philosophy: IPhilosophy;
  campusHubs: ICampusHub[];
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
    },
  ],
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.HomeContent ||
  mongoose.model<IHomeContent>("HomeContent", HomeContentSchema);
