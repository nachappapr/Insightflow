import FeaturesSection from "./Features";
import { Footer } from "./Footer";
import Header from "./Header";
import Hero from "./Hero";
import ProductShowcase from "./ProductShowcase";
import Testimonials from "./Testimonials";

const LandingWrapper = () => {
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
};

export default LandingWrapper;
