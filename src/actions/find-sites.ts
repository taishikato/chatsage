"use server";

import Sitemapper from "sitemapper";

export const findSites = async (prevState: any, formData: FormData) => {
  const url = formData.get("url") as string;

  const sitemapper = new Sitemapper({
    url,
    timeout: 15000,
  });

  const { sites } = await sitemapper.fetch();

  return {
    sites,
  };
};
