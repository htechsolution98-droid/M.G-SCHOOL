import mongoose, { Schema, Document } from "mongoose";

export interface IFacultyMember {
  name: string;
  designation: string;
  expertise: string;
  image: string;
  block: string; // e.g. "Block A", "Block B", "Block C"
  experience?: string;
  education?: string;
}

export interface IFacultyHeroSlide {
  image: string;
  name: string;
  role: string;
  description: string;
}

export interface IFacultyContent extends Document {
  hero: {
    heading: string;
    headingHighlight: string;
    description: string;
    slides: IFacultyHeroSlide[];
  };
  facultyMembers: IFacultyMember[];
  updatedAt: Date;
}

const FacultyContentSchema: Schema = new Schema({
  hero: {
    heading: { type: String, required: true },
    headingHighlight: { type: String, required: true },
    description: { type: String, required: true },
    slides: [
      {
        image: { type: String, default: "" },
        name: { type: String, default: "" },
        role: { type: String, default: "" },
        description: { type: String, default: "" },
      }
    ],
  },
  facultyMembers: [
    {
      name: { type: String, required: true },
      designation: { type: String, required: true },
      expertise: { type: String, required: true },
      image: { type: String, required: true },
      block: { type: String, required: true },
      experience: { type: String },
      education: { type: String },
    },
  ],
  updatedAt: { type: Date, default: Date.now },
});

if (mongoose.models.FacultyContent) {
  delete mongoose.models.FacultyContent;
}
export default mongoose.model<IFacultyContent>("FacultyContent", FacultyContentSchema);
