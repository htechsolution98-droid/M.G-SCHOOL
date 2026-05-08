import { NextRequest, NextResponse } from "next/server";
import {
  getFacultyContent,
  updateFacultyHero,
  updateFacultyMembers,
  deleteFacultyContent
} from "@/services/facultyContentService";

export async function handleGetFacultyContent() {
  try {
    const content = await getFacultyContent();
    return NextResponse.json({ success: true, content });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function handleUpdateFacultyContent(req: NextRequest) {
  try {
    const data = await req.json();
    const { section, ...sectionData } = data;

    let content;

    switch (section) {
      case "hero":
        content = await updateFacultyHero(sectionData.hero);
        break;
      case "members":
        content = await updateFacultyMembers(sectionData.facultyMembers);
        break;
      default:
        return NextResponse.json({ success: false, error: "Invalid section" }, { status: 400 });
    }

    return NextResponse.json({ success: true, content });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function handleDeleteFacultyContent() {
  try {
    await deleteFacultyContent();
    return NextResponse.json({ success: true, message: "Content reset to default" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
