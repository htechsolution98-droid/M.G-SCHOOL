import { NextRequest } from "next/server";

export const dynamic = 'force-dynamic';
import {
  handleGetAcademicsContent,
  handleUpdateAcademicsContent,
} from "@/backend/controllers/academicsContentController";

export async function GET() {
  return handleGetAcademicsContent();
}

export async function PUT(req: NextRequest) {
  return handleUpdateAcademicsContent(req);
}
