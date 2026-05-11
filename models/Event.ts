import mongoose, { Schema, Document } from "mongoose";

export interface IEvent extends Document {
  title: string;
  description: string;
  date: string;
  image: string;
  images: string[];
  location: string;
  time: string;
  branch: string;
  category: string;
  status: string;
  createdAt: Date;
}

const EventSchema = new Schema<IEvent>({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  date: { type: String, required: true },
  image: { type: String, default: "" },
  images: [String],
  location: { type: String, default: "" },
  time: { type: String, default: "" },
  branch: { type: String, default: "All" },
  category: { type: String, default: "General" },
  status: { type: String, default: "upcoming" },
  createdAt: { type: Date, default: Date.now },
});

// Use a more robust export pattern for Next.js HMR and schema updates
if (mongoose.models && mongoose.models.Event) {
  delete mongoose.models.Event;
}

export default mongoose.model<IEvent>("Event", EventSchema);
