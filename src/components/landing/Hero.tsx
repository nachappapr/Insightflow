import { ArrowRight } from "lucide-react";
import Image from "next/image";
import FeedbackCommentImage from "../../../public/images/landing/feedback-comments.png";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <section
      className="pt-8 pb-20 md:pt-5 md:pb-10 bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#4661E6,#F7F8FD_60%)] overflow-x-clip"
      id="hero"
    >
      <div className="centered-layout">
        <div className="md:flex items-center justify-between">
          <div className="md:flex-1">
            <h1 className="text-5xl font-bold tracking-tighter text-text-primary md:text-6xl lg:text-7xl/none bg-gradient-to-b from-brand-primary to-brand-secondary bg-clip-text text-transparent mt-6">
              Make better products with user feedback
            </h1>
            <p className="max-w-[600px] text-xl tracking-tight mt-6">
              Transform your product development with our powerful feedback
              management platform. Prioritize, track, and implement user
              feedback efficiently.
            </p>
            <div className="flex items-center gap-1 mt-7">
              <Button variant="primaryAction">Get Started</Button>
              <Button
                variant="secondaryAction"
                className="text-white bg-linear-gradient-to-r from-[#4661E6] to-[#F7F8FD]"
              >
                Learn More <ArrowRight />
              </Button>
            </div>
          </div>

          <div className="mt-6 md:mt-0 md:h-[648px] md:flex-1 relative">
            <Image
              src={FeedbackCommentImage}
              alt="feedback comments"
              className="md:absolute md:h-full md:w-auto md:max-w-none md:-left-6 lg:left-0 animate-float rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
