import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "@tanstack/react-query";
import { School, SchoolType, schoolTypeObject } from "@/lib/types";
import { SchoolCard } from "@/components/SchoolCard";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { mutationFn } from "@/lib/queryClient";
import { toast } from "@/hooks/use-toastx";
import { ThinkingAnimation } from "@/components/ThinkingAnimation";

const matchingSchema = z.object({
  studentAge: z.number().min(3).max(18),
  preferredType: z.enum(SchoolType),
  /*maxDistance: z.number().min(1).max(50),
  focusAreas: z.array(z.string()).min(1),
  academicPriority: z.number().min(1).max(5),
  facilitiesPriority: z.number().min(1).max(5),
  maxAnnualFee: z.number().optional(),*/
});

type MatchingFormData = z.infer<typeof matchingSchema>;

const steps = [
  "basicInfo",
  "preferences",
  "priorities",
  "budget",
] as const;

export default function Match() {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [matchedSchools, setMatchedSchools] = useState<
    { school: School, score: number, aiComment: string }[] | []
  >([]);

  const form = useForm<MatchingFormData>({
    resolver: zodResolver(matchingSchema),
    defaultValues: {
      studentAge: 11,
      /*preferredType: "",
      maxDistance: 20,
      focusAreas: [],
      academicPriority: 3,
      facilitiesPriority: 3,*/
    },
  });
  
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

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const onSubmit = async (data: MatchingFormData) => {
    if (currentStep === steps.length - 1) {
      setSubmitted(true);
      try {
        await matchMutation.mutateAsync();
        toast({ title: "Success!", description: "Schools matched successfully" });
      } catch (err) {
        toast({ title: "Error", description: "Failed to match schools. Please try again." });
      }
    } else {
      nextStep();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle>{t("match.title")}</CardTitle>
            <CardDescription>{t("match.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            {!submitted ? (
              <>
                <Progress
                  value={((currentStep + 1) / steps.length) * 100}
                  className="mb-8"
                />
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {currentStep === 0 && (
                      <>
                        <FormField
                          control={form.control}
                          name="studentAge"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                {t("match.studentAge")}: {" "}
                                  <strong>
                                    {field.value}
                                  </strong>
                                </FormLabel>
                              <FormControl>
                                <Slider
                                  min={3}
                                  max={18}
                                  step={1}
                                  value={[field.value]}
                                  onValueChange={([value]) => field.onChange(value)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="preferredType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("match.schoolType")}</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="any">{t("match.anyType")}</SelectItem>
                                  {SchoolType.map((type) => (
                                    <SelectItem key={type} value={type}>
                                      {t(`schoolTypes.${type}`)}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}

                    {currentStep === 1 && (
                      <>
                        <div>TESTING</div>
                      </>
                    )}

                    {/* Additional steps will be implemented similarly */}

                    <div className="flex justify-between pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={previousStep}
                        disabled={currentStep === 0}
                      >
                        {t("common.previous")}
                      </Button>
                      <Button type="submit">
                        {currentStep === steps.length - 1
                          ? t("match.findSchools")
                          : t("common.next")}
                      </Button>
                    </div>
                  </form>
                </Form>
              </>
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
