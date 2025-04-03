import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "wouter";
import { LoadingSpinner } from "./LoadingSpinner";

interface ProtectedRouteProps {
  component: React.ComponentType<any>,
  path: string;
}

export function ProtectedRoute(
  { component: Component} : ProtectedRouteProps
) {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;

  return (
    user ? <Component /> : <Redirect to="/login" />
  );
}
