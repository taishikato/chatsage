"use client";

import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { updateProjectname } from "../actions";
import { ProjectUpdateButton } from "./project-update-button";
import { useRouter } from "next/navigation";

export const ProjectUpdateForm = ({ projectName }: { projectName: string }) => {
  const router = useRouter();

  const [name, setName] = useState(projectName);

  return (
    <form
      action={async (formData) => {
        const projectName = formData.get("project-name") as string | null;

        if (!projectName || !projectName.replace(/\s+/g, "")) {
          return toast.error("Project name can't be empty.");
        }

        const result = await updateProjectname(projectName);

        if (result.success)
          return toast.success("Your project name has been updated!");

        if (!result.success) {
          toast.error(result.message);

          if (result.needLogin) router.push("/login");
        }
      }}
    >
      <CardContent>
        <Input
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="project-name"
        />
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <ProjectUpdateButton />
      </CardFooter>
    </form>
  );
};
