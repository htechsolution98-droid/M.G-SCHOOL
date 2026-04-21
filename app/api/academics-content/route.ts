import { NextRequest } from "next/server";
import {
  handleGetAcademicsContent,
  handleUpdateAcademicsContent,
} from "@/controllers/academicsContentController";

export async function GET() {
  return handleGetAcademicsContent();
}

export async function PUT(req: NextRequest) {
  return handleUpdateAcademicsContent(req);
}
