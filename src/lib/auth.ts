import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import env from "../configs/env";
import { UserRole, UserStatus } from "../generated/prisma/enums";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  baseURL: env.BETTER_AUTH_URL,
  trustedOrigins: [env.FRONTEN_URL , "http://localhost:3000", "https://mentorix-pi.vercel.app"],
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  advanced:{
    cookiePrefix: "better-auth",
    useSecureCookies: true,
    crossSubDomainCookies:{
      enabled:false
    },
    disableCSRFCheck: true
  },
  session:{
    cookieCache:{
      enabled:true,
      maxAge: 5*60
    }
  },

  plugins:[
    nextCookies()
  ],
  
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: UserRole.STUDENT, // must match Prisma enum
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
