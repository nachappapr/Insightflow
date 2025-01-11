"use client";

import AnimatedWaveLogo from "@/components/common/AnimatedWaveLogo";
import GoogleIcon from "@/components/common/GoogleIcon";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex">
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

          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="h-12"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="h-12 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </label>
              </div>
              <Link
                href="/forgot-password"
                className="text-sm text-primary hover:underline hover:text-brand-secondary transition-hover duration-250 ease-smooth"
              >
                Forgot your password?
              </Link>
            </div>

            <Button className="w-full h-12 text-base " variant="primaryAction">
              Log In
            </Button>

            <div className="relative flex items-center">
              <div className="flex-grow border-t border-gray-300" />
              <span className="mx-4 text-xs uppercase text-muted-foreground">
                Or Login with
              </span>
              <div className="flex-grow border-t border-gray-300" />
            </div>

            <Button
              variant="outline"
              className="w-full h-12 text-base font-normal"
            >
              <GoogleIcon />
              Sign up with Google
            </Button>
          </form>

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
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/auth/signup-bg.png')",
          }}
        ></div>
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
    </div>
  );
}
