import { ChatOpenAI } from "@langchain/openai";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";
import { createAdminClient } from "@/lib/supabase/supabaseAdminClient";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { StreamingTextResponse, LangChainStream } from "ai";

const prompt = "Answer the question based only on the following context.";

export async function POST(req: Request) {
  const supabase = createAdminClient();
  const question = await req.json();

  const { stream, handlers } = LangChainStream();

  const model = new ChatOpenAI({
    modelName: "gpt-4o-mini",
    temperature: 0,
    maxTokens: 500,
    streaming: true,
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

  chain.call(
    {
      question: `${prompt} ${question.message}`,
      chat_history: "",
    },
    [handlers]
  );

  return new StreamingTextResponse(stream);
}
