import { NextRequest, NextResponse } from "next/server";
import {
  getBranchesContent,
  updateBranchesHero,
  updateBranchesList,
  updateBlockContent,
  deleteBranchesContent
} from "@/backend/services/branchesContentService";

export async function handleGetBranchesContent() {
  try {
    const content = await getBranchesContent();
    return NextResponse.json({ success: true, content });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function handleUpdateBranchesContent(req: NextRequest) {
  try {
    const data = await req.json();
    const { section, ...sectionData } = data;

    let content;

    switch (section) {
      case "hero":
        content = await updateBranchesHero(sectionData.hero);
        break;
      case "branches":
        content = await updateBranchesList(sectionData.branchesList);
        break;
      case "blockA":
      case "blockB":
      case "blockC":
        content = await updateBlockContent(section, sectionData.blockContent);
        break;
      default:
        return NextResponse.json({ success: false, error: "Invalid section" }, { status: 400 });
    }

    return NextResponse.json({ success: true, content });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function handleDeleteBranchesContent() {
  try {
    await deleteBranchesContent();
    return NextResponse.json({ success: true, message: "Content reset to default" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
