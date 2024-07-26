import { nanoid } from "@/lib/utils";
import { Chat } from "./components/chat";
import { AI } from "./lib/chat/actions";
import { getMissingKeys } from "./actions";
import { createClient } from "@/lib/supabase/server";
import { Header } from "./components/header";
import { Providers } from "./components/providers";

export const metadata = {
  title: "Next.js AI Chatbot",
};

export default async function IndexPage({
  params,
}: {
  params: { id: string };
}) {
  const id = nanoid();
  const missingKeys = await getMissingKeys();

  const supbabase = createClient();

  const chatBotInternalId = params.id;

  const { data: chatBotData, error } = await supbabase
    .from("chatbots")
    .select("name")
    .match({ internal_id: chatBotInternalId })
    .single();

  if (error || !chatBotData) throw new Error(error.message ?? "No data found");

  return (
    <>
      <Header chatBotName={chatBotData.name} />
      <Providers
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className="relative flex h-[calc(100vh_-_theme(spacing.16))] overflow-hidden">
          <AI initialAIState={{ chatId: id, messages: [] }}>
            <Chat
              id={id}
              chatbotId={chatBotInternalId}
              missingKeys={missingKeys}
            />
          </AI>
        </div>
      </Providers>
    </>
  );
}
