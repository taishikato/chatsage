import { NextResponse } from "next/server";
import axios from "redaxios";
import { extractTextFromHtml } from "@/lib/extract-text-from-html";
import { parse } from "node-html-parser";

export async function POST(req: Request): Promise<Response> {
  const payload = {
    api_key: process.env.SCRAPER_API_KEY,
    url: "https://taishikato.com/",
    render_js: "true",
  };
  try {
    const { data } = await axios.get("https://scraping.narf.ai/api/v1/", {
      params: payload,
    });

    const parsed = parse(data);

    const extractedText = extractTextFromHtml(parsed.toString());

    return NextResponse.json({
      success: true,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
