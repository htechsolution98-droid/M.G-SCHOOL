import mongoose, { Schema } from "mongoose";

const AnnouncementSchema = new Schema({
  text:        { type: String, default: "" },
  heading:     { type: String, default: "" },
  description: { type: String, default: "" },
  image:       { type: String, default: "" },   // optional image URL
  isActive:    { type: Boolean, default: false },
  bgColor:     { type: String, default: "#0EA5E9" },
  textColor:   { type: String, default: "#FFFFFF" },
  link:        { type: String, default: "" },
  linkLabel:   { type: String, default: "Learn More" },
  updatedAt:   { type: Date, default: Date.now },
});

export default mongoose.models.Announcement ||
  mongoose.model("Announcement", AnnouncementSchema);
