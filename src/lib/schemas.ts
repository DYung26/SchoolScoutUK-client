import * as z from "zod";
import {
  AcademicPerformanceEnum,
  FavouriteSubjectsEnum,
  UserGenderEnum,
  ExtracurricularsEnum,
  HobbyEnum,
  CareerInterestEnum,
  BudgetEnum,
  LocationPreferenceEnum,
  ReligiousAffiliationEnum,
  SchoolTypeEnum,
  LearningNeedsEnum,
  CommuteWillingnessEnum,
} from "./enum";

// Zod-compatible enum values
const AcademicPerformance = z.enum([ ...Object.values(AcademicPerformanceEnum) ] as [AcademicPerformanceEnum, ...AcademicPerformanceEnum[]]);
const FavouriteSubjects = z.enum([ ...Object.values(FavouriteSubjectsEnum) ] as [FavouriteSubjectsEnum, ...FavouriteSubjectsEnum[]]);
const UserGender = z.enum([ ...Object.values(UserGenderEnum) ] as [UserGenderEnum, ...UserGenderEnum[]]);
const Extracurriculars = z.enum([ ...Object.values(ExtracurricularsEnum) ] as [ExtracurricularsEnum, ...ExtracurricularsEnum[]]);
const Hobby = z.enum([ ...Object.values(HobbyEnum) ] as [HobbyEnum, ...HobbyEnum[]]);
const CareerInterest = z.enum([ ...Object.values(CareerInterestEnum) ] as [CareerInterestEnum, ...CareerInterestEnum[]]);
const Budget = z.enum([ ...Object.values(BudgetEnum) ] as [BudgetEnum, ...BudgetEnum[]]);
const LocationPreference = z.enum([ ...Object.values(LocationPreferenceEnum) ] as [LocationPreferenceEnum, ...LocationPreferenceEnum[]]);
const ReligiousAffiliation = z.enum([ ...Object.values(ReligiousAffiliationEnum) ] as [ReligiousAffiliationEnum, ...ReligiousAffiliationEnum[]]);
const SchoolType = z.enum([ ...Object.values(SchoolTypeEnum) ] as [SchoolTypeEnum, ...SchoolTypeEnum[]]);
const LearningNeeds = z.enum([ ...Object.values(LearningNeedsEnum) ] as [LearningNeedsEnum, ...LearningNeedsEnum[]]);
const CommuteWillingness = z.enum([ ...Object.values(CommuteWillingnessEnum) ] as [CommuteWillingnessEnum, ...CommuteWillingnessEnum[]]);

export const userPreferenceSchema = z.object({
  // userId: z.string(),
  academicPerformance: AcademicPerformance,
  favouriteSubjects: z.array(FavouriteSubjects),
  gender: UserGender,
  extracurriculars: z.array(Extracurriculars),
  hobbies: z.array(Hobby),
  careerInterests: z.array(CareerInterest),
  budget: Budget,
  age: z.number().int(),
  locationPreference: LocationPreference,
  religiousAffiliation: ReligiousAffiliation,
  schoolTypes: z.array(SchoolType),
  learningNeeds: z.array(LearningNeeds),
  commuteWillingness: CommuteWillingness,
});
