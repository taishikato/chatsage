import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Chat logs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm">
            <div className="space-y-3 p-4 rounded-xl cursor-pointer hover:bg-secondary">
              <div className="text-secondary-foreground/50 flex items-center justify-between">
                <span>Hi, what is the price?</span>
                <span>4 hours ago</span>
              </div>
              <div>Here is our pricing.</div>
            </div>

            <div className="space-y-3 p-4 rounded-xl cursor-pointer hover:bg-secondary">
              <div className="text-secondary-foreground/50 flex items-center justify-between">
                <span>Hi, what is the price?</span>
                <span>4 hours ago</span>
              </div>
              <div>Here is our pricing.</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
