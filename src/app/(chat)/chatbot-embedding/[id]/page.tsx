import { nanoid } from "@/lib/utils";
import { Chat } from "./components/chat";
import { AI } from "./lib/chat/actions";
import { getMissingKeys } from "./actions";
import { Header } from "./components/header";
import { Providers } from "./components/providers";
import { LocalStorageProvider } from "./components/localstorage-provider";
import { ClientWrapper } from "./components/client-wrapper";
import { createAdminClient } from "@/lib/supabase/supabaseAdminClient";
import type { Metadata } from "next";

export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const supbabase = createAdminClient();

  const chatBotInternalId = params.id;

  const { data: chatBotData, error } = await supbabase
    .from("chatbots")
    .select("name, is_public")
    .match({ internal_id: chatBotInternalId })
    .single();

  return {
    title: chatBotData ? chatBotData.name : "No name",
  };
}

export default async function ChatbotPage({
  params,
}: {
  params: { id: string };
}) {
  const id = nanoid();
  const missingKeys = await getMissingKeys();

  const supbabase = createAdminClient();

  const chatBotInternalId = params.id;

  const { data: chatBotData, error } = await supbabase
    .from("chatbots")
    .select("name, is_public")
    .match({ internal_id: chatBotInternalId })
    .single();

  if (!chatBotData || !chatBotData?.is_public)
    return (
      <main className="h-full w-full flex-1 flex items-center justify-center">
        This chatbot is unavailable.
      </main>
    );

  return (
    <>
      <Providers
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <LocalStorageProvider id={id} chatbotId={chatBotInternalId}>
          <Header chatBotName={chatBotData?.name ?? "no name"} />
          <ClientWrapper>
            <div className="relative flex h-[calc(100vh_-_theme(spacing.16))] overflow-hidden">
              <AI initialAIState={{ chatId: id, messages: [] }}>
                <Chat
                  id={id}
                  missingKeys={missingKeys}
                  chatbotId={chatBotInternalId}
                />
              </AI>
            </div>
          </ClientWrapper>
        </LocalStorageProvider>
      </Providers>
    </>
  );
}
