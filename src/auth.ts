import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";
import { prisma } from "../prisma";
import authConfig from "./auth.config";
import MagicLinkEmail from "./components/emails/magicLinkEmail";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    ...authConfig.providers,
    Resend({
      apiKey: process.env.RESEND_API_KEY,
      from: "noreply@bizsuite.org",
      // Custom email template
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        try {
          const response = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${provider.apiKey}`,
            },
            body: JSON.stringify({
              from: provider.from,
              to: identifier,
              subject: `Welcome to InsightFlow`,
              html: MagicLinkEmail({ url }),
            }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            console.error("Resend API error:", errorData);
            throw new Error(
              `Resend API error: ${response.status} ${response.statusText}`
            );
          }

          await response.json();
        } catch (error) {
          console.error("Failed to send verification email:", error);
          throw new Error("Failed to send verification email");
        }
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.username = token.username as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  events: {
    async createUser({ user }) {
      const usernameBase = user.email?.split("@")[0] || "user";
      let username = usernameBase;

      // Check if the base username already exists
      const existingUser = await prisma.user.findUnique({
        where: { username },
      });

      // Append a random number if the username is taken
      if (existingUser) {
        username = `${username}${Math.floor(Math.random() * 1000)}`;
      }

      // Update the user with the new username
      await prisma.user.update({
        where: { id: user.id },
        data: { username },
      });
    },
  },
  pages: {
    signIn: "/login",
    error: "/error",
    verifyRequest: "/email-sent",
  },
});
