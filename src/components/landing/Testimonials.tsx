"use client";

import { testimonials } from "@/constants/feedback";
import { motion } from "motion/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardFooter } from "../ui/card";

const Testimonials = () => {
  return (
    <section className="pt-0 pb-10 bg-white overflow-hidden" id="testimonials">
      <motion.div
        className="centered-layout flex flex-col items-center [mask-image:linear-gradient(to_right,transparent,black_25%,black_75%,transparent)]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-text-primary mb-5 bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
          Success Stories From Our Users&nbsp;
        </h2>
        <p className="text-lg tracking-tight mb-10 max-w-[400px] text-center">
          Discover how teams like yours are building better products and
          delighting their users with InsightFlow.
        </p>
        <div className="mt-10">
          <motion.div
            className="flex justify-center items-center gap-6 pr-6 "
            animate={{
              translateX: "-50%",
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
            }}
          >
            {[...testimonials].map((testimonial) => {
              return (
                <Card
                  key={testimonial.id}
                  className="p-10 !border !border-solid !border-[#222222]/10 rounded-3xl !shadow-[0_7px_14px_#EAEAEA] min-w-[320px] max-w-xs"
                >
                  <CardContent>{testimonial.quote}</CardContent>
                  <CardFooter>
                    <div className="flex items-center gap-4">
                      <Avatar className="w-10 h-10">
                        <AvatarImage
                          src={testimonial.image}
                          alt={testimonial.name}
                        />
                        <AvatarFallback>{testimonial.name}</AvatarFallback>
                      </Avatar>
                      <div>
                        <span className="text-text-primary body3-semibold tracking-tight">
                          {testimonial.name}
                        </span>
                        <span className="body3-semibold !font-normal block tracking-tight">
                          @casey
                        </span>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              );
            })}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Testimonials;
