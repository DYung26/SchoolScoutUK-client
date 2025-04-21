export interface User {
  id?: number;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  isAdmin: boolean,
  createdAt: number;
  updatedAt: number;
}

export enum SchoolTypeEnum {
  FOUNDATION_SPECIAL = 'Foundation special school',
  OTHER_INDEPENDENT_SPECIAL = 'Other independent special school',
  VOLUNTARY_CONTROLLED = 'Voluntary controlled school',
  CITY_TECH_COLLEGE = 'City technology college',
  ACADEMY_SPONSOR_LED = 'Academy sponsor led',
  FURTHER_EDUCATION = 'Further education',
  FREE_SCHOOL = 'Free schools',
  FREE_SCHOOL_16_TO_19 = 'Free schools 16 to 19',
  UNIVERSITY_TECH_COLLEGE = 'University technical college',
  NON_MAINTAINED_SPECIAL = 'Non-maintained special school',
  ACADEMY_CONVERTER = 'Academy converter',
  FOUNDATION = 'Foundation school',
  SERVICE_CHILDREN_EDUCATION = "Service childrens education",
  COMMUNITY = 'Community school',
  ACADEMY_16_TO_19_CONVERTER = 'Academy 16-19 converter',
  ACADEMY_SPECIAL_CONVERTER = 'Academy special converter',
  SIXTH_FORM_CENTRE = 'Sixth form centres',
  STUDIO_SCHOOL = 'Studio schools',
  FREE_SCHOOL_SPECIAL = 'Free schools special',
  COMMUNITY_SPECIAL = 'Community special school',
  OTHER_INDEPENDENT = 'Other independent school',
  ACADEMY_SPECIAL_SPONSOR_LED = 'Academy special sponsor led',
  VOLUNTARY_AIDED = 'Voluntary aided school',
  ACADEMY_16_TO_19_SPONSOR_LED = 'Academy 16 to 19 sponsor led'
}
//'public' | 'private' | 'grammar';
export const SchoolType = Object.values(SchoolTypeEnum) as [SchoolTypeEnum, ...SchoolTypeEnum[]];

export const schoolTypeObject = Object.values(SchoolTypeEnum).reduce((acc, value) => {
  acc[value] = value;
  return acc;
}, {} as Record<string, string>);

export interface School {
  id: number;
  schoolId: string;
  name: string;
  address: string;
  city: string;
  town: string;
  postcode: string;
  type: string; // SchoolType;
  ageLow: string;
  ageHigh: string;
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
}

export interface Review {
  id: number;
  schoolId: number;
  rating: number;
  comment?: string;
  author: string;
  createdAt: string;
}

export interface SearchFilters {
  search?: string;
  type?: SchoolTypeEnum;
  city?: string;
  minRating?: number;
}

export interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  login: ({ data }: { data: { accessToken: string, refreshToken: string } }) => void;
  logout: () => void;
  loading: boolean;
}

export interface OnboardingData {
  name: string;
  email: string;
  school: string;
  bio: string;
}
