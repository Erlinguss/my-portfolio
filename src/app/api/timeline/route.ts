import { NextResponse } from "next/server";
import clientPromise from "../lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("portfolio");
    const timeline = await db.collection("timeline").find({}).toArray();
    return NextResponse.json(timeline);
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to fetch timeline" },
      { status: 500 }
    );
  }
}
