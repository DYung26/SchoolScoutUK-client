import { AcademicPerformanceEnum, AdmissionPolicyEnum, BudgetEnum, CareerInterestEnum, CommuteWillingnessEnum, ExtracurricularsEnum, FavouriteSubjectsEnum, HobbyEnum, LearningNeedsEnum, LocationPreferenceEnum, MinorGroupEnum, ReligiousAffiliationEnum, ReligiousCharacterEnum, SchoolGenderEnum, SchoolStatusEnum, SchoolTypeEnum, UserGenderEnum } from "./enum";

export interface User {
  id?: number;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  isAdmin: boolean;
  isVerified: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface School {
  id: number;
  schoolId: string;
  name: string;
  uniqueReferenceNumber: string;
  localAuthorityName: string;
  localAuthority: string;
  establishmentNumber: string;
  localAuthorityEstablishmentNumber: string;
  street: string;
  locality: string;
  thirdAddressLine: string;
  address: string;
  city: string;
  town: string;
  postcode: string;
  admissionAge: {
    min: number;
    max: number;
  };
  rating?: number;
  fees?: {
    annual: number;
    registration?: number;
  };
  facilities: string[];
  specialties: string[];
  examResults?: {
    gcse: {
      year: number;
      passRate: number;
    };
    aLevel: {
      year: number;
      passRate: number;
    };
  };
  website?: string;
  phone?: string;
  email?: string;
  description?: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  schoolStatus: SchoolStatusEnum;
  openingDate: string;
  closingDate: string;
  minorGroup: MinorGroupEnum;
  type: SchoolTypeEnum;
  isPrimary: string;
  isSecondary: string;
  isPost16: string;
  ageLow: number;
  ageHigh: number;
  gender: SchoolGenderEnum;
  religiousCharacter: ReligiousCharacterEnum;
  admissionPolicy: AdmissionPolicyEnum;
}

export interface Review {
  id: number;
  schoolId: number;
  rating: number;
  comment?: string;
  author: string;
  createdAt: string;
}

export interface SearchFilter {
  search?: string;
  type?: SchoolTypeEnum;
  city?: string;
  minRating?: number;
}

export interface AuthContextType {
  user: { user: User, preferences: UserPreferences } | null;
  accessToken: string | null;
  login: ({ data }: { data: { accessToken: string, refreshToken: string } }) => void;
  logout: () => void;
  loading: boolean;
}

export interface UserPreferences {
  userId: string,
  academicPerformance: AcademicPerformanceEnum,
  favouriteSubjects: FavouriteSubjectsEnum[],
  gender: UserGenderEnum,
  extracurriculars: ExtracurricularsEnum[],
  hobbies: HobbyEnum[],
  careerInterests: CareerInterestEnum[],
  budget: BudgetEnum,
  age: number,
  locationPreference: LocationPreferenceEnum,
  religiousAffiliation: ReligiousAffiliationEnum,
  schoolTypes: SchoolTypeEnum[],
  learningNeeds: LearningNeedsEnum[],
  commuteWillingness: CommuteWillingnessEnum,
}

