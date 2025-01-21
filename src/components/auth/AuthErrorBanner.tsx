"use client";

import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function AuthErrorBanner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const error = searchParams.get("error");
    if (error === "OAuthAccountNotLinked") {
      setShowBanner(true);

      // Remove the error parameter from the URL
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete("error");
      const newPathname =
        window.location.pathname +
        (newSearchParams.toString() ? `?${newSearchParams.toString()}` : "");
      router.replace(newPathname);
    }
  }, [router, searchParams]);

  if (!showBanner) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 text-sm font-medium text-white bg-error">
      <div className="flex items-center space-x-2">
        <span className="body3-semibold">Account Already Exists:</span>
        <span>
          The email address is already associated with another account. Please
          sign in using the original method you used to create your account.
        </span>
      </div>
      <button
        onClick={() => setShowBanner(false)}
        className="flex items-center justify-center w-6 h-6 text-white rounded-full hover:bg-error-light focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
      >
        <X className="w-4 h-4" />
        <span className="sr-only">Close</span>
      </button>
    </div>
  );
}
