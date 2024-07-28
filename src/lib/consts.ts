const isProd = process.env.NODE_ENV === "production";

export const APP_URL = isProd
  ? process.env.NEXT_PUBLIC_APP_URL
  : "http://localhost:3000";
