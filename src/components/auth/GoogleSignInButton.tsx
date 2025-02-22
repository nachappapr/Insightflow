import { signInWithProvider } from "@/actions/auth.action";
import { providerMap } from "@/auth.config";
import GithubIcon from "../common/GithubIcon";
import GoogleIcon from "../common/GoogleIcon";
import { Button } from "../ui/button";

const ProviderIcons: Record<string, React.ComponentType> = {
  google: GoogleIcon,
  github: GithubIcon,
};

type AuthAction = "signin" | "signup";
type OAuthButtonProps = {
  authType: AuthAction;
  callbackUrl?: string;
};

const OAuthButton = ({ authType, callbackUrl }: OAuthButtonProps) => {
  const buttonText = authType === "signin" ? "Sign in" : "Sign up";
  return (
    <div className="flex justify-between gap-2">
      {providerMap.map((provider) => {
        const Icon = ProviderIcons[provider.id];
        return (
          <form
            action={() => signInWithProvider(provider, callbackUrl)}
            key={provider.id}
          >
            <Button
              variant="outline"
              className="w-full h-12 text-base font-normal"
              type="submit"
            >
              <Icon /> {buttonText} with {provider.name}
            </Button>
          </form>
        );
      })}
    </div>
  );
};

export default OAuthButton;
