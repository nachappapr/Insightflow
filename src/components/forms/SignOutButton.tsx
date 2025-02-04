import { signOutAction } from "@/actions/auth.action";
import { LogOut } from "lucide-react";
import { useSearchParams } from "next/navigation";

const SignOutButton = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  return (
    <form action={() => signOutAction(callbackUrl)}>
      <button
        className="px-4 py-2 hover:text-brand-secondary cursor-pointer flex items-center transition-fast group"
        type="submit"
      >
        <LogOut className="mr-2 h-4 w-4 group-hover:text-brand-secondary group-hover:stroke-brand-secondary font-medium" />
        <span>Log out</span>
      </button>
    </form>
  );
};

export default SignOutButton;
