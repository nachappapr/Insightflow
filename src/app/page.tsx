import LandingWrapper from "@/components/landing/LandingWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "InsightFlow - Customer Feedback Management Platform",
  description:
    "Collect, analyze, and act on customer feedback in real-time. Transform feedback into actionable insights with InsightFlow.",
  openGraph: {
    images: [
      {
        url: "/og-landing.png",
        width: 1200,
        height: 630,
        alt: "InsightFlow Platform Overview",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  return <LandingWrapper />;
}
