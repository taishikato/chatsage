"use server";

import { revalidatePath } from "next/cache";
import axios from "redaxios";

export const scrape = async (url: string) => {
  await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/scrape`, { url });

  revalidatePath("/dashboard");

  return {
    success: true,
  };
};
