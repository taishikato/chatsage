import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChatLogSection } from "./_components/chat-log-section";

export default function DashboardPage() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Chat logs</CardTitle>
        </CardHeader>
        <CardContent>
          <ChatLogSection />
        </CardContent>
      </Card>
    </div>
  );
}
