import { NextRequest, NextResponse } from "next/server";
import {
  getHomeContent,
  updateHomeContent,
  updateHeroSlides,
  updateStats,
  updatePhilosophy,
  updateCampusHubs,
} from "@/services/homeContentService";

export async function handleGetHomeContent() {
  try {
    const content = await getHomeContent();
    return NextResponse.json({ success: true, content });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function handleUpdateHomeContent(req: NextRequest) {
  try {
    const data = await req.json();
    const { section, ...sectionData } = data;

    let content;

    switch (section) {
      case "heroSlides":
        content = await updateHeroSlides(sectionData.heroSlides);
        break;
      case "stats":
        content = await updateStats(sectionData.stats);
        break;
      case "philosophy":
        content = await updatePhilosophy(sectionData.philosophy);
        break;
      case "campusHubs":
        content = await updateCampusHubs(sectionData.campusHubs);
        break;
      default:
        content = await updateHomeContent(sectionData);
        break;
    }

    return NextResponse.json({ success: true, content });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
