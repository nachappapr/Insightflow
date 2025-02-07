import { NextAuthConfig } from "next-auth";
import type { Provider } from "next-auth/providers";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { NextResponse } from "next/server";
import { APP_ROUTES, PRIVATE_ROUTES } from "./constants/endpoint";

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

const authConfig = {
  providers: [Google, Github],
  callbacks: {
    authorized: async ({ auth, request: { nextUrl } }) => {
      const isLoggedIn = !!auth?.user;
      const isProtectedRoute = PRIVATE_ROUTES.some((path) => {
        // Match static paths
        if (nextUrl.pathname.startsWith(path)) {
          return true;
        }

        // Match dynamic routes like /feedback/:id
        if (/^\/feedback\/[^\/]+$/.test(nextUrl.pathname)) {
          return true;
        }

        // Match dynamic routes like /feedback/:id/edit
        if (/^\/feedback\/[^\/]+\/edit$/.test(nextUrl.pathname)) {
          return true;
        }

        return false;
      });

      // redirect if user is logged in and trying to access login page
      if (
        isLoggedIn &&
        (nextUrl.pathname === APP_ROUTES.LOGIN ||
          nextUrl.pathname === APP_ROUTES.SIGNUP)
      ) {
        return NextResponse.redirect(new URL(APP_ROUTES.DASHBOARD, nextUrl));
      }

      // Protect private routes
      if (isProtectedRoute && !isLoggedIn) {
        return false; // Redirect to login page
      }

      return true;
    },
  },
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;

export default authConfig;
