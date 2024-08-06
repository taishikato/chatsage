import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChatLogSection } from "./_components/chat-log-section";

export default function DashboardPage() {
  return (
    <div className="w-full gap-6 flex-1">
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
