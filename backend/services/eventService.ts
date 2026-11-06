import connectDB from "@/lib/mongodb";
import Event from "@/backend/models/Event";
import fs from "fs";
import path from "path";

const FALLBACK_EVENT_IMAGES = [
  "/uploads/1778238856550-event-image12.jpg",
  "/uploads/1778245303309-event-image4-.jpg",
  "/uploads/1778245315488-event-image1.jpg",
  "/images/school3 (1).jpg",
  "/images/kids-school (1).jpg",
];

function sanitizeEventMedia(doc: any, index: number) {
  const item = typeof doc.toObject === "function" ? doc.toObject() : { ...doc };

  // Check if video file exists on disk if it's a local /uploads/ URL
  if (item.video && item.video.startsWith("/uploads/")) {
    const videoDiskPath = path.join(process.cwd(), "public", item.video.replace(/^\//, ""));
    if (!fs.existsSync(videoDiskPath)) {
      item.video = "";
    }
  }

  // Check if primary image exists
  let hasValidImage = false;
  if (item.image && typeof item.image === "string" && item.image.trim()) {
    if (item.image.startsWith("/uploads/")) {
      const imgDiskPath = path.join(process.cwd(), "public", item.image.replace(/^\//, ""));
      hasValidImage = fs.existsSync(imgDiskPath);
    } else {
      hasValidImage = true;
    }
  }

  if (!hasValidImage) {
    const chosenFallback = FALLBACK_EVENT_IMAGES[index % FALLBACK_EVENT_IMAGES.length];
    item.image = chosenFallback;
    if (!Array.isArray(item.images) || item.images.length === 0) {
      item.images = [chosenFallback];
    }
  }

  return item;
}

export async function getAllEvents() {
  await connectDB();
  const rawEvents = await Event.find().sort({ createdAt: -1 });
  const events = rawEvents.map((evt, idx) => sanitizeEventMedia(evt, idx));
  return { events, count: events.length };
}

export async function createEvent(data: any) {
  await connectDB();
  const event = await Event.create(data);
  return event;
}

export async function updateEvent(id: string, data: any) {
  await connectDB();

  if (!id) throw new Error("Event ID is required");

  const event = await Event.findByIdAndUpdate(id, { $set: data }, { new: true });
  if (!event) throw new Error("Event not found");

  return event;
}

export async function deleteEvent(id: string) {
  await connectDB();

  if (!id) throw new Error("Event ID is required");

  const event = await Event.findByIdAndDelete(id);
  if (!event) throw new Error("Event not found");

  return { message: "Event deleted successfully" };
}
