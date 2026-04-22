import { NextRequest } from "next/server";
import {
  handleGetBranchesContent,
  handleUpdateBranchesContent,
} from "@/controllers/branchesContentController";

export async function GET() {
  return handleGetBranchesContent();
}

export async function PUT(req: NextRequest) {
  return handleUpdateBranchesContent(req);
}
