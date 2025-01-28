import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Jost } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const jost = Jost({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jost",
});

export const metadata: Metadata = {
  title: "Product Feedback App",
  description: "A platform for collecting and managing product feedback",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jost.variable} antialiased`}>
        <SessionProvider>
          {children}
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
