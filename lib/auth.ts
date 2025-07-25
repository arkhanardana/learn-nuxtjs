import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const config = useRuntimeConfig();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mysql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: config.githubProvider.clientId,
      clientSecret: config.githubProvider.clientSecret,
    },
  },
  emailVerification: {
    autoSignInAfterVerification: true,
  },
});
