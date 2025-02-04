"use client";

import useClickOutside from "@/hooks/useClickOutside";
import { User } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import SignOutButton from "../forms/SignOutButton";

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-transparent transition-fast group"
      >
        <User className="h-5 w-5 group-hover:text-brand-secondary" />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-10"
          >
            <button className="px-4 py-2 hover:text-brand-secondary cursor-pointer flex items-center transition-fast group">
              <User className="mr-2 h-4 w-4 text-text-primary group-hover:text-brand-secondary font-medium" />
              <span>Profile</span>
            </button>
            <SignOutButton />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDropdown;
