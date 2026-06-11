import { NextRequest, NextResponse } from "next/server";
import { loginAdmin, seedAdmin } from "@/backend/services/authService";

export async function handleLogin(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const result = await loginAdmin(email, password);

    return NextResponse.json({ success: true, ...result });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Invalid email or password" },
      { status: 401 }
    );
  }
}

export async function handleSeed() {
  try {
    const result = await seedAdmin();
    return NextResponse.json({ success: true, ...result });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to seed admin: " + error.message },
      { status: 500 }
    );
  }
}
