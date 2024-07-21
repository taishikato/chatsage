"use client";

import { LoginButton } from "./login-button";
import { login } from "../actions";

export const LoginForm = () => {
  return (
    <form action={login}>
      <LoginButton />
    </form>
  );
};
