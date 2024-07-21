import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "./_components/login-form";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Start by signing in with your Google account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
