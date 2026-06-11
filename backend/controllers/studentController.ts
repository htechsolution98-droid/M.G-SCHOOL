import { NextRequest, NextResponse } from "next/server";
import {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "@/backend/services/studentService";

export async function handleGetStudents(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const filters = {
      branch: searchParams.get("branch") || undefined,
      grade: searchParams.get("grade") || undefined,
      status: searchParams.get("status") || undefined,
    };

    const result = await getAllStudents(filters);
    return NextResponse.json({ success: true, ...result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function handleCreateStudent(req: NextRequest) {
  try {
    const data = await req.json();
    const student = await createStudent(data);
    return NextResponse.json({ success: true, student }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function handleUpdateStudent(req: NextRequest) {
  try {
    const data = await req.json();
    const { _id, ...updateData } = data;
    const student = await updateStudent(_id, updateData);
    return NextResponse.json({ success: true, student });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function handleDeleteStudent(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Student ID required" }, { status: 400 });
    }

    const result = await deleteStudent(id);
    return NextResponse.json({ success: true, ...result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
