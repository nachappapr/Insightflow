"use client";

import useClickOutside from "@/hooks/useClickOutside";
import { Bell } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const dummyNotifications = [
    { id: 1, message: "New feedback received" },
    { id: 2, message: "Your comment was liked" },
    { id: 3, message: "New feature announced" },
  ];

  return (
    <div className="relative z-1000" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-transparent transition-fast group"
      >
        <Bell className="h-5 w-5 text-white md:text-text-primary font-medium group-hover:text-white md:group-hover:text-brand-secondary" />
        <span className="absolute top-1 right-1 h-2 w-2 bg-white md:bg-brand-secondary rounded-full"></span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-1001"
          >
            {dummyNotifications.map((notification) => (
              <div
                key={notification.id}
                className="px-4 py-2 hover:bg-transparent cursor-pointer hover:text-brand-secondary transition-fast"
              >
                {notification.message}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationDropdown;
