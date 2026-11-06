import { NextRequest, NextResponse } from "next/server";
import {
  loginAdmin,
  seedAdmin,
  requestPasswordReset,
  resetPassword,
} from "@/backend/services/authService";

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

export async function handleRequestReset(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }
    const result = await requestPasswordReset(email);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to process reset request" },
      { status: 400 }
    );
  }
}

export async function handleResetPassword(req: NextRequest) {
  try {
    const { email, code, newPassword } = await req.json();
    if (!email || !code || !newPassword) {
      return NextResponse.json(
        { error: "Email, code, and new password are required" },
        { status: 400 }
      );
    }
    const result = await resetPassword(email, code, newPassword);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to reset password" },
      { status: 400 }
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
