export enum AcademicPerformanceEnum {
  HIGH = "high",
  AVERAGE = "average",
  SUPPORT = "support",
}

export enum MinorGroupEnum {
  ACADEMY = "Academy",
  MAINTAINED = "Maintained school",
  INDEPENDENT = "Independent school",
  SPECIAL = "Special school",
  COLLEGE = "College",
  OTHER = "Other",
}

export enum SchoolStatusEnum {
  OPEN = "Open",
  OPEN_PROPOSED_TO_CLOSE = "Open, but proposed to close",
  CLOSED = "Closed",
}

export enum SchoolGenderEnum {
  MIXED = "Mixed",
  BOYS = "Boys",
  GIRLS = "Girls",
  NOT_APPLICABLE = "Not applicable",
}

export enum ReligiousCharacterEnum {
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

export enum AdmissionPolicyEnum {
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

export enum FavouriteSubjectsEnum {
  MATH = "Math",
  ENGLISH = "English",
  BIOLOGY = "Biology",
  CHEMISTRY = "Chemistry",
  PHYSICS = "Physics",
  GEOGRAPHY = "Geography",
  HISTORY = "History",
  LITERATURE = "Literature",
  COMPUTER_SCIENCE = "Computer Science",
  ECONOMICS = "Economics",
  ART = "Art",
  MUSIC = "Music",
  LANGUAGES = "Languages",
}

export enum ExtracurricularsEnum {
  SPORTS = 'Sports',
  MUSIC = 'Music',
  ART = 'Art',
  DRAMA = 'Drama',
  CODING = 'Coding',
  DEBATE = 'Debate',
  SCOUTING = 'Scouting',
  VOLUNTEERING = 'Volunteering',
  ROBOTICS = 'Robotics',
  ENTREPENEURSHIP = 'Entrepreneurship',
}

export enum HobbyEnum {
  READING = "Reading",
  DRAWING = "Drawing",
  GAMING = "Gaming",
  SINGING = "Singing",
  COOKING = "Cooking",
  PHOTOGRAPHY = "Photography",
  BLOGGING = "Blogging",
}

export enum UserGenderEnum {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
  PREFER_NOT_TO_SAY = "prefer_not_to_say",
}

export enum CareerInterestEnum {
  MEDICINE = "Medicine",
  LAW = "Law",
  ENGINEERING = "Engineering",
  BUSINESS = "Business",
  ART = "Art",
  SCIENCE = "Science",
  IT = "IT",
  POLITICS = "Politics",
  EDUCATION = "Education",
  FINANCE = "Finance",
  SPORTS = "Sports",
  MILITARY = "Military",
  DESIGN = "Design",
}

export enum BudgetEnum {
  LOW = '<1000',
  LOWER_MID = '1000-3000',
  MID = '3000-5000',
  UPPER_MID = '5000-10000',
  HIGH = '10000+'
}

// might not be needed - exact city would be preferred
export enum LocationPreferenceEnum {
  CITY = "city",
  SUBURB = "suburb",
  RURAL = "rural",
  NO_PREFERENCE = "no_preference",
}

export enum ReligiousAffiliationEnum {
  NONE = "None",
  ANGLICAN = "Anglican",
  CATHOLIC = "Catholic",
  CHRISTIAN = "Christian",
  CHURCH_OF_ENGLAND = "Church of England",
  CHURCH_OF_ENGLAND_METHODIST = "Church of England / Methodist",
  CHURCH_OF_ENGLAND_ROMAN_CATHOLIC = "Church of England / Roman Catholic",
  HINDU = "Hindu",
  ISLAM = "Islam",
  JEWISH = "Jewish",
  METHODIST = "Methodist",
  MUSLIM = "Muslim",
  ORTHODOX_JEWISH = "Orthodox Jewish",
  OTHER_CHRISTIAN = "Other Christian",
  PLYMOUTH_BRETHREN_CHRISTIAN_CHURCH = "Plymouth Brethren Christian Church",
  QUAKER = "Quaker",
  ROMAN_CATHOLIC = "Roman Catholic",
  ROMAN_CATHOLIC_CHURCH_OF_ENGLAND = "Roman Catholic / Church of England",
  SIKH = "Sikh",
  OTHER = "Other",
}

export enum LearningNeedsEnum {
  NONE = "none",
  GIFTED = "gifted",
  SPECIAL_NEEDS = "special_needs",
  ADHD = "ADHD",
  DYSLEXIA = "dyslexia",
  HEARING_IMPAIRMENT = "hearing_impairment",
  VISUAL_IMPAIRMENT = "visual_impairment",
}

// to be replaced with miles
export enum CommuteWillingnessEnum {
  UNDER_15_MIN = "<15",
  BETWEEN_15_30 = "15-30",
  BETWEEN_30_60 = "30-60",
  OVER_60_MIN = "60+",
}

export enum ReviewRatingEnum {
  ONE = "1",
  TWO = "2",
  THREE = "3",
  FOUR = "4",
  FIVE = "5",
}

export enum SignedURLTypeEnum {
  UPLOAD = "upload",
  GET = "get",
}

export enum FileStatusEnum {
  UPLOAD_REQUEST = "request",
  UPLOAD_CONFIRMED = "confirmed",
  DELETED = "deleted",
}
