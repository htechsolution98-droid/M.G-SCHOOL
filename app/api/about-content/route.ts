import { NextRequest } from "next/server";

export const dynamic = 'force-dynamic';
import {
  handleGetAboutContent,
  handleUpdateAboutContent,
} from "@/backend/controllers/aboutContentController";

export async function GET() {
  return handleGetAboutContent();
}

export async function PUT(req: NextRequest) {
  return handleUpdateAboutContent(req);
}
