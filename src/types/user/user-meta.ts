import type { UserRole } from "@/constants/user";

export interface IUserMeta {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
}
