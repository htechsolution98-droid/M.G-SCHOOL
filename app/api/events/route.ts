import { NextRequest } from "next/server";
import {
  handleGetEvents,
  handleCreateEvent,
  handleDeleteEvent,
} from "@/controllers/eventController";

export async function GET() {
  return handleGetEvents();
}

export async function POST(req: NextRequest) {
  return handleCreateEvent(req);
}

export async function DELETE(req: NextRequest) {
  return handleDeleteEvent(req);
}
