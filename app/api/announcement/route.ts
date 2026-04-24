import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
import connectDB from "@/lib/mongodb";
import Announcement from "@/models/Announcement";

export async function GET() {
  await connectDB();
  try {
    let doc = await Announcement.findOne();
    if (!doc) {
      doc = await Announcement.create({});
    }
    return NextResponse.json({ success: true, announcement: doc });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  await connectDB();
  try {
    const body = await req.json();
    let doc = await Announcement.findOne();
    if (!doc) {
      doc = await Announcement.create(body);
    } else {
      Object.assign(doc, body);
      doc.updatedAt = new Date();
      await doc.save();
    }
    return NextResponse.json({ success: true, announcement: doc });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
