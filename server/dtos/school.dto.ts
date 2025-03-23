export interface CSVRow {
  URN: string;
  LANAME: string;
  LA: string;
  ESTAB: string;
  LAESTAB: string;
  SCHNAME: string;
  STREET: string;
  LOCALITY: string;
  ADDRESS3: string;
  TOWN: string;
  SCHSTATUS: string;
  POSTCODE: string,
  OPENDATE: string;
  CLOSEDATE: string;
  MINORGROUP: MinorGroup;
  SCHOOLTYPE: string;
  ISPRIMARY: string;
  ISSECONDARY: string;
  ISPOST16: string;
  AGELOW: string;
  AGEHIGH: string;
  GENDER: string;
  RELCHAR: ReligiousCharacter;
  ADMPOL: string;
  // [key: string]: string;
}

export enum MinorGroup {
  ACADEMY = "academy",
  MAINTAINED = "maintained",
  INDEPENDENT = "independent",
  SPECIAL = "special",
  COLLEGE = "college",
}

export enum Gender {
  MIXED = "mixed",
  BOYS = "boys",
  GIRLS = "girls",
}

export enum ReligiousCharacter {
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
  NO_RELIGIOUS_CHARACTER = "No religious character",
  ORTHODOX_JEWISH = "Orthodox Jewish",
  OTHER = "Other",
  OTHER_CHRISTIAN = "Other Christian",
  PLYMOUTH_BRETHREN_CHRISTIAN_CHURCH = "Plymouth Brethren Christian Church",
  QUAKER = "Quaker",
  ROMAN_CATHOLIC = "Roman Catholic",
  ROMAN_CATHOLIC_CHURCH_OF_ENGLAND = "Roman Catholic / Church of England",
  SIKH = "Sikh",
}
