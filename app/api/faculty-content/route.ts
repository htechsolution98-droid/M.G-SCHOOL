import { NextRequest } from "next/server";
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
