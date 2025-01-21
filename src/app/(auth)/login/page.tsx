"use client";

import { signInWithMagicLink } from "@/actions/auth";
import { AuthErrorBanner } from "@/components/auth/AuthErrorBanner";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";
import AnimatedWaveLogo from "@/components/common/AnimatedWaveLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInWithMagicLinkSchema } from "@/schema/auth.schema";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useActionState } from "react";
import SignUpPatternImage from "../../../../public/images/auth/signup-bg.png";

export default function LoginPage() {
  const [lastResult, action, isPending] = useActionState(
    signInWithMagicLink,
    undefined
  );
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: signInWithMagicLinkSchema });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col p-8 lg:p-16">
        <div className="flex items-center gap-2 mb-16">
          <AnimatedWaveLogo size={48} />
        </div>

        <div className="flex-1 flex flex-col justify-center max-w-md w-full mx-auto">
          <h1 className="text-3xl font-bold mb-2 ">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient-x">
              Insightflow
            </span>
          </h1>
          <p className="text-muted-foreground mb-8">
            Share ideas and collaborate with your community
          </p>

          <form
            className="space-y-6"
            id={form.id}
            onSubmit={form.onSubmit}
            action={action}
            noValidate
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                placeholder="name@example.com"
                key={fields.email.key}
                name={fields.email.name}
                defaultValue={fields.email.initialValue}
                className={clsx("h-12", {
                  "border-error border-solid focus:border-none":
                    fields.email.errors?.length,
                })}
              />
              <span className="body3-semibold !font-normal text-error">
                {fields.email.errors?.[0]}
              </span>
            </div>

            <Button
              className="w-full h-12 text-base "
              variant="primaryAction"
              type="submit"
              disabled={isPending}
            >
              Log In
            </Button>
          </form>
          <div className="relative flex items-center my-4">
            <div className="flex-grow border-t border-gray-300" />
            <span className="mx-4 text-xs uppercase text-muted-foreground">
              Or Login with
            </span>
            <div className="flex-grow border-t border-gray-300" />
          </div>
          <GoogleSignInButton authType="signin" />

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?&nbsp;
            <Link
              href="/signup"
              className="text-primary hover:underline text-brand-secondary font-bold"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Decorative Background */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <Image
          src={SignUpPatternImage}
          alt="signup-pattern"
          placeholder="blur"
          layout="fill"
          objectFit="cover"
          sizes="50vw"
        />
        {/* Multiple Overlays for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/40 via-purple-900/60 to-black/80"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative h-full flex items-center justify-center p-16">
          <div className="text-white space-y-6 max-w-lg animate-fade-in">
            <h2 className="text-4xl font-bold">Make Every Feedback Count</h2>
            <p className="text-lg opacity-90">
              The all-in-one platform to collect, organize, and track user
              feedback. Transform suggestions into features your users will
              love.
            </p>
          </div>
        </div>
      </div>
      <AuthErrorBanner />
    </div>
  );
}
