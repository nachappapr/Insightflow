"use client";

import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import AnimatedWaveLogo from "../common/AnimatedWaveLogo";
import Sidebar from "./MobileSidebar";
import NotificationDropdown from "./NotificationDropdown";
import UserDropdown from "./UserDropdown";

const DashboardHeader = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const handleSidebar = () => setOpenSidebar((prev) => !prev);
  return (
    <div>
      <header className="sticky top-0 isolate z-[1000] backdrop-blur-lg bg-[radial-gradient(166.82%_166.82%_at_103.9%_-10.39%,#E84D70_0%,#A337F6_53.09%,#28A7ED_100%)] md:bg-none md:bg-white/90 shadow-[0_4px_10px_rgba(124,58,237,0.15)]">
        <div className="centered-layout">
          <div className="px-4 py-3 md:px-0 flex items-center justify-between">
            <div className="flex items-center gap-16">
              <div className="flex">
                <AnimatedWaveLogo size={40} isBrandTextRequired={true} />
              </div>
              <nav className="hidden md:flex gap-6 text-text-primary">
                <Link
                  href="/about"
                  className="hover:text-brand-secondary  transition-fast link-underline"
                >
                  Dashboard
                </Link>
                <Link
                  href="/features"
                  className="hover:text-brand-secondary  transition-fast link-underline"
                >
                  Roadmap
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-4 font-medium">
              <NotificationDropdown />
              <div className="hidden md:block">
                <UserDropdown />
              </div>
              <MenuIcon
                className="h-5 w-5 text-white md:text-text-primary md:hidden"
                onClick={handleSidebar}
              />
            </div>
          </div>
        </div>
      </header>
      <Sidebar isOpen={openSidebar} onClose={handleSidebar} />
    </div>
  );
};

export default DashboardHeader;
