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
  title: {
    default: "InsightFlow",
    template: "%s | InsightFlow",
  },
  description: "Transform customer feedback into actionable insights",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "InsightFlow",
  },
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
