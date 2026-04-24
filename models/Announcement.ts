import mongoose, { Schema } from "mongoose";

const AnnouncementSchema = new Schema({
  text:        { type: String, default: "" },
  heading:     { type: String, default: "" },
  description: { type: String, default: "" },
  image:       { type: String, default: "" },   // optional image URL
  isActive:    { type: Boolean, default: false },
  bgColor:     { type: String, default: "#F59E0B" },
  textColor:   { type: String, default: "#1E3A8A" },
  link:        { type: String, default: "" },
  linkLabel:   { type: String, default: "Learn More" },
  updatedAt:   { type: Date, default: Date.now },
});

export default mongoose.models.Announcement ||
  mongoose.model("Announcement", AnnouncementSchema);
