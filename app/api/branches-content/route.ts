import { NextRequest } from "next/server";

export const dynamic = 'force-dynamic';
import {
  handleGetBranchesContent,
  handleUpdateBranchesContent,
  handleDeleteBranchesContent,
} from "@/backend/controllers/branchesContentController";

export async function GET() {
  return handleGetBranchesContent();
}

export async function PUT(req: NextRequest) {
  return handleUpdateBranchesContent(req);
}

export async function DELETE() {
  return handleDeleteBranchesContent();
}
