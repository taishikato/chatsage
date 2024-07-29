"use client";

import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "./submit-button";
import { saveProjectName } from "../actions";

export const SubmitForm = () => {
  return (
    <form action={saveProjectName}>
      <CardHeader>
        <CardTitle>Chatbot Name</CardTitle>
        <CardDescription>Used to identify your chatbot.</CardDescription>
      </CardHeader>
      <CardContent>
        <Input placeholder="Chatsage" name="project-name" />
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <SubmitButton />
      </CardFooter>
    </form>
  );
};
