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

export interface IFacultyContent extends Document {
  hero: {
    heading: string;
    headingHighlight: string;
    description: string;
    images: string[];
  };
  facultyMembers: IFacultyMember[];
  updatedAt: Date;
}

const FacultyContentSchema: Schema = new Schema({
  hero: {
    heading: { type: String, required: true },
    headingHighlight: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String }],
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

export default mongoose.models.FacultyContent ||
  mongoose.model<IFacultyContent>("FacultyContent", FacultyContentSchema);
