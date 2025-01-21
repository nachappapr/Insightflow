"use client";
import { motion } from "motion/react";

const AnimatedHeroSection = () => {
  // Animation variants for floating cards
  const floatingAnimation = {
    initial: { y: 0 },
    animate: {
      y: [-10, 0, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Staggered entrance for cards
  const containerAnimation = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Card entrance animation
  const cardAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <div>
      {/* Main Content */}
      <div className="relative container mx-auto h-full flex items-center justify-center">
        <motion.div
          variants={containerAnimation}
          initial="initial"
          animate="animate"
          className="grid grid-cols-3 gap-8"
        >
          {/* Central Platform Card */}
          <motion.div
            variants={cardAnimation}
            className="col-span-3 bg-white rounded-2xl shadow-xl p-8 backdrop-blur-lg bg-opacity-90"
          >
            <div className="h-12 bg-gradient-to-r from-brand-secondary to-brand-primary rounded-xl mb-6" />
            <div className="space-y-4">
              <div className="h-6 bg-gray-100 rounded-lg w-3/4" />
              <div className="h-4 bg-gray-100 rounded-lg w-1/2" />
            </div>
          </motion.div>

          {/* Floating Feedback Cards */}
          {[1, 2, 3].map((index) => (
            <motion.div
              key={index}
              variants={floatingAnimation}
              initial="initial"
              animate="animate"
              className="bg-white rounded-xl shadow-lg p-6 backdrop-blur-lg bg-opacity-90"
              style={{
                animationDelay: `${index * 0.2}s`,
                animationDuration: "3s",
              }}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-brand-secondary to-brand-primary mb-4" />
              <div className="space-y-3">
                <div className="h-4 bg-gray-100 rounded-lg w-3/4" />
                <div className="h-3 bg-gray-100 rounded-lg w-1/2" />
              </div>
            </motion.div>
          ))}

          {/* Floating Elements */}
          <motion.div
            animate={{
              rotate: [0, 360],
              transition: { duration: 20, repeat: Infinity, ease: "linear" },
            }}
            className="absolute top-20 right-20 w-24 h-24"
          >
            <div className="w-4 h-4 bg-brand-secondary rounded-full absolute" />
            <div className="w-3 h-3 bg-brand-primary rounded-full absolute top-12 right-12" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnimatedHeroSection;
