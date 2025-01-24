import MagicLinkEmail from "@/components/emails/magicLinkEmail";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import type { Provider } from "next-auth/providers";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";
import { prisma } from "./prisma";

const providers: Provider[] = [Google, Github];

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== "resend");

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    Github,
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
  callbacks: {
    async signIn({ user, account, profile }) {
      if (
        account?.provider === "google" ||
        account?.provider === "github" ||
        account?.provider === "resend"
      ) {
        const username = profile?.email?.split("@")[0] || "";
        // Check if username already exists
        const existingUser = await prisma.user.findUnique({
          where: { username },
          include: { accounts: true },
        });

        if (existingUser) {
          // Username already exists, append a random number
          user.username = `${username}${Math.floor(Math.random() * 1000)}`;
        } else {
          user.username = username;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user?.username) {
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token?.username) {
        session.user.username = token.username as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/error",
    verifyRequest: "/email-sent",
  },
});
