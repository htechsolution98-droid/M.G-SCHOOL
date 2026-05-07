import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
import {
  getLifeAtMGContent,
  updateLifeAtMGHero,
  updateLifeAtMGSlider,
  deleteLifeAtMGContent,
} from "@/services/lifeAtMGService";

export async function GET() {
  try {
    const content = await getLifeAtMGContent();
    return NextResponse.json({ success: true, content });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const { section, ...sectionData } = data;

    let content;
    if (section === "hero") {
      content = await updateLifeAtMGHero(sectionData.hero);
    } else if (section === "slider") {
      content = await updateLifeAtMGSlider(sectionData.slider);
    } else {
      return NextResponse.json({ success: false, error: "Invalid section" }, { status: 400 });
    }

    return NextResponse.json({ success: true, content });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    await deleteLifeAtMGContent();
    return NextResponse.json({ success: true, message: "Content reset to default" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
