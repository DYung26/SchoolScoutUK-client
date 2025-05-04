import { AcademicPerformanceEnum, BudgetEnum, CareerInterestEnum, CommuteWillingnessEnum, ExtracurricularsEnum, FavouriteSubjectsEnum, HobbyEnum, LearningNeedsEnum, LocationPreferenceEnum, ReligiousAffiliationEnum, SchoolGenderEnum, SchoolTypeEnum, UserGenderEnum } from "./enum";

export const SchoolGender = Object.values(SchoolGenderEnum) as [SchoolGenderEnum, ...SchoolGenderEnum[]];
export const UserGender = Object.values(UserGenderEnum) as [UserGenderEnum, ...UserGenderEnum[]];
export const userGenderObject = Object.values(UserGenderEnum).reduce((acc, value) => {
  acc[value] = value;
  return acc;
}, {} as Record<string, string>);

//'public' | 'private' | 'grammar';
export const SchoolType = Object.values(SchoolTypeEnum) as [SchoolTypeEnum, ...SchoolTypeEnum[]];

export const schoolTypeObject = Object.values(SchoolTypeEnum).reduce((acc, value) => {
  acc[value] = value;
  return acc;
}, {} as Record<string, string>);

export const AcademicPerformance = Object.values(AcademicPerformanceEnum) as [AcademicPerformanceEnum, ...AcademicPerformanceEnum[]];
export const academicPerformanceObject = Object.values(AcademicPerformanceEnum).reduce((acc, value) => {
  acc[value] = value;
  return acc;
}, {} as Record<string, string>);

export const FavouriteSubjects = Object.values(FavouriteSubjectsEnum) as [FavouriteSubjectsEnum, ...FavouriteSubjectsEnum[]];
export const favouriteSubjectsObject = Object.values(FavouriteSubjectsEnum).reduce((acc, value) => {
  acc[value] = value;
  return acc;
}, {} as Record<string, string>);

export const Hobbies = Object.values(HobbyEnum) as [HobbyEnum, ...HobbyEnum[]];
export const hobbiesObject = Object.values(HobbyEnum).reduce((acc, value) => {
  acc[value] = value;
  return acc;
}, {} as Record<string, string>);

export const Extracurriculars = Object.values(ExtracurricularsEnum) as [ExtracurricularsEnum, ...ExtracurricularsEnum[]];
export const extracurricularsObject = Object.values(ExtracurricularsEnum).reduce((acc, value) => {
  acc[value] = value;
  return acc;
}, {} as Record<string, string>);

export const CareerInterests = Object.values(CareerInterestEnum) as [CareerInterestEnum, ...CareerInterestEnum[]];
export const careerInterestsObject = Object.values(CareerInterestEnum).reduce((acc, value) => {
  acc[value] = value;
  return acc;
}, {} as Record<string, string>);

export const LearningNeeds = Object.values(LearningNeedsEnum) as [LearningNeedsEnum, ...LearningNeedsEnum[]];
export const learningNeedsObject = Object.values(LearningNeedsEnum).reduce((acc, value) => {
  acc[value] = value;
  return acc;
}, {} as Record<string, string>);

export const LocationPreference = Object.values(LocationPreferenceEnum) as [LocationPreferenceEnum, ...LocationPreferenceEnum[]];
export const locationPreferenceObject = Object.values(LocationPreferenceEnum).reduce((acc, value) => {
  acc[value] = value;
  return acc;
}, {} as Record<string, string>);

export const CommuteWillingness = Object.values(CommuteWillingnessEnum) as [CommuteWillingnessEnum, ...CommuteWillingnessEnum[]];
export const commuteWillingnessObject = Object.values(CommuteWillingnessEnum).reduce((acc, value) => {
  acc[value] = value;
  return acc;
}, {} as Record<string, string>);

export const Budget = Object.values(BudgetEnum) as [BudgetEnum, ...BudgetEnum[]];
export const budgetObject = Object.values(BudgetEnum).reduce((acc, value) => {
  acc[value] = value;
  return acc;
}, {} as Record<string, string>);

export const ReligiousAffiliation = Object.values(ReligiousAffiliationEnum) as [ReligiousAffiliationEnum, ...ReligiousAffiliationEnum[]];
export const religiousAffiliationObject = Object.values(ReligiousAffiliationEnum).reduce((acc, value) => {
  acc[value] = value;
  return acc;
}, {} as Record<string, string>);
