import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

export function useAuth() {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error('AuthContext is missing. Wrap your app with <AuthProvider>');
  }
  return auth;
}
