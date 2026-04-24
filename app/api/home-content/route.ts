import { NextRequest } from "next/server";

export const dynamic = 'force-dynamic';
import {
  handleGetHomeContent,
  handleUpdateHomeContent,
} from "@/controllers/homeContentController";

export async function GET() {
  return handleGetHomeContent();
}

export async function PUT(req: NextRequest) {
  return handleUpdateHomeContent(req);
}
