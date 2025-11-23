import { User } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: Partial<User> & { company?: any }; // ajusta conforme precisares
    }
  }
}
