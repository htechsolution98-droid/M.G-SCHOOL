import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import EnrollmentSubmission from "@/models/EnrollmentSubmission";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();
    
    const submission = await EnrollmentSubmission.create({ data });
    return NextResponse.json({ success: true, submission });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
