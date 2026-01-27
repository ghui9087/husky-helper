import { ArrowDown, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 hero-gradient opacity-[0.03]" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-48 md:w-72 h-48 md:h-72 bg-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-64 md:w-96 h-64 md:h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container relative py-16 sm:py-20 md:py-28 lg:py-36">
        <div className="max-w-3xl mx-auto text-center space-y-6 sm:space-y-8 px-2">
          {/* Badge */}
          <div 
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-gold-light border border-accent/20 text-sm font-medium text-accent-foreground opacity-0 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <Sparkles className="h-4 w-4 text-accent" />
            <span>Made by students, for students</span>
          </div>

          {/* Heading */}
          <h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Welcome to <span className="text-primary">UW</span>
            <br className="hidden sm:block" />
            <span className="sm:hidden"> – </span>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Your Campus Survival Guide
            </span>
          </h1>

          {/* Subtitle */}
          <p 
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance opacity-0 animate-fade-in-up px-2"
            style={{ animationDelay: "0.3s" }}
          >
            A student-created resource to help international students navigate Seattle 
            and UW campus life. Find housing, discover great food, and make the most 
            of your Husky experience.
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2 sm:pt-4 opacity-0 animate-fade-in-up px-4"
            style={{ animationDelay: "0.4s" }}
          >
            <Button variant="hero" size="lg" className="w-full sm:w-auto" asChild>
              <a href="#guides">
                Explore Guides
                <ArrowDown className="h-4 w-4 ml-1" />
              </a>
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
              <Link to="/housing">Start with Housing</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0 50C240 100 480 0 720 50C960 100 1200 0 1440 50V100H0V50Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
