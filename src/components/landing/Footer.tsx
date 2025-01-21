import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import AnimatedWaveLogo from "../common/AnimatedWaveLogo";

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-brand-secondary to-brand-primary text-white py-12">
      <div className="centered-layout">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <AnimatedWaveLogo variant="secondary" />
          <nav className="flex flex-wrap justify-center md:justify-end gap-6 font-medium text-gray-300">
            <Link
              href="/about"
              className="hover:text-background-primary transition-fast"
            >
              About
            </Link>
            <Link
              href="/features"
              className="hover:text-background-primary transition-fast"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="hover:text-background-primary transition-fast"
            >
              Pricing
            </Link>
            <Link
              href="/contact"
              className="hover:text-background-primary transition-fast"
            >
              Contact
            </Link>
          </nav>
        </div>
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-300 mb-4 md:mb-0">
            © 2025 FeedbackFlow. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white duration-250 ease-smooth"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white duration-250 ease-smooth"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white duration-250 ease-smooth"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
