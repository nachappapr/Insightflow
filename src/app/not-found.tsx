import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Page Not Found
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Oops! The page you&apos;re looking for doesn&apos;t exist or still in
          development.
        </p>
        <Button asChild variant="tertiary-action">
          <Link href="/" className="inline-flex items-center justify-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
