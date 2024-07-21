export default function CreateProjectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-zinc-100 min-h-[calc(100vh-56px)]">
      <div className="pt-24">{children}</div>
    </div>
  );
}
