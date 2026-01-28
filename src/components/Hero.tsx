import { ArrowDown, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import dubsMascot from "@/assets/dubs-mascot.jpg";

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 hero-gradient opacity-[0.03]" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-48 md:w-72 h-48 md:h-72 bg-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-64 md:w-96 h-64 md:h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container relative py-12 sm:py-16 md:py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-5 sm:space-y-6 px-2 lg:px-0">
            {/* Badge */}
            <div 
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-gold-light border border-accent/20 text-sm font-medium text-accent-foreground opacity-0 animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              <Sparkles className="h-4 w-4 text-accent" />
              <span>Made by students, for students</span>
            </div>

            {/* UW Slogan */}
            <div 
              className="opacity-0 animate-fade-in"
              style={{ animationDelay: "0.15s" }}
            >
              <p className="text-lg sm:text-xl font-semibold text-primary italic">
                "Be Boundless"
              </p>
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
              className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 text-balance opacity-0 animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              A student-created resource to help international students navigate Seattle 
              and UW campus life. Find housing, discover great food, and make the most 
              of your Husky experience.
            </p>

            {/* Go Dawgs tagline */}
            <div 
              className="opacity-0 animate-fade-in-up"
              style={{ animationDelay: "0.35s" }}
            >
              <p className="text-2xl sm:text-3xl font-bold text-primary">
                🐺 Go Dawgs!
              </p>
            </div>

            {/* CTA Buttons */}
            <div 
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-2 opacity-0 animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <Button variant="hero" size="lg" className="w-full sm:w-auto" asChild>
                <a href="#guides">
                  Explore Guides
                  <ArrowDown className="h-4 w-4 ml-1" />
                </a>
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
                <Link to="/campus">Start with Campus Life</Link>
              </Button>
            </div>
          </div>

          {/* Right Content - Dubs Image with Animation */}
          <div 
            className="relative opacity-0 animate-fade-in-up order-first lg:order-last"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="relative mx-auto max-w-sm lg:max-w-md group">
              {/* Decorative ring */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20 blur-2xl transition-all duration-500 group-hover:from-primary/30 group-hover:via-accent/20 group-hover:to-primary/30" />
              
              {/* Image container with hover animation */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-primary/20 transition-all duration-300 group-hover:shadow-primary/25 group-hover:shadow-3xl group-hover:border-primary/40">
                <img 
                  src={dubsMascot} 
                  alt="Dubs the Husky - UW Mascot" 
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105 group-hover:animate-wiggle"
                />
                {/* Caption overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 to-transparent p-4 transition-all duration-300 group-hover:from-primary/95">
                  <p className="text-white text-center font-semibold text-lg transition-transform duration-300 group-hover:scale-105">
                    Meet Dubs 🐾
                  </p>
                  <p className="text-white/80 text-center text-sm">
                    Our beloved UW mascot
                  </p>
                </div>
              </div>
              
              {/* Hover hint */}
              <p className="text-center text-xs text-muted-foreground mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Woof! Go Dawgs! 🐕
              </p>
            </div>
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