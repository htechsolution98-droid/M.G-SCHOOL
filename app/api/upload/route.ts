import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Validate file type — images + videos
    const allowedTypes = [
      // Images
      "image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml",
      // Videos
      "video/mp4", "video/webm", "video/ogg", "video/quicktime",
      "video/x-msvideo", "video/mpeg", "video/3gpp",
    ];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: `Invalid file type (${file.type}). Allowed: JPG, PNG, WebP, GIF, SVG, MP4, WebM, MOV.` },
        { status: 400 }
      );
    }

    const isVideo = file.type.startsWith("video/");

    // In development, save to public/uploads to avoid massive Base64 strings crashing Next.js dev server
    if (process.env.NODE_ENV === "development") {
      const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '-')}`;
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await writeFile(path.join(uploadDir, filename), buffer);

      return NextResponse.json({
        success: true,
        url: `/uploads/${filename}`,
        filename: file.name,
        size: file.size,
      });
    }

    // In production (Vercel), we must use Base64 because the filesystem is read-only
    // Videos can be much larger — allow 100MB; images stay at 5MB
    const maxSize = isVideo ? 100 * 1024 * 1024 : 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `File too large. Maximum ${isVideo ? "100MB" : "5MB"} allowed.` },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');
    const dataUrl = `data:${file.type};base64,${base64}`;

    return NextResponse.json({
      success: true,
      url: dataUrl,
      filename: file.name,
      size: file.size,
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Upload failed: " + error.message },
      { status: 500 }
    );
  }
}
