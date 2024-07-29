const isProd = process.env.NODE_ENV === "production";

export const APP_URL = isProd
  ? process.env.NEXT_PUBLIC_APP_URL
  : process.env.NEXT_PUBLIC_APP_DEV_URL;

export const APP_NAME = "Chatsage";
