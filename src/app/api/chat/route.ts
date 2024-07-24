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
      project_id: 1,
    },
  });

  const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorStore.asRetriever()
  );

  let fullResponse = "";

  const modifiedHandlers = {
    ...handlers,
    handleLLMNewToken: (token: string) => {
      fullResponse += token;
      handlers.handleLLMNewToken(token);
    },
  };

  // Call the chain and get the response
  chain.call(
    {
      question: `${prompt} ${question.message}`,
      chat_history: "",
    },
    [modifiedHandlers]
  );

  // Create a new ReadableStream that will be used for the response
  const responseStream = new ReadableStream({
    async start(controller) {
      // Use a TextDecoder to convert the stream chunks to strings

      // Read from the original stream
      const reader = stream.getReader();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            // When the stream is done, save the response and close the controller
            const { error } = await supabase.from("chat_logs").insert({
              messages: [
                {
                  role: "user",
                  message: question,
                },
                {
                  role: "assistant",
                  message: fullResponse,
                },
              ],
            });

            controller.close();
            break;
          }
          // Enqueue the chunk to the new stream
          controller.enqueue(value);
        }
      } catch (error) {
        controller.error(error);
      }
    },
  });

  return new StreamingTextResponse(responseStream);
}
