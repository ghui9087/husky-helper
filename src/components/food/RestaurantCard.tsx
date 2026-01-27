import { MapPin, DollarSign, Clock, Percent } from "lucide-react";
import { cn } from "@/lib/utils";

interface RestaurantCardProps {
  name: string;
  cuisine: string;
  priceRange: "$" | "$$" | "$$$";
  distance: string;
  distanceType: "walk" | "bus" | "drive";
  description: string;
  image: string;
  hasStudentDiscount?: boolean;
  delay?: number;
}

const RestaurantCard = ({
  name,
  cuisine,
  priceRange,
  distance,
  distanceType,
  description,
  image,
  hasStudentDiscount = false,
  delay = 0,
}: RestaurantCardProps) => {
  const getDistanceIcon = () => {
    switch (distanceType) {
      case "walk":
        return "🚶";
      case "bus":
        return "🚌";
      case "drive":
        return "🚗";
    }
  };

  const getPriceColor = () => {
    switch (priceRange) {
      case "$":
        return "text-green-600 bg-green-50";
      case "$$":
        return "text-amber-600 bg-amber-50";
      case "$$$":
        return "text-orange-600 bg-orange-50";
    }
  };

  return (
    <div
      className="group bg-card rounded-2xl border border-border/60 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Image */}
      <div className="relative h-40 sm:h-44 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 right-2 sm:right-3 flex justify-between items-start gap-2">
          <span className={cn("px-2 sm:px-2.5 py-1 rounded-full text-xs font-semibold shrink-0", getPriceColor())}>
            {priceRange}
          </span>
          {hasStudentDiscount && (
            <span className="flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-[10px] sm:text-xs font-medium">
              <Percent className="h-3 w-3" />
              <span className="hidden xs:inline">Student Discount</span>
              <span className="xs:hidden">Discount</span>
            </span>
          )}
        </div>

        {/* Cuisine tag */}
        <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3">
          <span className="px-2.5 py-1 rounded-full bg-background/90 backdrop-blur-sm text-xs font-medium">
            {cuisine}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <h3 className="text-base sm:text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-1">
          {name}
        </h3>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2 sm:mb-3">
          <span className="flex items-center gap-1">
            <span>{getDistanceIcon()}</span>
            <span>{distance}</span>
          </span>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>
    </div>
  );
};

export default RestaurantCard;
