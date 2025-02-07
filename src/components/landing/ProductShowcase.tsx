"use client";

import { motion } from "motion/react";
import Image from "next/image";
import productImage from "../../../public/images/landing/product-image.png";

const ProductShowcase = () => {
  return (
    <section
      className="py-24 bg-gradient-to-b from-[#ffffff] to-[#D2DCFF] overflow-x-clip"
      id="product-showcase"
    >
      <motion.div
        className="centered-layout flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-text-primary mb-5 bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
          Turn Feedback into Features&nbsp;
        </h2>
        <p className="text-lg tracking-tight mb-10 max-w-[500px]">
          See how teams use InsightFlow to prioritize feedback, make data-driven
          decisions, and deliver features their users actually want.
        </p>
        <Image src={productImage} alt="product image" className="rounded-md" />
      </motion.div>
    </section>
  );
};

export default ProductShowcase;
