import { NextRequest, NextResponse } from "next/server";
import { getHeaderConfig, updateHeaderConfig, defaultHeaderConfig } from "@/backend/services/headerConfigService";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const config = await getHeaderConfig();
    return NextResponse.json({ success: true, config });
  } catch (err: any) {
    console.error("GET /api/header-config error:", err);
    // Graceful fallback to default config so frontend always has valid data
    return NextResponse.json({
      success: true,
      config: defaultHeaderConfig,
      fallback: true,
      error: err?.message || String(err),
    });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const config = await updateHeaderConfig(body);
    return NextResponse.json({ success: true, config });
  } catch (err: any) {
    console.error("PUT /api/header-config error:", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to update header configuration" },
      { status: 500 }
    );
  }
}

