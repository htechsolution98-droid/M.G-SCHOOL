import { handleSeed } from "@/controllers/authController";

export async function GET() {
  return handleSeed();
}
