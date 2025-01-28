import { motion, AnimatePresence } from "motion/react";
import { LogOut, X } from "lucide-react";
import Link from "next/link";

type SidebarWithOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ isOpen, onClose }: SidebarWithOverlayProps) {
  const sidebarVariants = {
    open: {
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    closed: {
      x: "-100%",
      transition: { type: "spring", stiffness: 300, damping: 30, delay: 0.1 },
    },
  };

  const overlayVariants = {
    open: {
      opacity: 1,
      transition: { duration: 0.2 },
    },
    closed: {
      opacity: 0,
      transition: { duration: 0.2, delay: 0.2 },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-20"
          />
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-30"
          >
            <div className="p-4 flex flex-col">
              <button
                onClick={onClose}
                className="mb-8 p-2 hover:bg-brand-secondary rounded-full transition-fast justify-items-end"
              >
                <X className="h-6 w-6" />
              </button>

              <nav className="flex flex-col gap-4 text-text-primary">
                <Link
                  href="/dashboard"
                  className="p-2 hover:text-brand-secondary transition-fast"
                >
                  Dashboard
                </Link>
                <Link
                  href="/roadmap"
                  className="p-2 hover:text-brand-secondary transition-fast"
                >
                  Roadmap
                </Link>
                <Link
                  href="/settings"
                  className="p-2 hover:text-brand-secondary transition-fast"
                >
                  Settings
                </Link>
                <button className="flex items-center gap-2 w-full p-2  hover:bg-brand-secondary rounded-md transition-colors">
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
