import { NextRequest } from "next/server";
import {
  handleGetMessages,
  handleCreateMessage,
  handleUpdateMessage,
  handleDeleteMessage,
} from "@/controllers/messageController";

export async function GET() {
  return handleGetMessages();
}

export async function POST(req: NextRequest) {
  return handleCreateMessage(req);
}

export async function PUT(req: NextRequest) {
  return handleUpdateMessage(req);
}

export async function DELETE(req: NextRequest) {
  return handleDeleteMessage(req);
}
