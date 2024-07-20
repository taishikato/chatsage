import { ChatOpenAI } from "@langchain/openai";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";
import { createAdminClient } from "@/lib/supabase/supabaseAdminClient";
import { ConversationalRetrievalQAChain } from "langchain/chains";

const prompt = "Answer the question based only on the following context.";

export async function POST(req: Request) {
  const supabase = createAdminClient();
  const question = await req.json();

  const model = new ChatOpenAI({
    modelName: "gpt-4o-mini",
    temperature: 0,
    maxTokens: 500,
  });

  const vectorStore = new SupabaseVectorStore(new OpenAIEmbeddings(), {
    client: supabase,
    tableName: "vectors",
    queryName: "match_vectors",
    filter: {
      project_id: "dummy_project_id",
    },
  });

  const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorStore.asRetriever()
  );

  const res = await chain.invoke({
    question: `${prompt} ${question.message}`,
    chat_history: "",
  });

  return Response.json({
    success: true,
    reply: res.text,
  });
}
