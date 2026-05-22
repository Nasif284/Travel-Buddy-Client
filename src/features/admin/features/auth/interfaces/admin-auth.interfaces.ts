export interface AdminLoginInput {
  email: string;
  password: string;
}

export interface CreateAdminInput {
  fullName: string;
  email: string;
  password: string;
  role: string;
}
