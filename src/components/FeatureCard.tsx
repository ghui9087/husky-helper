import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  color: "purple" | "gold";
  delay?: number;
}

const FeatureCard = ({ title, description, icon: Icon, href, color, delay = 0 }: FeatureCardProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "group relative flex flex-col p-5 sm:p-6 rounded-2xl bg-card border border-border/60",
        "shadow-card hover:shadow-card-hover transition-all duration-300",
        "hover:-translate-y-1 opacity-0 animate-fade-in-up",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      )}
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Icon */}
      <div
        className={cn(
          "flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl mb-4 sm:mb-5 transition-transform duration-300 group-hover:scale-110",
          color === "purple" ? "bg-secondary" : "bg-gold-light"
        )}
      >
        <Icon
          className={cn(
            "h-6 w-6 sm:h-7 sm:w-7",
            color === "purple" ? "text-primary" : "text-accent"
          )}
        />
      </div>

      {/* Content */}
      <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed flex-1">
        {description}
      </p>

      {/* Arrow indicator */}
      <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
        <span>Explore</span>
        <svg
          className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>

      {/* Hover border effect */}
      <div
        className={cn(
          "absolute inset-0 rounded-2xl border-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none",
          color === "purple" ? "border-primary/20" : "border-accent/30"
        )}
      />
    </Link>
  );
};

export default FeatureCard;
