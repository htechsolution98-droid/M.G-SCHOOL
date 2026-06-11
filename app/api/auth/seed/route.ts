import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { handleSeed } from "@/backend/controllers/authController";

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

export async function GET() {
  return handleSeed();
}
