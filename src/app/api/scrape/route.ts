import { NextResponse } from "next/server";
import axios from "redaxios";
import { extractTextFromHtml } from "@/lib/extract-text-from-html";
import { parse } from "node-html-parser";
import { OpenAIEmbeddings } from "@langchain/openai";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { createAdminClient } from "@/lib/supabase/supabaseAdminClient";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export async function POST(req: Request): Promise<Response> {
  const supabaseAdmin = createAdminClient();

  const jsonReq = await req.json();

  const url = jsonReq.url;
  const chatbotId = jsonReq.projectId;

  const payload = {
    api_key: process.env.SCRAPER_API_KEY,
    url,
    render_js: "true",
  };
  try {
    const { data } = await axios.get("https://scraping.narf.ai/api/v1/", {
      params: payload,
    });

    const parsed = parse(data);

    const extractedText = extractTextFromHtml(parsed.toString());

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1500,
      chunkOverlap: 100,
    });

    const docs = await splitter.createDocuments(
      [extractedText],
      [
        {
          chatbot_id: chatbotId,
          url,
        },
      ]
    );

    const store = new SupabaseVectorStore(new OpenAIEmbeddings(), {
      client: supabaseAdmin,
      tableName: "vectors",
    });

    await store.addDocuments(docs);

    // save the url on Supabase
    await supabaseAdmin.from("urls").insert({
      url,
      chatbot_id: chatbotId,
    });

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
