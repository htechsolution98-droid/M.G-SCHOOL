import connectDB from "@/lib/mongodb";
import Announcement from "@/backend/models/Announcement";

export async function getAnnouncement() {
  await connectDB();
  let doc = await Announcement.findOne();
  if (!doc) {
    doc = await Announcement.create({});
  }
  return doc;
}

export async function updateAnnouncement(data: any) {
  await connectDB();
  let doc = await Announcement.findOne();
  if (!doc) {
    doc = await Announcement.create(data);
  } else {
    Object.assign(doc, data);
    doc.updatedAt = new Date();
    await doc.save();
  }
  return doc;
}
