export interface SignUpDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}
