import { useAuth } from "@/hooks/use-auth";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { mutationFn } from "@/lib/queryClient";
import { LoginDTO } from "@/lib/dtos";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import AuthSideBanner from "@/components/AuthSideBanner";
import { AuthNavbar } from "@/components/AuthNavbar";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "@/hooks/use-toastx";


export default function Login() {
  const { t } = useTranslation();
  const { login } = useAuth();
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginDTO) => {
      return mutationFn({
        url: "/api/auth/login",
        method: "POST",
        body: { data },
      });
    },
    onSuccess: (data) => {
      console.log("Login successful:", data);
      login(data);
      setLocation("/dashboard");
    },
    onError: (error) => {
      console.error("Login failed:", error.message);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginMutation.mutateAsync(formData);
      toast({ title: "Success!", description: "Logged in successfully!" });
    } catch (err) {
      console.error("Login Error:", err);
      toast({ title: "Error", description: "Failed to log in. Please try again." });
    }
  };

  return (
    <div className="grid grid-rows-[auto_1fr] h-screen">
      <AuthNavbar />
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex items-center justify-center bg-gray-100">
          <div className="flex flex-col w-full border p-8 m-20 rounded-3xl drop-shadow-2xl bg-white">
            <h2 className="text-center text-4xl font-black">Login</h2>

            <div>
              <label htmlFor="email" className="w-full mt-8 text-blue-700">email
              <span className="text-red-500">*</span>
              </label>

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="w-full mt-8 text-blue-700">
                password
                <span className="text-red-500">*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                className="absolute right-5 top-50 transform translate-y-1/2 text-gray-600"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={30} /> : <Eye size={30} />}
              </button>
            </div>

            <button type="submit" disabled={loginMutation.isPending} onClick={handleLogin} className="w-full mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
            {loginMutation.isPending ? "Signing in..." : "Sign In"}
            </button>
            {loginMutation.isPending && <LoadingSpinner />}
            <p className="mt-2 text-xl">
              Don't have an account?{" "}
              <a href="/signup" className="text-blue-500">
                Sign Up
              </a>
            </p>
          </div>
        </div>
        <AuthSideBanner />
      </div>
    </div>
  );
}
