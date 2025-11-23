import { Role } from '@prisma/client';

export interface User {
  id: number;
  googleId?: string | null;
  name?: string | null;
  picture?: string | null;
  email: string;
  password?: string | null;
  role: Role;
  function?: string | null;
  user_type: string[];
  features: string[];
  access: string;
  companyId: number;
  status: boolean;
  createdAt: Date;
}
