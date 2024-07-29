export default function CreateProjectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-muted/40 min-h-[calc(100vh-64px)]">
      <div className="pt-24">{children}</div>
    </div>
  );
}
