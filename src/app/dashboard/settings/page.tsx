import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LogoutForm } from "./_components/logout-form";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ProjectUpdateForm } from "./_components/project-update-form";

export default async function SettingsPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data } = await supabase.from("chatbots").select("name").match({
    user_auth_id: user.id,
  });

  return (
    <div className="grid gap-6">
      <Card x-chunk="dashboard-04-chunk-1">
        <CardHeader>
          <CardTitle>Chatbot name</CardTitle>
        </CardHeader>
        <ProjectUpdateForm
          projectName={data ? (data[0].name ? data[0].name : "") : ""}
        />
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
