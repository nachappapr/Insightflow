import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { APP_ROUTES } from "@/constants/endpoint";
import { Mail } from "lucide-react";
import Link from "next/link";

export default function EmailSentPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md card shadow-xl">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
            <Mail className="h-8 w-8 text-purple-600" />
          </div>
          <CardTitle className="h2-bold text-text-primary">
            Check your email
          </CardTitle>
          <CardDescription className="text-text-secondary mt-2">
            We&apos;ve sent you a magic link to sign in
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center pb-8">
          <p className="mb-6 body2-regular text-text-secondary">
            Click the link in the email to sign in to your account. If you
            don&apos;t see the email, check your spam folder.
          </p>
          <Button asChild variant="primaryAction" className="w-full">
            <Link href={APP_ROUTES.LOGIN}>Back to Login</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
