"use client";

import { APP_ROUTES } from "@/constants/endpoint";
import { ArrowRight, MenuIcon } from "lucide-react";
import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";
import AnimatedWaveLogo from "../common/AnimatedWaveLogo";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 backdrop-blur-lg z-20">
      <div className="flex items-center justify-center bg-gradient-to-r from-brand-secondary to-brand-primary text-white body3-semibold py-3 capitalize">
        <div className="inline-flex items-center gap-1">
          <p className="hidden md:inline-block">
            Transform feedback into insights - Try InsightFlow free for 14 days
          </p>
          <p className="inline-block md:hidden">
            Try InsightFlow free for 14 days
          </p>
          <ArrowRight size={16} />
        </div>
      </div>
      <div className="py-5">
        <div className="centered-layout">
          <div className="flex justify-between items-center">
            <AnimatedWaveLogo size={40} isBrandTextRequired={true} />
            <MenuIcon className="h-5 w-5 md:hidden" />
            <nav className="hidden md:flex items-center gap-6 text-black ">
              <ScrollLink
                to="product-showcase"
                className="hover:text-brand-secondary font-semibold transition-fast link-underline cursor-pointer"
                smooth={true}
                duration={500}
                offset={-50}
              >
                About
              </ScrollLink>
              <ScrollLink
                to="features"
                className="hover:text-brand-secondary font-semibold transition-fast link-underline cursor-pointer"
                smooth={true}
                duration={500}
                offset={-50}
              >
                Features
              </ScrollLink>
              {/* <Link
                href="/pricing"
                className="hover:text-brand-secondary font-semibold transition-fast link-underline"
              >
                Pricing
              </Link> */}

              <Button variant="primaryAction" asChild>
                <Link href={APP_ROUTES.SIGNUP}>Get Started</Link>
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
