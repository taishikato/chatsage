import { nanoid } from "@/lib/utils";
import { Chat } from "./components/chat";
import { AI } from "./lib/chat/actions";
import { getMissingKeys } from "./actions";
import { Header } from "./components/header";
import { Providers } from "./components/providers";
import { LocalStorageProvider } from "./components/localstorage-provider";
import { ClientWrapper } from "./components/client-wrapper";
import { createAdminClient } from "@/lib/supabase/supabaseAdminClient";

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

  const supbabase = createAdminClient();

  const chatBotInternalId = params.id;

  const { data: chatBotData, error } = await supbabase
    .from("chatbots")
    .select("name")
    .match({ internal_id: chatBotInternalId })
    .single();

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
