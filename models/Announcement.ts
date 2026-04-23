import mongoose, { Schema } from "mongoose";

const AnnouncementSchema = new Schema({
  text: { type: String, default: "" },
  isActive: { type: Boolean, default: false },
  bgColor: { type: String, default: "#F59E0B" },   // amber/secondary
  textColor: { type: String, default: "#1E3A8A" },  // primary
  link: { type: String, default: "" },
  linkLabel: { type: String, default: "Learn More" },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Announcement ||
  mongoose.model("Announcement", AnnouncementSchema);
