export interface User {
  name: string;
  email: string;
  firstName?: string;
  lastName?: string;
  password: string;
  confirmPassword?: string;
  isAdmin: boolean;
  id: number;
}
