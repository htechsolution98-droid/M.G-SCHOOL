import mongoose, { Schema, Document } from "mongoose";

export interface IAcademicsHero {
  heading: string;
  headingHighlight: string;
  description: string;
  image: string;
}

export interface IAcademicsProgram {
  title: string;
  level: string;
  tagline: string;
  description: string;
  image: string;
  color: string;
  features: string[];
}

export interface IAcademicsContent extends Document {
  hero: IAcademicsHero;
  programs: IAcademicsProgram[];
  updatedAt: Date;
}

const AcademicsContentSchema = new Schema<IAcademicsContent>({
  hero: {
    heading: { type: String, default: "Elite" },
    headingHighlight: { type: String, default: "Curriculum." },
    description: { type: String, default: '"Academic rigour meets creative freedom. We cultivate minds that think differently and lead effectively."' },
    image: { type: String, default: "https://images.unsplash.com/photo-1523050853063-bd40d04b68ce?q=80&w=2070" },
  },
  programs: [
    {
      title: { type: String, default: "" },
      level: { type: String, default: "" },
      tagline: { type: String, default: "" },
      description: { type: String, default: "" },
      image: { type: String, default: "" },
      color: { type: String, default: "from-primary/10 to-transparent" },
      features: [{ type: String }],
    },
  ],
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.AcademicsContent ||
  mongoose.model<IAcademicsContent>("AcademicsContent", AcademicsContentSchema);
