import { NextRequest, NextResponse } from "next/server";
import {
  getAllEvents,
  createEvent,
  deleteEvent,
} from "@/services/eventService";

export async function handleGetEvents() {
  try {
    const result = await getAllEvents();
    return NextResponse.json({ success: true, ...result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function handleCreateEvent(req: NextRequest) {
  try {
    const data = await req.json();
    const event = await createEvent(data);
    return NextResponse.json({ success: true, event }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function handleDeleteEvent(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Event ID required" }, { status: 400 });
    }

    const result = await deleteEvent(id);
    return NextResponse.json({ success: true, ...result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
