"use client";

import { createContext, useContext, useEffect, useState } from "react";

const conversationLocalStorageKeyPrefix = "sp_chatbodId_";

const LocalStorageContext = createContext<{
  value: string;
  setValue: (value: string) => void;
}>({ value: "", setValue: () => {} });

export const useLocalStorage = () => useContext(LocalStorageContext);

export const LocalStorageProvider = ({
  children,
  chatbotId,
  id,
}: {
  children: React.ReactNode;
  chatbotId: string;
  id: string;
}) => {
  const localStorageKeyForConversationId = `${conversationLocalStorageKeyPrefix}${chatbotId}`;
  const [conversationId, setConversationId] = useState(() => {
    if (typeof window !== "undefined") {
      const storedValue = localStorage.getItem(
        localStorageKeyForConversationId
      );
      return storedValue ?? id;
    }

    return id;
  });

  useEffect(() => {
    localStorage.setItem(localStorageKeyForConversationId, conversationId);
  }, [conversationId]);

  return (
    <LocalStorageContext.Provider
      value={{ value: conversationId, setValue: setConversationId }}
    >
      {children}
    </LocalStorageContext.Provider>
  );
};
