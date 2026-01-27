import { Home, Utensils, GraduationCap, Bus } from "lucide-react";
import FeatureCard from "./FeatureCard";

const features = [
  {
    title: "Housing Guide",
    description: "Find safe neighborhoods and apartment recommendations near campus. Tips on rental processes and what to look for.",
    icon: Home,
    href: "/housing",
    color: "purple" as const,
  },
  {
    title: "Food & Dining",
    description: "Discover restaurants near campus sorted by cuisine type. From authentic Asian food to budget-friendly options.",
    icon: Utensils,
    href: "/food",
    color: "gold" as const,
  },
  {
    title: "Campus Life",
    description: "Navigate essential facilities, find study spots, join student organizations, and learn insider tips.",
    icon: GraduationCap,
    href: "/campus",
    color: "purple" as const,
  },
  {
    title: "Getting Around",
    description: "Master Seattle transportation with U-Pass info, bus routes, light rail tips, and bike-friendly paths.",
    icon: Bus,
    href: "/transport",
    color: "gold" as const,
  },
];

const FeaturesSection = () => {
  return (
    <section id="guides" className="py-16 md:py-24 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">
          <h2 
            className="text-responsive-lg font-bold mb-4 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            Everything You Need to Know
          </h2>
          <p 
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in px-4"
            style={{ animationDelay: "0.2s" }}
          >
            We've gathered the essential information to help you settle in quickly and make the most of your time at UW.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              {...feature}
              delay={0.3 + index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
