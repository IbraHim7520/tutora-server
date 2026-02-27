import { UserRole } from "../src/generated/prisma/enums";

export interface ITutorSignUp {
  name: string;
  email: string;
  password: string;
  image?: string; // optional string URL
  role?: UserRole;
}

export interface ITutorProfile {
    userId:string
  designation: string;
  degree: string;
  experience: string; // should be number
  contact?: string | null;
  address?: string | null;
}