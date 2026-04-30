import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import TrusteeContent from "@/models/TrusteeContent";

export async function GET() {
  try {
    await connectDB();
    let doc = await TrusteeContent.findOne();
    if (!doc) {
      doc = await TrusteeContent.create({});
    }
    return NextResponse.json({ success: true, content: doc });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    let doc = await TrusteeContent.findOne();
    if (!doc) {
      doc = await TrusteeContent.create(body);
    } else {
      Object.assign(doc, body);
      doc.updatedAt = new Date();
      await doc.save();
    }

    return NextResponse.json({ success: true, content: doc });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
