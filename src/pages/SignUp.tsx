import { AuthNavbar } from "@/components/AuthNavbar";
import AuthSideBanner from "@/components/AuthSideBanner";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { toast } from "@/hooks/use-toastx";
import { SignUpDTO } from "@/lib/dtos";
import { mutationFn } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";


export default function SignUp() {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const signupMutation = useMutation({
    mutationFn: async (data: SignUpDTO) => {
      return mutationFn({
        url: "/api/auth/signup",
        method: "POST",
        body: { data },
      });
    },
    onSuccess: (data) => {
      console.log("Sign up successful", data);
      setLocation("/onboarding");
    },
    onError: (error) => {
      console.error("Signup failed:", error.message);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "confirmPassword") {
      setError(null);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const { confirmPassword, ...dataToSend } = formData;
      const response = await signupMutation.mutateAsync(dataToSend);
      toast({ title: "Success!", response });
    } catch (err: any) {
      console.error("Signup Error:", err);
      toast({ title: "Error", response: err });
    }
  };

  return (
    <div className="grid grid-rows-[auto_1fr] min-h-screen">
      <AuthNavbar />
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex items-center justify-center bg-gray-100">
          <div className="flex flex-col w-full border p-8 m-48 rounded-3xl shadow-2xl drop-shadow-2xl bg-white">
            <h2 className="text-center text-4xl font-black">Sign Up</h2>
            <h2 className="text-center text-2xl font-thin">Set up your account in minutes</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="w-full mt-2 text-blue-700">first name
                <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="w-full mt-2 text-blue-700">last name
                <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="username" className="w-full mt-2 text-blue-700">username
              <span className="text-red-500">*</span>
              </label>
              <input
                type="username"
                name="username"
                placeholder="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="w-full mt-2 text-blue-700">email
              <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="w-full mt-2 text-blue-700">password
              <span className="text-red-500">*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                className="absolute right-5 top-50 transform translate-y-1/2 text-gray-600"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="relative">
              <label htmlFor="confirmPassword" className="w-full mt-2 text-blue-700">confirm password
              <span className="text-red-500">*</span>
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                className="absolute right-5 top-50 transform translate-y-1/2 text-gray-600"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {error && <p className="text-red-500 text-base font-medium">{error}</p>}
            </div>

            <button type="submit" disabled={signupMutation.isPending} onClick={handleRegister} className="w-full mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
              {signupMutation.isPending ? "Signing up..." : "Sign Up"}
            </button>
            {signupMutation.isPending && <LoadingSpinner />}
            <p className="mt-2">
              Already have an account?{" "}
              <a href="/login" className="text-blue-500">
                Login
              </a>
            </p>
          </div>
        </div>
        <AuthSideBanner />
      </div>
    </div>
  );
}
