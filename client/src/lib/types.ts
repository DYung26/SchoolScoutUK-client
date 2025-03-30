import { LoginDTO } from "server/dtos/user.dto";

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

export type SchoolType = 'public' | 'private' | 'grammar';

export interface School {
  id: number;
  name: string;
  address: string;
  city: string;
  postcode: string;
  type: SchoolType;
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
  type?: SchoolType;
  city?: string;
  minRating?: number;
}

export interface AuthContextType {
  user: User;
  login: (userData: LoginDTO) => void;
  logout: () => void;
  loading: boolean;
}
