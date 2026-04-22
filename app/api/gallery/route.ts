import { NextRequest, NextResponse } from "next/server";
import {
  getGalleryContent,
  updateGalleryCategories,
  updateGalleryImages,
  deleteGalleryContent,
} from "@/services/galleryService";

export async function GET() {
  try {
    const content = await getGalleryContent();
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
    if (section === "categories") {
      content = await updateGalleryCategories(sectionData.categories);
    } else if (section === "images") {
      content = await updateGalleryImages(sectionData.images);
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
    await deleteGalleryContent();
    return NextResponse.json({ success: true, message: "Gallery reset to default" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
