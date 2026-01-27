import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface LocationCardProps {
  name: string;
  description: string;
  icon: LucideIcon;
  hours?: string;
  location?: string;
  color: "purple" | "gold" | "green" | "blue";
  delay?: number;
}

const LocationCard = ({ 
  name, 
  description, 
  icon: Icon, 
  hours, 
  location,
  color,
  delay = 0 
}: LocationCardProps) => {
  const getColorStyles = () => {
    switch (color) {
      case "purple":
        return "bg-secondary border-primary/10 hover:border-primary/30";
      case "gold":
        return "bg-gold-light border-accent/10 hover:border-accent/30";
      case "green":
        return "bg-green-50 border-green-200/50 hover:border-green-300";
      case "blue":
        return "bg-blue-50 border-blue-200/50 hover:border-blue-300";
    }
  };

  const getIconStyles = () => {
    switch (color) {
      case "purple":
        return "bg-primary/10 text-primary";
      case "gold":
        return "bg-accent/20 text-accent";
      case "green":
        return "bg-green-100 text-green-600";
      case "blue":
        return "bg-blue-100 text-blue-600";
    }
  };

  return (
    <div 
      className={cn(
        "p-5 rounded-2xl border transition-all duration-300 hover:shadow-md opacity-0 animate-fade-in-up",
        getColorStyles()
      )}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl mb-4", getIconStyles())}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="font-semibold text-lg mb-2">{name}</h3>
      <p className="text-sm text-muted-foreground mb-3">{description}</p>
      
      {(hours || location) && (
        <div className="space-y-1 text-xs">
          {hours && (
            <p className="text-muted-foreground">
              <span className="font-medium">Hours:</span> {hours}
            </p>
          )}
          {location && (
            <p className="text-muted-foreground">
              <span className="font-medium">Location:</span> {location}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationCard;
