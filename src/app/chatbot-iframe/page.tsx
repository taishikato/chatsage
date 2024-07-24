import { ChatForm } from "./_components/chat-form";

export default function ChatbotIframePage() {
  return (
    <main className="h-full flex flex-col min-h-dvh">
      <header className="px-5 flex items-center justify-between text-primary bg-secondary">
        <div className="h-10 my-4 flex items-center">
          <h1 className="font-semibold text-sm">onseninsider</h1>
        </div>
      </header>

      <div className="flex-1 p-5 text-muted-foreground">
        <div className="flex justify-start">
          <div className="text-sm bg-secondary rounded-xl p-3">
            Hi! What can I help you with?
          </div>
        </div>
      </div>

      <ChatForm />

      <footer className="h-10 bg-muted/60 flex items-center justify-center text-xs text-muted-foreground">
        Supachat
      </footer>
    </main>
  );
}
