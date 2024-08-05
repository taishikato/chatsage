"use client";

import { CardContent, CardFooter } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { updateAISettings } from "../actions";
import { AiSettingsButton } from "./ai-settings-button";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { useState } from "react";

const initialState = {
  success: false,
  message: undefined,
};

export const AiSettings = ({ temperature }: { temperature: number }) => {
  const [state, formAction] = useFormState(updateAISettings, initialState);

  const [newTemperature, setNewtemperature] = useState(temperature);

  if (state.success) {
    toast.success("The temperature valus is successfully updated.");
  } else if (state.success === false && state.message) {
    toast.error(state.message);
  }

  return (
    <form action={formAction}>
      <CardContent>
        {newTemperature}
        <Slider
          name="temperature"
          defaultValue={[newTemperature]}
          max={1}
          step={0.1}
          onValueChange={(values: number[]) => {
            setNewtemperature(values[0] ?? 0);
          }}
        />
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <AiSettingsButton />
      </CardFooter>
    </form>
  );
};
