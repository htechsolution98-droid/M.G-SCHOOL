import { NextRequest } from "next/server";
import {
  handleGetAboutContent,
  handleUpdateAboutContent,
} from "@/controllers/aboutContentController";

export async function GET() {
  return handleGetAboutContent();
}

export async function PUT(req: NextRequest) {
  return handleUpdateAboutContent(req);
}
