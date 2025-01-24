"use client";

import clsx from "clsx";
import { motion } from "motion/react";
import { Button, ButtonProps } from "../ui/button";

const AnimatedButton = (
  props: ButtonProps & { isPending: boolean; title: string }
) => {
  const { isPending, className, title, ...rest } = props;
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        {...rest}
        disabled={isPending}
        className={clsx("relative overflow-hidden", className)}
      >
        <motion.span
          initial={false}
          animate={{
            y: isPending ? -30 : 0,
            opacity: isPending ? 0 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          {title}
        </motion.span>
        <motion.span
          initial={false}
          animate={{
            y: isPending ? 0 : 30,
            opacity: isPending ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <motion.div
            animate={{ rotate: isPending ? 360 : 0 }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="w-5 h-5 border-t-2 border-r-2 border-white rounded-full"
          />
        </motion.span>
      </Button>
    </motion.div>
  );
};

export default AnimatedButton;
