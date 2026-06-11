import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import TrusteeContent from "@/backend/models/TrusteeContent";

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;
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

export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    let doc = await TrusteeContent.findOne();
    if (!doc) {
      doc = await TrusteeContent.create(body);
    } else {
      // Remove _id and __v if they exist to avoid immutable field errors
      const { _id, __v, ...updateData } = body;
      Object.assign(doc, updateData);
      doc.updatedAt = new Date();
      await doc.save();
    }

    return NextResponse.json({ success: true, content: doc });
  } catch (error: any) {
    console.error("Trustees PUT Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
