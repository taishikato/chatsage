"use client";

import { CardContent, CardFooter } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { updateAISettings } from "../actions";
import { AiSettingsButton } from "./ai-settings-button";
import { toast } from "sonner";
import { useState } from "react";

export const AiSettings = ({ temperature }: { temperature: number }) => {
  const [newTemperature, setNewtemperature] = useState(temperature);

  return (
    <form
      action={async (formData) => {
        const result = await updateAISettings(formData);

        if (result.success) {
          toast.success("The temperature value is successfully updated.");
        } else if (result.success === false && result.message) {
          toast.error(result.message);
        }
      }}
    >
      <CardContent>
        <div className="flex gap-x-5 mb-5 items-center">
          <h4 className="text-base text-secondary-foreground/80">
            Temperature
          </h4>
          <div className="text-sm">{newTemperature}</div>
        </div>
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
