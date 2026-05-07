import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import EnrollmentSubmission from "@/models/EnrollmentSubmission";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();
    const submissions = await EnrollmentSubmission.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, submissions });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (id) {
      await EnrollmentSubmission.findByIdAndDelete(id);
    } else {
      await EnrollmentSubmission.deleteMany({});
    }
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await connectDB();
    const { id, status } = await req.json();
    
    await EnrollmentSubmission.findByIdAndUpdate(id, { status });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
