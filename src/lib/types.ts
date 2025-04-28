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

export enum MinorGroup {
  ACADEMY = "Academy",
  MAINTAINED = "Maintained school",
  INDEPENDENT = "Independent school",
  SPECIAL = "Special school",
  COLLEGE = "College",
  OTHER = "Other",
}

export enum SchoolStatus {
  OPEN = "Open",
  OPEN_PROPOSED_TO_CLOSE = "Open, but proposed to close",
  CLOSED = "Closed",
}

export enum SchoolGender {
  MIXED = "Mixed",
  BOYS = "Boys",
  GIRLS = "Girls",
  NOT_APPLICABLE = "Not applicable",
}

export enum ReligiousCharacter {
  NONE_SPECIFIED = "",
  INTER_NON_DENOMINATIONAL = "Inter- / non- denominational",
  CHRISTIAN_SCIENCE = "Christian Science",
  ISLAM = "Islam",
  JEWISH = "Jewish",
  ANGLICAN_CHURCH_OF_ENGLAND = "Anglican/Church of England",
  GREEK_ORTHODOX = "Greek Orthodox",
  CHRISTIAN_NON_DENOMINATIONAL = "Christian/non-denominational",
  PROTESTANT = "Protestant",
  FREE_CHURCH = "Free Church",
  CHURCH_OF_ENGLAND_METHODIST = "Church of England/Methodist",
  CHURCH_OF_ENGLAND_EVANGELICAL = "Church of England/Evangelical",
  ANGLICAN_CHRISTIAN = "Anglican/Christian",
  CHURCH_OF_ENGLAND_CHRISTIAN = "Church of England/Christian",
  CATHOLIC = "Catholic",
  CHURCH_OF_ENGLAND_ROMAN_CATHOLIC = "Church of England/Roman Catholic",
  CHURCH_OF_ENGLAND_METHODIST_URC_BAPTIST = "Church of England/Methodist/United Reform Church/Baptist",
  NONE = "None",
  METHODIST_CHURCH_OF_ENGLAND = "Methodist/Church of England",
  ROMAN_CATHOLIC_CHURCH_OF_ENGLAND = "Roman Catholic/Church of England",
  CHURCH_OF_ENGLAND = "Church of England",
  PROTESTANT_EVANGELICAL = "Protestant/Evangelical",
  PLYMOUTH_BRETHREN_CHRISTIAN_CHURCH = "Plymouth Brethren Christian Church",
  MULTI_FAITH = "Multi-faith",
  CHARADI_JEWISH = "Charadi Jewish",
  CHRISTIAN = "Christian",
  MUSLIM = "Muslim",
  QUAKER = "Quaker",
  SIKH = "Sikh",
  ROMAN_CATHOLIC_ANGLICAN = "Roman Catholic/Anglican",
  ORTHODOX_JEWISH = "Orthodox Jewish",
  SEVENTH_DAY_ADVENTIST = "Seventh Day Adventist",
  CHRISTIAN_EVANGELICAL = "Christian/Evangelical",
  CHURCH_OF_ENGLAND_URC = "Church of England/United Reformed Church",
  HINDU = "Hindu",
  UNITED_REFORMED_CHURCH = "United Reformed Church",
  ROMAN_CATHOLIC = "Roman Catholic",
  ANGLICAN = "Anglican",
  MORAVIAN = "Moravian",
  ANGLICAN_EVANGELICAL = "Anglican/Evangelical",
  METHODIST = "Methodist",
  SUNNI_DEOBANDI = "Sunni Deobandi",
  CHURCH_OF_ENGLAND_FREE_CHURCH = "Church of England/Free Church",
  DOES_NOT_APPLY = "Does not apply",
  CHRISTIAN_METHODIST = "Christian/Methodist"
}

export enum AdmissionPolicy {
  NONE = 'None',
  SELECTIVE = 'Selective',
  NOT_APPLICABLE = 'Not applicable',
  NON_SELECTIVE = 'Non-selective',
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
  schoolStatus: SchoolStatus;
  openingDate: string;
  closingDate: string;
  minorGroup: MinorGroup;
  type: SchoolTypeEnum;
  isPrimary: string;
  isSecondary: string;
  isPost16: string;
  ageLow: number;
  ageHigh: number;
  gender: SchoolGender;
  religiousCharacter: ReligiousCharacter;
  admissionPolicy: AdmissionPolicy;
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
