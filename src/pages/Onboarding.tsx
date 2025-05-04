import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/hooks/use-toastx";
import { AcademicPerformance, Budget, CareerInterests, CommuteWillingness, Extracurriculars, FavouriteSubjects, Hobbies, LearningNeeds, LocationPreference, ReligiousAffiliation, SchoolType, UserGender } from "@/lib/constants";
import { AcademicPerformanceEnum, BudgetEnum, CommuteWillingnessEnum, FavouriteSubjectsEnum, LearningNeedsEnum, LocationPreferenceEnum, ReligiousAffiliationEnum, UserGenderEnum } from "@/lib/enum";
import { mutationFn } from "@/lib/queryClient";
import { userPreferenceSchema } from "@/lib/schemas";
import { UserPreference } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

const steps = [
  "Basic Info", // age, gender
  "Academic Background", // academicPerformance, favouriteSubjects
  "Personal Interests", // hobbies, extracurriculars, careerInterests
  "Preferences", // schoolTypes, learningNeeds, locationPreference, commuteWillingness
  "Values and Constraints" // budget, religiousAffiliation
];

export default function Onboarding() {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);

  const form = useForm<UserPreference>({
    resolver: zodResolver(userPreferenceSchema),
    defaultValues: {
      age: 11,
      gender: UserGenderEnum.MALE,
      academicPerformance: AcademicPerformanceEnum.AVERAGE,
      favouriteSubjects: [],
      hobbies: [],
      extracurriculars: [],
      careerInterests: [],
      schoolTypes: [],
      learningNeeds: [],
      locationPreference: LocationPreferenceEnum.NO_PREFERENCE,
      commuteWillingness: CommuteWillingnessEnum.UNDER_15_MIN,
      budget: BudgetEnum.MID,
      religiousAffiliation: ReligiousAffiliationEnum.NONE,
    }
  });

  const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const userPreferenceMutation = useMutation({
    mutationFn: async (data: Partial<UserPreference>) => {
      return mutationFn({
        url: "/api/users/preferences",
        method: "PUT",
        body: { data },
      });
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error.message);
    }
  })

  const onSubmit = async(data: UserPreference) => {
    if (step < steps.length - 1) {
      nextStep();
      return;
    }
    try {
      console.log(data);
      await userPreferenceMutation.mutateAsync(data);
      toast({ title: "Success!", description: "Schools matched successfully" });
    } catch (err) {
      toast({ title: "Error", description: "Failed to match schools. Please try again." });
    }
  };

  return (
    <div className="rounded-lg">
      <Card>
        <CardHeader>
          <CardTitle>{t(steps[step])}</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>

        <CardContent>
          <>
            <Progress
              value={((step + 1) / steps.length) * 100}
              className="mb-8 border"
            />
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit, () => alert("Invalid Form"))}
                // onInvalid={() => alert("Form is invalid!")}
                className="space-y-6"
              >
                {step === 0 && (
                  <>
                    <FormField
                      control={form.control}
                      name="age"
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
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("user.gender")}: {" "}</FormLabel>
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
                              {UserGender.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {t(`userGender.${type}`)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {step === 1 && (
                  <>
                    <FormField
                      control={form.control}
                      name="academicPerformance"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {t("user.academicPerformance")}:
                          </FormLabel>
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
                              {AcademicPerformance.map((academicPerformance) => (
                                <SelectItem key={academicPerformance} value={academicPerformance}>
                                  {t(`academicPerformance.${academicPerformance}`)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="favouriteSubjects"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {t("user.favouriteSubjects")}:
                          </FormLabel>
                          <FormControl>
                            <div className="space-y-2">
                              {FavouriteSubjects.map((subject) => (
                                <div key={subject} className="flex items-center">
                                  <Checkbox
                                    id={subject}
                                    value={subject}
                                    checked={field.value.includes(subject)} // Check if this subject is selected
                                    onCheckedChange={(checked) => {
                                      const newSelectedSubjects = checked
                                        ? [...field.value, subject] // Add to the array if checked
                                        : field.value.filter((item: string) => item !== subject); // Remove if unchecked
                                      field.onChange(newSelectedSubjects); // Update form state with new array
                                    }}
                                  />
                                  <label htmlFor={subject} className="ml-2">
                                    {t(`favouriteSubjects.${subject}`)}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {step === 2 && (
                  <>
                    <FormField
                      control={form.control}
                      name="hobbies"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {t("user.hobbies")}:
                          </FormLabel>
                          <FormControl>
                            <div className="space-y-2">
                              {Hobbies.map((hobby) => (
                                <div key={hobby} className="flex items-center">
                                  <Checkbox
                                    id={hobby}
                                    value={hobby}
                                    checked={field.value.includes(hobby)} // Check if this subject is selected
                                    onCheckedChange={(checked) => {
                                      const newSelectedHobbies = checked
                                        ? [...field.value, hobby] // Add to the array if checked
                                        : field.value.filter((item: string) => item !== hobby); // Remove if unchecked
                                      field.onChange(newSelectedHobbies); // Update form state with new array
                                    }}
                                  />
                                  <label htmlFor={hobby} className="ml-2">
                                    {t(`hobbies.${hobby}`)}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="extracurriculars"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {t("user.extracurriculars")}:
                          </FormLabel>
                          <FormControl>
                            <div className="space-y-2">
                              {Extracurriculars.map((hobby) => (
                                <div key={hobby} className="flex items-center">
                                  <Checkbox
                                    id={hobby}
                                    value={hobby}
                                    checked={field.value.includes(hobby)} // Check if this subject is selected
                                    onCheckedChange={(checked) => {
                                      const newSelectedHobbies = checked
                                        ? [...field.value, hobby] // Add to the array if checked
                                        : field.value.filter((item: string) => item !== hobby); // Remove if unchecked
                                      field.onChange(newSelectedHobbies); // Update form state with new array
                                    }}
                                  />
                                  <label htmlFor={hobby} className="ml-2">
                                    {t(`extracurriculars.${hobby}`)}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="careerInterests"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {t("user.careerInterests")}:
                          </FormLabel>
                          <FormControl>
                            <div className="space-y-2">
                              {CareerInterests.map((hobby) => (
                                <div key={hobby} className="flex items-center">
                                  <Checkbox
                                    id={hobby}
                                    value={hobby}
                                    checked={field.value.includes(hobby)} // Check if this subject is selected
                                    onCheckedChange={(checked) => {
                                      const newSelectedHobbies = checked
                                        ? [...field.value, hobby] // Add to the array if checked
                                        : field.value.filter((item: string) => item !== hobby); // Remove if unchecked
                                      field.onChange(newSelectedHobbies); // Update form state with new array
                                    }}
                                  />
                                  <label htmlFor={hobby} className="ml-2">
                                    {t(`careerInterests.${hobby}`)}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {step === 3 && (
                  <>
                    <FormField
                      control={form.control}
                      name="schoolTypes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {t("user.schoolTypes")}:
                          </FormLabel>
                          <FormControl>
                            <div className="space-y-2">
                              {SchoolType.map((hobby) => (
                                <div key={hobby} className="flex items-center">
                                  <Checkbox
                                    id={hobby}
                                    value={hobby}
                                    checked={field.value.includes(hobby)} // Check if this subject is selected
                                    onCheckedChange={(checked) => {
                                      const newSelectedHobbies = checked
                                        ? [...field.value, hobby] // Add to the array if checked
                                        : field.value.filter((item: string) => item !== hobby); // Remove if unchecked
                                      field.onChange(newSelectedHobbies); // Update form state with new array
                                    }}
                                  />
                                  <label htmlFor={hobby} className="ml-2">
                                    {t(`schoolTypes.${hobby}`)}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="learningNeeds"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {t("user.learningNeeds")}:
                          </FormLabel>
                          <FormControl>
                            <div className="space-y-2">
                              {LearningNeeds.map((hobby) => (
                                <div key={hobby} className="flex items-center">
                                  <Checkbox
                                    id={hobby}
                                    value={hobby}
                                    checked={field.value.includes(hobby)} // Check if this subject is selected
                                    onCheckedChange={(checked) => {
                                      const newSelectedHobbies = checked
                                        ? [...field.value, hobby] // Add to the array if checked
                                        : field.value.filter((item: string) => item !== hobby); // Remove if unchecked
                                      field.onChange(newSelectedHobbies); // Update form state with new array
                                    }}
                                  />
                                  <label htmlFor={hobby} className="ml-2">
                                    {t(`learningNeeds.${hobby}`)}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="locationPreference"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("user.locationPreference")}: {" "}</FormLabel>
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
                              {LocationPreference.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {t(`locationPreference.${type}`)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="commuteWillingness"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("user.commuteWillingness")}: {" "}</FormLabel>
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
                              {CommuteWillingness.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {t(`commuteWillingness.${type}`)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {step === 4 && (
                  <>
                    <FormField
                      control={form.control}
                      name="budget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("user.budget")}: {" "}</FormLabel>
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
                              {Budget.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {t(`budget.${type}`)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="religiousAffiliation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("user.religiousAffiliation")}: {" "}</FormLabel>
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
                              {ReligiousAffiliation.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {t(`religiousAffiliation.${type}`)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </>
                )}

                <div className="mt-4 flex justify-between">
                  <Button className="rounded-lg"
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={step === 0}
                  >{t("common.previous")}
                  </Button>
                  <Button className="bg-blue-500 rounded-lg"
                    type="submit"
                    variant="outline"
                  >
                    {step === steps.length - 1
                      ? t("common.submit")
                      : t("common.next")
                    }
                  </Button>
                </div>
              </form>
            </Form>
          </>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
