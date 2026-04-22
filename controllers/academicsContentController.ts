import { NextRequest, NextResponse } from "next/server";
import {
  getAcademicsContent,
  updateAcademicsHero,
  updateAcademicsPrograms,
  updateAcademicsActivities,
  updateAcademicsTeacherDuties,
} from "@/services/academicsContentService";

export async function handleGetAcademicsContent() {
  try {
    const content = await getAcademicsContent();
    return NextResponse.json({ success: true, content });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function handleUpdateAcademicsContent(req: NextRequest) {
  try {
    const data = await req.json();
    const { section, ...sectionData } = data;

    let content;

    switch (section) {
      case "hero":
        content = await updateAcademicsHero(sectionData.hero);
        break;
      case "programs":
        content = await updateAcademicsPrograms(sectionData.programs);
        break;
      case "activities":
        content = await updateAcademicsActivities(sectionData.activities);
        break;
      case "teacherDuties":
        content = await updateAcademicsTeacherDuties(sectionData.teacherDuties);
        break;
      default:
        return NextResponse.json({ success: false, error: "Invalid section" }, { status: 400 });
    }

    return NextResponse.json({ success: true, content });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
