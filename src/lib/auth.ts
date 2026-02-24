import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import env from "../configs/env";
import { UserRole, UserStatus } from "../generated/prisma/enums";

export const auth = betterAuth({
  baseURL: env.BETTER_AUTH_URL,
  trustedOrigins: [env.FRONTEN_URL , "http://localhost:3000"],
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        default: UserRole.STUDENT, // must match Prisma enum
      },
      isBanned: {
        type: "boolean",
        default: false,
      },
      status:{
        type: "string",
        default: UserStatus.ACTIVE
      },
    },
  },
});
