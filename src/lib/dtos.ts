export interface SignUpDTO {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}
