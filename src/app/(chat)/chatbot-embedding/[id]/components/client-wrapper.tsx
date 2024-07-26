"use client";

import { Fragment, type ReactNode } from "react";
import { useLocalStorage } from "./localstorage-provider";

export const ClientWrapper = ({ children }: { children: ReactNode }) => {
  const { value: conversationId } = useLocalStorage();

  return <Fragment key={conversationId}>{children}</Fragment>;
};
