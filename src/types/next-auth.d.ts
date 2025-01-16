import "next-auth";

declare module "next-auth" {
  interface User {
    username?: string;
    // Add any other custom fields you need
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    username?: string;
    // Add any other custom fields you need
  }
}
