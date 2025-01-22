import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { School } from "@/lib/types";
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

const matchingSchema = z.object({
  studentAge: z.number().min(3).max(18),
  preferredType: z.enum(["public", "private", "grammar", "any"]),
  maxDistance: z.number().min(1).max(50),
  focusAreas: z.array(z.string()).min(1),
  academicPriority: z.number().min(1).max(5),
  facilitiesPriority: z.number().min(1).max(5),
  maxAnnualFee: z.number().optional(),
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

  const form = useForm<MatchingFormData>({
    resolver: zodResolver(matchingSchema),
    defaultValues: {
      studentAge: 11,
      preferredType: "any",
      maxDistance: 20,
      focusAreas: [],
      academicPriority: 3,
      facilitiesPriority: 3,
    },
  });

  const { data: matchedSchools, isLoading } = useQuery<School[]>({
    queryKey: ["/api/schools/match", submitted ? form.getValues() : null],
    enabled: submitted,
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

  const onSubmit = (data: MatchingFormData) => {
    if (currentStep === steps.length - 1) {
      setSubmitted(true);
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
                              <FormLabel>{t("match.studentAge")}</FormLabel>
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
                                  <SelectItem value="public">{t("schoolTypes.public")}</SelectItem>
                                  <SelectItem value="private">{t("schoolTypes.private")}</SelectItem>
                                  <SelectItem value="grammar">{t("schoolTypes.grammar")}</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
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
                {isLoading ? (
                  <div className="grid grid-cols-1 gap-4">
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
                      {matchedSchools?.map((school) => (
                        <SchoolCard key={school.id} school={school} />
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
