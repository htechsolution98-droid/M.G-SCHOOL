import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { handleSeed } from "@/controllers/authController";

export const dynamic = "force-dynamic";

export async function GET() {
  return handleSeed();
}
