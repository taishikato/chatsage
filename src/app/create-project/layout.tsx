export default function CreateProjectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-zinc-100">
      <div className="px-6 max-w-7xl mx-auto h-[calc(100vh-56px)] flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
