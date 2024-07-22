export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-[calc(100vh-56px)] w-full flex-col bg-muted/40">
      {children}
    </div>
  );
}
