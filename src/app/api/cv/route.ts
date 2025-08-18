import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { stat } from "fs/promises";
import path from "path";

export const runtime = "nodejs";

/** This file is static; let Next.js cache it aggressively */
export const dynamic = "force-static";

const CV_FILENAME = "Erling Eduardo Munguia Urbina CV.pdf";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", CV_FILENAME);
    const fileBuffer = await fs.readFile(filePath);
    const info = await stat(filePath);

    return new NextResponse(new Uint8Array(fileBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        // Force download with a clean filename
        "Content-Disposition": `attachment; filename="${CV_FILENAME}"`,
        "Content-Length": String(info.size),
        // Cache for 1 year; change the query (?v=2) on the link when you update the file
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "CV not found" }, { status: 404 });
  }
}
