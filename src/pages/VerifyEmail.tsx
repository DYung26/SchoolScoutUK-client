import { mutationFn } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";

export default function VerifyEmail() {
  const [location] = useLocation();
  const [token, setToken] = useState<string | null>(null);
  
  const verifyMutation = useMutation({
    mutationFn: async (data: { token: string }) => {
      return mutationFn({
        url: "/api/auth/verify-email",
        method: "POST",
        body: { data },
      });
    },
    onSuccess: (data) => {
      console.log("Email verified", data);
    },
    onError: (error) => {
      console.error("Verification failed", error);
    },
  });

  useEffect(() => {
    const queryString = new URLSearchParams(window.location.search);
    const token = queryString.get('token');
    // const params = new URLSearchParams(location); //.split('?')[1]);
    // const tokenParam = params.get('token');
    // alert(params);
    if (token) {
      setToken(token);
      // alert(token);
      const response = verifyMutation.mutate( { token });
      // alert(response);
    }
  }, [location]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md p-6 rounded-xl">
        <h1 className="text-xl font-bold">Verifying Email</h1>
        {/*<p className="mt-2 text-sm text-gray-600">
          {token ? `Verifying token:` : "No token provided."}
        </p>*/}
        {/* You can now call your verify endpoint using the token */}
        {verifyMutation.isPending && <p className="text-blue-500">Verifying...</p>}
        {verifyMutation.isSuccess &&
          <p className="text-green-600">
            Email verified!{" "}
            <a href="/login" className="text-blue-500 block">
              Proceed to Login
            </a>
          </p>
        }
        {verifyMutation.isError && (
          <p className="text-red-500">Failed to verify email. Try again.</p>
        )}
      </div>
    </div>
  );
}
