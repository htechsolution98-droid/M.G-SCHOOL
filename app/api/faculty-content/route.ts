import { NextRequest } from "next/server";

export const dynamic = 'force-dynamic';
import {
  handleGetFacultyContent,
  handleUpdateFacultyContent,
  handleDeleteFacultyContent,
} from "@/controllers/facultyContentController";

export async function GET() {
  return handleGetFacultyContent();
}

export async function PUT(req: NextRequest) {
  return handleUpdateFacultyContent(req);
}

export async function DELETE() {
  return handleDeleteFacultyContent();
}
