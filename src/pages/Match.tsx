import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "@tanstack/react-query";
import { SchoolCard } from "@/components/SchoolCard";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { mutationFn } from "@/lib/queryClient";
import { toast } from "@/hooks/use-toastx";
import { ThinkingAnimation } from "@/components/ThinkingAnimation";
import { School } from "@/lib/interfaces";
import Onboarding from "./Onboarding";
import { useAuth } from "@/hooks/use-auth";

export default function Match() {
  const { t } = useTranslation();
  const [matchedSchools, setMatchedSchools] = useState<
    { school: School, score: number, aiComment: string }[] | []
  >([]);
  const hasMatched = useRef(false);

  const { user } = useAuth();

  const matchMutation = useMutation({
    mutationFn: async () => {
      return mutationFn({
        url: "/api/schools/match",
        method: "POST",
        body: {},
      });
    },
    onSuccess: (response) => {
      const matchedSchools = response?.data?.schools;
      console.log("alrai", matchedSchools);
      setMatchedSchools(matchedSchools);
    },
    onError: (error) => {
      console.error("Getting match failed:", error.message);
    },
  });

  useEffect(() => {
    const runMatch = async () => {
      if (user?.preferences.academicPerformance && !hasMatched.current) {
        hasMatched.current = true; // prevent re-running
        try {
          await matchMutation.mutateAsync();
          toast({ title: "Success!", description: "Schools matched successfully" });
        } catch (err) {
          toast({ title: "Error", description: "Failed to match schools. Please try again." });
        }
      }
    };

    runMatch();
  }, [user?.preferences.academicPerformance]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle>{t("match.title")}</CardTitle>
            <CardDescription>{t("match.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            {!user?.preferences.academicPerformance ? (
              <Onboarding />
            ) : (
              <div className="space-y-6">
                {matchMutation.isPending ? (
                  <div className="grid grid-cols-1 gap-4">
                    <ThinkingAnimation />
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="h-48 bg-gray-100 animate-pulse rounded-lg"
                      />
                    ))}
                  </div>
                ) : (
                  <>
                    <h3 className="text-lg font-medium">
                      {t("match.matchedSchools")}
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      {matchedSchools.map(
                        ({ school, score, aiComment }, index) => (
                        <SchoolCard 
                          key={school?.id ?? `school-${index}`}
                          school={{...school, score, aiComment}}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
