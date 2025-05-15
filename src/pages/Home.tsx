import { SearchFilters } from "@/components/SearchFilters";
import { SchoolCard } from "@/components/SchoolCard";
import { useMutation, useQuery } from "@tanstack/react-query";
import { School as SchoolIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "wouter";
import { School, SearchFilter } from "@/lib/interfaces";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { mutationFn } from "@/lib/queryClient";
import React from "react";
import { toast } from "@/hooks/use-toastx";

export default function Home() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();

  const queryString = searchParams.toString();
  const endpoint = `/api/schools${queryString ? `?${queryString}` : ""}`;

  const { data, isLoading } = useQuery<{ data: { schools: School[] } }>({
    queryKey: [endpoint],
  });
  const schools = data?.data?.schools;
  console.log("$$$$", schools);

  const handleFilter = (filters: SearchFilter) => {
    // Construct query string from filters
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value.toString());
      else params.delete(key);
    });

    // Re-fetch with new filters
    // window.location.search = params.toString();
    setSearchParams(params);
  };

  const resendVerificationMutation = useMutation({
    mutationFn: async () => {
      return mutationFn({
        url: "/api/users/resend-verification",
        method: "POST",
        body: {},
      })
    },
    onSuccess: () => {
      console.log();
    },
    onError: (error) => {
      console.error("Mutation Error:", error);
    }
  });

  const handleEmailVerification = async () => {
    try {
      await resendVerificationMutation.mutateAsync();
      toast({ title: "Verification Email Sent", description: "Please check your inbox to verify your account." })
    } catch (err: any) {
      console.error("Resend Verification Error:", err);
      toast({ title: "Error Sending Email", description: "There was a problem resending the verification email. Please try again later." });
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      { !user?.user?.isVerified && (
        <div className="flex items-center bg-green-600 mb-2 pl-4 py-0.1 space-x-4 drop-shadow-lg">
          <div className="flex-grow text-white text-left">
            Your account is not verified yet. Please verify your email to access all features and ensure account security.
          </div>
          <button
            className="bg-gray-100 text-green-600 hover:bg-green-600 hover:drop-shadow-lg hover:text-white border hover:border-white px-2 py-0.1 m-1 font-medium transition duration-300 ease-in-out"
            onClick={handleEmailVerification}
          >
            Resend Verification
          </button>
        </div>
      )}
      <div className="bg-primary text-white py-12 rounded-xl drop-shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <SchoolIcon className="mx-auto h-12 w-12 mb-1" />
            <h1 className="text-4xl font-bold">
              {t('home.title')}
            </h1>
            <p className="mt-3 text-lg">
              {t('home.subtitle')}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchFilters onFilter={handleFilter} />

        {isLoading ? (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-white rounded-lg shadow animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schools?.map((school) => (
              <SchoolCard key={school.schoolId} school={school} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
