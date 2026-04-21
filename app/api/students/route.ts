import { NextRequest } from "next/server";
import {
  handleGetStudents,
  handleCreateStudent,
  handleUpdateStudent,
  handleDeleteStudent,
} from "@/controllers/studentController";

export async function GET(req: NextRequest) {
  return handleGetStudents(req);
}

export async function POST(req: NextRequest) {
  return handleCreateStudent(req);
}

export async function PUT(req: NextRequest) {
  return handleUpdateStudent(req);
}

export async function DELETE(req: NextRequest) {
  return handleDeleteStudent(req);
}
