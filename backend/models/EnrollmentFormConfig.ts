import mongoose, { Schema, Document } from "mongoose";

export interface IFormField {
  id: string;
  label: string;
  type: string; // "text", "email", "tel", "textarea", "select", "date"
  required: boolean;
  options?: string[]; // Used if type is "select"
}

export interface IEnrollmentFormConfig extends Document {
  title: string;
  description: string;
  fields: IFormField[];
  updatedAt: Date;
}

const FormFieldSchema = new Schema<IFormField>({
  id: { type: String, required: true },
  label: { type: String, required: true },
  type: { type: String, required: true, default: "text" },
  required: { type: Boolean, default: false },
  options: { type: [String], default: [] },
});

const EnrollmentFormConfigSchema = new Schema<IEnrollmentFormConfig>({
  title: { type: String, default: "Enrollment Application" },
  description: { type: String, default: "Please fill out the form below to apply for enrollment." },
  fields: { type: [FormFieldSchema], default: [] },
  updatedAt: { type: Date, default: Date.now },
});

if (mongoose.models.EnrollmentFormConfig) {
  delete mongoose.models.EnrollmentFormConfig;
}

export default mongoose.model<IEnrollmentFormConfig>("EnrollmentFormConfig", EnrollmentFormConfigSchema);
