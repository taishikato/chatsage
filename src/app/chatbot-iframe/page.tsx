import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

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

      <form className="border-t py-2 flex items-center">
        <Textarea
          placeholder="Your Message"
          className="resize-none items-center min-h-[40px] border-none focus-visible:outline-none focus-visible:ring-0"
          rows={1}
        />
        <Button size="icon" variant="ghost" type="submit" className="mr-2">
          <Send className="size-4" />
        </Button>
      </form>

      <footer className="h-10 bg-muted/60 flex items-center justify-center text-xs text-muted-foreground">
        Supachat
      </footer>
    </main>
  );
}
