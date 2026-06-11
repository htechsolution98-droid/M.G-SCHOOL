import connectDB from "@/lib/mongodb";
import Event from "@/backend/models/Event";

export async function getAllEvents() {
  await connectDB();
  const events = await Event.find().sort({ createdAt: -1 });
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
