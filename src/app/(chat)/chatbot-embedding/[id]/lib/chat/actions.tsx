import "server-only";

import {
  createAI,
  getMutableAIState,
  streamUI,
  createStreamableValue,
} from "ai/rsc";
import { openai } from "@ai-sdk/openai";

import { OpenAIEmbeddings } from "@langchain/openai";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";

import { BotMessage } from "../../components/stocks";

import { nanoid } from "@/lib/utils";
import { SpinnerMessage, UserMessage } from "../../components/stocks/message";
import { Chat, Message } from "@/lib/types";
import { createAdminClient } from "@/lib/supabase/supabaseAdminClient";

const supabaeAdmin = createAdminClient();

async function getRelevantContext(
  query: string,
  vectorStore: SupabaseVectorStore
) {
  const results = await vectorStore.similaritySearch(query, 4);
  return results.map((doc) => doc.pageContent).join("\n\n");
}

const getChat = async (chatbotId: string, conversationId: string) => {
  "use server";

  const aiState = getMutableAIState<typeof AI>();

  const { data } = await supabaeAdmin.from("chat_logs").select("*").match({
    chatbot_internal_id: chatbotId,
    conversation_id: conversationId,
  });

  aiState.update({
    ...aiState.get(),
    // @ts-ignore
    messages: data,
  });

  return data;
};

const submitUserMessage = async (
  content: string,
  chatbotId: string,
  conversationId: string
) => {
  "use server";

  const aiState = getMutableAIState<typeof AI>();

  const userMessage = content;

  const vectorStore = new SupabaseVectorStore(new OpenAIEmbeddings(), {
    client: supabaeAdmin,
    tableName: "vectors",
    queryName: "match_vectors",
    filter: {
      chatbot_internal_id: chatbotId,
    },
  });

  // Fetch relevant context
  const relevantContext = await getRelevantContext(content, vectorStore);

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: nanoid(),
        role: "user",
        content,
      },
    ],
  });

  let textStream: undefined | ReturnType<typeof createStreamableValue<string>>;
  let textNode: undefined | React.ReactNode;

  const result = await streamUI({
    // @ts-ignore
    model: openai("gpt-4o-mini"),
    initial: <SpinnerMessage />,
    system: `\
    You are an advanced AI chatbot designed to assist users by answering their questions using the provided context. Your goal is to understand the user's query, refer to the relevant context, and provide a clear and accurate response.
    The context might include previous conversations, documents, or any other information supplied by the user. Here are your tasks:
    1.Understand the Query: Carefully read and comprehend the user's question. Identify the key information required to form an appropriate response.
    2.Refer to Context: Analyze the provided context to find relevant information that can help answer the user's query. The context may include previous messages, documents, or other sources of information.
    3.Formulate a Response: Based on the query and the context, generate a coherent and concise response. Ensure your answer is accurate and directly addresses the user's question.
    4.Maintain Clarity and Relevance: Your responses should be easy to understand and relevant to the user's query. Avoid providing unnecessary information or deviating from the topic.
    Use the following relevant context to inform your responses: ${relevantContext}`,
    messages: [
      ...aiState.get().messages.map((message: any) => ({
        role: message.role,
        content: message.content,
        name: message.name,
      })),
    ],
    text: async ({ content, done, delta }) => {
      if (!textStream) {
        textStream = createStreamableValue("");
        textNode = <BotMessage content={textStream.value} />;
      }

      if (done) {
        textStream.done();
        aiState.done({
          ...aiState.get(),
          messages: [
            ...aiState.get().messages,
            {
              id: nanoid(),
              role: "assistant",
              content,
            },
          ],
        });

        const messages = [
          {
            role: "user",
            message: userMessage,
            chatbotId: chatbotId,
            conversationId,
          },
          {
            role: "assistant",
            message: content,
            chatbotId: chatbotId,
            conversationId,
          },
        ];

        for (const message of messages) {
          const { error } = await supabaeAdmin.from("chat_logs").insert({
            role: message.role,
            message: message.message,
            chatbot_internal_id: message.chatbotId,
            conversation_id: message.conversationId,
          });
        }
      } else {
        textStream.update(delta);
      }

      return textNode;
    },
  });

  return {
    id: nanoid(),
    display: result.value,
  };
};

export type AIState = {
  chatId: string;
  messages: Message[];
};

export type UIState = {
  id: string;
  display: React.ReactNode;
}[];

export const AI = createAI<AIState, UIState>({
  actions: {
    getChat,
    submitUserMessage,
  },
  initialUIState: [],
  initialAIState: { chatId: nanoid(), messages: [] },
});

export const getUIStateFromAIState = (aiState: Chat) => {
  return aiState.messages
    .filter((message) => message.role !== "system")
    .map((message, index) => ({
      id: `${aiState.chatId}-${index}`,
      display:
        message.role === "user" ? (
          <UserMessage>{message.content as string}</UserMessage>
        ) : message.role === "assistant" &&
          typeof message.content === "string" ? (
          <BotMessage content={message.content} />
        ) : null,
    }));
};
