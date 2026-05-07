import { NextRequest } from "next/server";
import { handleLogin } from "@/controllers/authController";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  return handleLogin(req);
}
