import FeaturesSection from "@/components/landing/Features";
import { Footer } from "@/components/landing/Footer";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import ProductShowcase from "@/components/landing/ProductShowcase";
import Testimonials from "@/components/landing/Testimonials";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <ProductShowcase />
      <FeaturesSection />
      <Testimonials />
      <Footer />
    </>
  );
}
