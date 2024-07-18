"use server";

import axios from "redaxios";

export const scrape = async (formData: FormData) => {
  await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/scrape`);

  return {
    success: true,
  };
};
