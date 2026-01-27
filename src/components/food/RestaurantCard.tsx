import { MapPin, Percent, Globe, UtensilsCrossed } from "lucide-react";
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
  websiteUrl?: string;
  menuUrl?: string;
  googleMapsUrl: string;
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
  websiteUrl,
  menuUrl,
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

  // Format Google Maps URL with proper API format
  const googleMapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + ' Seattle WA')}`;
  
  // Menu search URL fallback
  const menuSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(name + ' Seattle menu')}`;

  return (
    <div
      className="group bg-card rounded-2xl border border-border/60 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden opacity-0 animate-fade-in-up flex flex-col"
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
      <div className="p-4 sm:p-5 flex-1 flex flex-col">
        <h3 className="text-base sm:text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-1">
          {name}
        </h3>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2 sm:mb-3">
          <span className="flex items-center gap-1">
            <span>{getDistanceIcon()}</span>
            <span>{distance}</span>
          </span>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
          {description}
        </p>

        {/* Action Buttons - Simple <a> tags */}
        <div className="flex flex-col gap-2 mt-auto pt-2">
          {/* Primary row: Maps + Website */}
          <div className="flex gap-2">
            {/* Google Maps Button */}
            <a
              href={googleMapsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 h-10 px-3 text-xs sm:text-sm font-medium rounded-lg border border-input bg-background hover:bg-secondary hover:border-primary/30 transition-all"
            >
              <MapPin className="h-4 w-4 text-red-500" />
              <span className="hidden sm:inline">View on Maps</span>
              <span className="sm:hidden">Maps</span>
            </a>
            
            {/* Website Button */}
            {websiteUrl && (
              <a
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 h-10 px-3 text-xs sm:text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] transition-all"
              >
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">Visit Website</span>
                <span className="sm:hidden">Website</span>
              </a>
            )}
          </div>

          {/* Menu Button */}
          {menuUrl ? (
            <a
              href={menuUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-1.5 h-9 px-3 text-xs sm:text-sm font-medium rounded-lg bg-secondary text-secondary-foreground hover:bg-accent/20 transition-all"
            >
              <UtensilsCrossed className="h-4 w-4" />
              View Menu
            </a>
          ) : !websiteUrl && (
            <a
              href={menuSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-1.5 h-9 px-3 text-xs sm:text-sm font-medium rounded-lg bg-secondary text-secondary-foreground hover:bg-accent/20 transition-all"
            >
              <UtensilsCrossed className="h-4 w-4" />
              Find Menu
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
