"use client";

import { logout } from "@/actions/logout";
import { LogoutButton } from "./logout-button";

export const LogoutForm = () => {
  return (
    <form action={logout}>
      <LogoutButton />
    </form>
  );
};
