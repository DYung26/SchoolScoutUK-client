export interface CreateUserDTO {
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

