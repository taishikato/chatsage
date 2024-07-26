import "server-only";

import {
  createAI,
  getMutableAIState,
  getAIState,
  streamUI,
  createStreamableValue,
} from "ai/rsc";
import { openai } from "@ai-sdk/openai";

import { OpenAIEmbeddings } from "@langchain/openai";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";

import { BotMessage } from "../../components/stocks";

import { nanoid } from "@/lib/utils";
// import { saveChat } from '@/app/actions'
import { SpinnerMessage, UserMessage } from "../../components/stocks/message";
import { Chat, Message } from "@/lib/types";
import { createAdminClient } from "@/lib/supabase/supabaseAdminClient";
// import { auth } from '@/auth'

const supabaeAdmin = createAdminClient();

const vectorStore = new SupabaseVectorStore(new OpenAIEmbeddings(), {
  client: supabaeAdmin,
  tableName: "vectors",
  queryName: "match_vectors",
  filter: {
    chatbot_id: 1,
  },
});

async function getRelevantContext(query: string) {
  const results = await vectorStore.similaritySearch(query, 4);
  return results.map((doc) => doc.pageContent).join("\n\n");
}

const getChat = async (chatbotId: string, conversationId: string) => {
  "use server";

  const aiState = getMutableAIState<typeof AI>();

  const { data } = await supabaeAdmin.from("chat_logs").select("*").match({
    chatbot_id: chatbotId,
    conversation_id: conversationId,
  });

  console.log("getChat");

  console.log({ data });

  aiState.update({
    ...aiState.get(),
    // @ts-ignore
    messages: data,
  });

  return data;
};

const submitUserMessage = async (content: string, conversationId: string) => {
  "use server";

  const aiState = getMutableAIState<typeof AI>();

  const userMessage = content;

  // Fetch relevant context
  const relevantContext = await getRelevantContext(content);

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
    // You are a stock trading conversation bot and you can help users buy stocks, step by step.
    // You and the user can discuss stock prices and the user can adjust the amount of stocks they want to buy, or place an order, in the UI.
    
    // Messages inside [] means that it's a UI element or a user event. For example:
    // - "[Price of AAPL = 100]" means that an interface of the stock price of AAPL is shown to the user.
    // - "[User has changed the amount of AAPL to 10]" means that the user has changed the amount of AAPL to 10 in the UI.
    
    // If the user requests purchasing a stock, call \`show_stock_purchase_ui\` to show the purchase UI.
    // If the user just wants the price, call \`show_stock_price\` to show the price.
    // If you want to show trending stocks, call \`list_stocks\`.
    // If you want to show events, call \`get_events\`.
    // If the user wants to sell stock, or complete another impossible task, respond that you are a demo and cannot do that.
    
    // Besides that, you can also chat with users and do some calculations if needed.
    
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
            chatbotId: 1,
            conversationId,
          },
          {
            role: "assistant",
            message: content,
            chatbotId: 1,
            conversationId,
          },
        ];

        for (const message of messages) {
          const { error } = await supabaeAdmin.from("chat_logs").insert({
            role: message.role,
            message: message.message,
            chatbot_id: message.chatbotId,
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
  onGetUIState: async () => {
    "use server";

    // const session = await auth()

    // console.log({ session })

    // if (session && session.user) {
    //   const aiState = getAIState() as Chat

    //   if (aiState) {
    //     const uiState = getUIStateFromAIState(aiState)
    //     return uiState
    //   }
    // } else {
    //   return
    // }

    const aiState = getAIState() as Chat;
    const uiState = getUIStateFromAIState(aiState);

    return uiState;
  },
  onSetAIState: async ({ state }) => {
    "use server";

    // const session = await auth()

    // if (session && session.user) {
    //   const { chatId, messages } = state

    //   const createdAt = new Date()
    //   const userId = session.user.id as string
    //   const path = `/chat/${chatId}`

    //   const firstMessageContent = messages[0].content as string
    //   const title = firstMessageContent.substring(0, 100)

    //   const chat: Chat = {
    //     id: chatId,
    //     title,
    //     userId,
    //     createdAt,
    //     messages,
    //     path
    //   }

    //   await saveChat(chat)
    // } else {
    //   return
    // }

    return;
  },
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
