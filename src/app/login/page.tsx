import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "./_components/login-form";
import { Header } from "@/components/header";

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="flex items-center justify-center h-[calc(100vh-64px)] bg-muted/40">
        <Card className="w-full max-w-sm rounded-xl">
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
      </main>
    </>
  );
}
