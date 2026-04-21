import { NextRequest, NextResponse } from "next/server";
import {
  getAllMessages,
  createMessage,
  markMessageAsRead,
  deleteMessage,
} from "@/services/messageService";

export async function handleGetMessages() {
  try {
    const result = await getAllMessages();
    return NextResponse.json({ success: true, ...result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function handleCreateMessage(req: NextRequest) {
  try {
    const data = await req.json();
    const message = await createMessage(data);
    return NextResponse.json({ success: true, message }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function handleUpdateMessage(req: NextRequest) {
  try {
    const { id, isRead } = await req.json();
    const message = await markMessageAsRead(id, isRead);
    return NextResponse.json({ success: true, message });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function handleDeleteMessage(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Message ID required" }, { status: 400 });
    }

    const result = await deleteMessage(id);
    return NextResponse.json({ success: true, ...result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
