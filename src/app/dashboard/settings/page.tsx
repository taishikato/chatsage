import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LogoutForm } from "./_components/logout-form";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ProjectUpdateForm } from "./_components/project-update-form";
import { ProjectVisibilityForm } from "./_components/project-visibility-form";
import { ProjectConnect } from "./_components/project-connect";
import { Slider } from "@/components/ui/slider";
import { AiSettings } from "./_components/ai-settings";

export default async function SettingsPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data, error } = await supabase
    .from("chatbots")
    .select("name, is_public, internal_id, temperature")
    .match({
      user_auth_id: user.id,
    })
    .single();

  if (!data || error) redirect("/login");

  return (
    <div className="w-full space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Chatbot name</CardTitle>
        </CardHeader>
        <ProjectUpdateForm projectName={data.name ?? ""} />
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Chatbot visibility</CardTitle>
        </CardHeader>
        <ProjectVisibilityForm
          chatbotVisibility={data.is_public ? "public" : "private"}
        />
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Chatbot connect</CardTitle>
        </CardHeader>

        <ProjectConnect chatbotId={data.internal_id} />
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI</CardTitle>
        </CardHeader>
        <AiSettings temperature={data.temperature ?? 0} />
      </Card>

      <Card x-chunk="dashboard-04-chunk-2">
        <CardHeader>
          <CardTitle>Logout</CardTitle>
        </CardHeader>
        <CardFooter className="border-t px-6 py-4">
          <LogoutForm />
        </CardFooter>
      </Card>
    </div>
  );
}
