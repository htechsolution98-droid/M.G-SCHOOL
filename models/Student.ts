import mongoose, { Schema, Document } from "mongoose";

export interface IStudent extends Document {
  name: string;
  rollNumber: string;
  grade: string;
  section: string;
  branch: string;
  parentName: string;
  phone: string;
  email: string;
  address: string;
  dateOfBirth: string;
  admissionDate: string;
  status: string;
  createdAt: Date;
}

const StudentSchema = new Schema<IStudent>({
  name: { type: String, required: true },
  rollNumber: { type: String, required: true },
  grade: { type: String, required: true },
  section: { type: String, default: "A" },
  branch: { type: String, required: true },
  parentName: { type: String, default: "" },
  phone: { type: String, default: "" },
  email: { type: String, default: "" },
  address: { type: String, default: "" },
  dateOfBirth: { type: String, default: "" },
  admissionDate: { type: String, default: "" },
  status: { type: String, default: "active" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Student || mongoose.model<IStudent>("Student", StudentSchema);
