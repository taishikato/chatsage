"use client";

import { CardContent, CardFooter } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";
import { updateChatbotVisibility } from "../actions";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProjectVisibilityButton } from "./project-visibility-button";

export const ProjectVisibilityForm = ({
  chatbotVisibility,
}: {
  chatbotVisibility: string;
}) => {
  const router = useRouter();

  const [visibility, setVisibility] = useState(chatbotVisibility);

  return (
    <form
      action={async (formData) => {
        const chatbotVisibility = formData.get("chatbot-visibility") as string;

        const result = await updateChatbotVisibility(chatbotVisibility);

        if (result.success)
          return toast.success("Your chatbot visibility has been updated!");

        if (!result.success) {
          toast.error(result.message);

          if (result.needLogin) router.push("/login");
        }
      }}
    >
      <CardContent>
        <Select
          name="chatbot-visibility"
          value={visibility}
          onValueChange={(e) => {
            setVisibility(e);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Visibility" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="private">Private</SelectItem>
            <SelectItem value="public">Public</SelectItem>
          </SelectContent>
        </Select>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <ProjectVisibilityButton />
      </CardFooter>
    </form>
  );
};
