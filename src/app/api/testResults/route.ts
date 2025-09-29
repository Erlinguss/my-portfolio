import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiUrl = process.env.GITHUB_RESULTS_API;
    if (!apiUrl) {
      return NextResponse.json(
        { error: "Missing GITHUB_RESULTS_API in environment" },
        { status: 500 }
      );
    }

    const response = await fetch(apiUrl, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        // Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch results" },
        { status: response.status }
      );
    }

    const files = await response.json();

    const jsonFiles = files
      .filter((f: { name: string; download_url: string }) =>
        f.name.endsWith(".json")
      )
      .map((f: { name: string; download_url: string }) => ({
        name: f.name,
        download_url: f.download_url,
      }))
      .sort((a: { name: string }, b: { name: string }) =>
        b.name.localeCompare(a.name)
      );

    return NextResponse.json(jsonFiles);
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
