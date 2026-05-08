import connectDB from "@/lib/mongodb";
import Message from "@/models/Message";

export async function getAllMessages() {
  await connectDB();
  const messages = await Message.find().sort({ createdAt: -1 });
  return { messages, count: messages.length };
}

export async function createMessage(data: any) {
  await connectDB();
  const message = await Message.create(data);
  return message;
}

export async function markMessageAsRead(id: string, isRead: boolean) {
  await connectDB();

  if (!id) throw new Error("Message ID is required");

  const message = await Message.findByIdAndUpdate(id, { isRead }, { new: true });
  if (!message) throw new Error("Message not found");

  return message;
}

export async function deleteMessage(id: string) {
  await connectDB();

  if (!id) throw new Error("Message ID is required");

  const message = await Message.findByIdAndDelete(id);
  if (!message) throw new Error("Message not found");

  return { message: "Message deleted successfully" };
}
