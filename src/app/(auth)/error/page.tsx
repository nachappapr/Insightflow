import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_ROUTES } from "@/constants/endpoint";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

interface AuthErrorPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function AuthErrorPage({
  searchParams,
}: AuthErrorPageProps) {
  const { error } = await searchParams;
  const errorType = typeof error === "string" ? error : "Default";

  const errorMessages: Record<string, string> = {
    Configuration: "There is a problem with the server configuration.",
    AccessDenied: "You do not have permission to sign in.",
    Verification: "The verification link was invalid or has expired.",
    CredentialsSignin: "The email or password you entered is incorrect.",
    Default: "An error occurred during authentication.",
    OAuthAccountNotLinked:
      "The email address is already associated with another account. Please sign in using the original method you used to create your account.",
  };

  const errorMessage = errorMessages[errorType] || errorMessages.Default;

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f7f8fd]">
      <Card className="w-full max-w-md card shadow-md rounded-lg overflow-hidden">
        <CardHeader className="text-center space-y-2 pt-8 px-4">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <CardTitle className="h2-bold text-text-primary">
            Authentication Error
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center px-8 pb-8">
          <p className="body2-regular text-text-secondary mb-6">
            {errorMessage}
          </p>
          <Button variant="primaryAction" className="w-full">
            <Link href={APP_ROUTES.LOGIN}>Back to Login</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
