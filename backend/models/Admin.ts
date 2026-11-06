import mongoose, { Schema, Document } from "mongoose";

export interface IAdmin extends Document {
  email: string;
  password: string;
  name: string;
  role: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  createdAt: Date;
}

const AdminSchema = new Schema<IAdmin>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, default: "Administrator" },
  role: { type: String, default: "admin" },
  resetPasswordToken: { type: String, default: "" },
  resetPasswordExpires: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

if (mongoose.models && mongoose.models.Admin) {
  delete mongoose.models.Admin;
}

export default mongoose.model<IAdmin>("Admin", AdminSchema);
