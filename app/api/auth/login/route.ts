import { NextRequest } from "next/server";
import { handleLogin } from "@/backend/controllers/authController";

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

export async function POST(req: NextRequest) {
  return handleLogin(req);
}
