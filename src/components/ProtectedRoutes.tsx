import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "wouter";
import { LoadingSpinner } from "./LoadingSpinner";

interface ProtectedRouteProps {
  component: React.ComponentType<any>,
  path: string;
  role?: "admin";
}

export function ProtectedRoute(
  { component: Component, role } : ProtectedRouteProps
) {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;

  if (!user) return; // <Redirect to="/login" />;

  if (role === "admin" && !user.isAdmin) {
    return <Redirect to="/not-found" />;
  }

  return <Component />;
}
