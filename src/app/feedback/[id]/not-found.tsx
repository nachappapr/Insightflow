import { Button } from "@/components/ui/button";
import { APP_ROUTES } from "@/constants/endpoint";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <h1 className="text-4xl font-bold text-text-primary">
          Feedback Not Found
        </h1>
        <p>
          Sorry, the feedback you&apos;re looking for doesn&apos;t exist or has
          been removed.
        </p>
        <Button asChild variant="primaryAction" className="mt-8">
          <Link
            href={APP_ROUTES.DASHBOARD}
            className="inline-flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
}
