"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCcw } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <h1 className="h1-bold text-text-primary">
          Oops! Something went wrong
        </h1>
        <p>
          We&apos;re sorry, but we encountered an error while loading this
          feedback.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Button
            variant="primaryAction"
            onClick={() => reset()}
            className="inline-flex items-center justify-center"
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Try again
          </Button>
          <Button asChild variant="tertiary-action">
            <Link href="/" className="inline-flex items-center justify-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
