import { NextRequest, NextResponse } from "next/server";
import {
  getAboutContent,
  updateAboutHero,
  updateAboutLegacy,
} from "@/services/aboutContentService";

export async function handleGetAboutContent() {
  try {
    const content = await getAboutContent();
    return NextResponse.json({ success: true, content });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function handleUpdateAboutContent(req: NextRequest) {
  try {
    const data = await req.json();
    const { section, ...sectionData } = data;

    let content;

    switch (section) {
      case "hero":
        content = await updateAboutHero(sectionData.hero);
        break;
      case "legacy":
        content = await updateAboutLegacy(sectionData.legacy);
        break;
      default:
        throw new Error("Invalid section");
    }

    return NextResponse.json({ success: true, content });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
