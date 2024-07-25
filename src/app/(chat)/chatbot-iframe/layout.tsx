import { Header } from "./components/header";
import { Providers } from "./components/providers";

interface ChatLayoutProps {
  children: React.ReactNode;
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <>
      <Header />
      <Providers
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className="relative flex h-[calc(100vh_-_theme(spacing.16))] overflow-hidden">
          {children}
        </div>
      </Providers>
    </>
  );
}
