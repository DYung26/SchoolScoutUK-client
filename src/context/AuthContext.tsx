import { AuthContextType, UserPreferences, User } from "@/lib/interfaces";
import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useEffect, useState } from "react";

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    return localStorage.getItem("accessToken") || null;
  });
  const [user, setUser] = useState<{ user: User, preferences: UserPreferences } | null>(null);
  const [loading, setLoading] = useState(true);

  const { data, isLoading, error } = useQuery<{ data: { user: User, preferences: UserPreferences } }>({
    queryKey: ["/api/users"],
    enabled: !!accessToken,
  });
  console.log("*****", data?.data);

  useEffect(() => {
    if (isLoading) return;
    if (error) {
      console.error("Error fetching user:", error);
      logout();
    } else if (data?.data) {
      setUser(data?.data);
    }
    setLoading(false);
  }, [data, isLoading, error]);

  const login = ({ data }: { data: { accessToken: string; refreshToken: string } }) => {
    console.log("====", data);
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    setAccessToken(data.accessToken);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("tokens");
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
