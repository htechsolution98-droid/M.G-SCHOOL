import { NextRequest } from "next/server";
import {
  handleRequestReset,
  handleResetPassword,
} from "@/backend/controllers/authController";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

export async function POST(req: NextRequest) {
  return handleRequestReset(req);
}

export async function PUT(req: NextRequest) {
  return handleResetPassword(req);
}

