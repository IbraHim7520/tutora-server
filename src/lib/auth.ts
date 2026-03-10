import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import env from "../configs/env";
import { UserRole, UserStatus } from "../generated/prisma/enums";

export const auth = betterAuth({
  baseURL: env.BETTER_AUTH_URL,
  trustedOrigins: [env.FRONTEN_URL , "http://localhost:3000" , "https://mentorix-pi.vercel.app"],
  socialProviders:{
    google:{
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }
  },
  cookies: {
    sameSite: "none",
    secure: true,
  },
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
        defaultValue: UserRole.STUDENT,//must match Prisma enum
      },
      isBanned: {
        type: "boolean",
        defaultValue: false,
      },
      status:{
        type: "string",
        defaultValue: UserStatus.ACTIVE
      },
    },
  },
});
