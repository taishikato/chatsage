"use server";

import { redirect } from "next/navigation";

export const saveProjectName = async () => {
  redirect("/create-project/data-sources");
};
