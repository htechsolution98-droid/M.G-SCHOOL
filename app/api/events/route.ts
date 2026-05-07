import { NextRequest } from "next/server";

export const dynamic = 'force-dynamic';
import {
  handleGetEvents,
  handleCreateEvent,
  handleUpdateEvent,
  handleDeleteEvent,
} from "@/controllers/eventController";

export async function GET() {
  return handleGetEvents();
}

export async function POST(req: NextRequest) {
  return handleCreateEvent(req);
}

export async function PUT(req: NextRequest) {
  return handleUpdateEvent(req);
}

export async function DELETE(req: NextRequest) {
  return handleDeleteEvent(req);
}
