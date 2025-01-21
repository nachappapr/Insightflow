"use client";

import { GitMerge, MessageSquare, Vote } from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    title: "Feedback Collection",
    description:
      "Easily collect and organize feedback from your users in one central location.",
    icon: MessageSquare,
    color: "bg-[#AD1FEA]/10",
    iconColor: "text-[#AD1FEA]",
  },
  {
    title: "Voting System",
    description:
      "Let users vote on feedback to help prioritize what matters most.",
    icon: Vote,
    color: "bg-[#4661E6]/10",
    iconColor: "text-[#4661E6]",
  },
  {
    title: "Roadmap Integration",
    description: "Connect feedback directly to your product roadmap.",
    icon: GitMerge,
    color: "bg-[#373F68]/10",
    iconColor: "text-[#373F68]",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="centered-layout flex flex-col items-center">
        <motion.div
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-text-primary pb-5 bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
            Everything You Need to Manage Feedback&nbsp;
          </h2>
          <p className="text-lg tracking-tight mb-10 max-w-[500px]">
            Powerful features to help you collect, organize, and act on user
            feedback effectively.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
        >
          {[...features].map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="p-10 !border !border-solid !border-[#222222]/10 rounded-3xl !shadow-[0_7px_14px_#EAEAEA] max-w-xs w-full"
            >
              <div
                className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${feature.color} mb-2`}
              >
                <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
              </div>

              <h3 className="h3-bold mb-2 text-text-primary tracking-tight">
                {feature.title}
              </h3>
              <p className="leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
