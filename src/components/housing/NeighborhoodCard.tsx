import { Shield, Clock, DollarSign, ThumbsUp, ThumbsDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface NeighborhoodCardProps {
  name: string;
  description: string;
  safetyRating: number;
  distance: string;
  priceRange: string;
  pros: string[];
  cons: string[];
  delay?: number;
}

const NeighborhoodCard = ({
  name,
  description,
  safetyRating,
  distance,
  priceRange,
  pros,
  cons,
  delay = 0,
}: NeighborhoodCardProps) => {
  const getSafetyColor = (rating: number) => {
    if (rating >= 4) return "text-green-600 bg-green-50";
    if (rating >= 3) return "text-yellow-600 bg-yellow-50";
    return "text-orange-600 bg-orange-50";
  };

  return (
    <div
      className="group bg-card rounded-2xl border border-border/50 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Header */}
      <div className="p-6 pb-4">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>

      {/* Stats */}
      <div className="px-6 pb-4 grid grid-cols-3 gap-3">
        <div className={cn("flex flex-col items-center p-3 rounded-xl", getSafetyColor(safetyRating))}>
          <Shield className="h-4 w-4 mb-1" />
          <span className="text-xs font-medium">Safety</span>
          <span className="text-sm font-bold">{safetyRating}/5</span>
        </div>
        <div className="flex flex-col items-center p-3 rounded-xl bg-secondary">
          <Clock className="h-4 w-4 mb-1 text-primary" />
          <span className="text-xs font-medium text-muted-foreground">Distance</span>
          <span className="text-sm font-bold text-foreground">{distance}</span>
        </div>
        <div className="flex flex-col items-center p-3 rounded-xl bg-gold-light">
          <DollarSign className="h-4 w-4 mb-1 text-accent" />
          <span className="text-xs font-medium text-muted-foreground">Rent</span>
          <span className="text-sm font-bold text-foreground">{priceRange}</span>
        </div>
      </div>

      {/* Pros & Cons */}
      <div className="px-6 pb-6 grid grid-cols-2 gap-4">
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <ThumbsUp className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">Pros</span>
          </div>
          <ul className="space-y-1">
            {pros.map((pro, idx) => (
              <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1.5">
                <span className="text-green-500 mt-0.5">•</span>
                {pro}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <ThumbsDown className="h-4 w-4 text-orange-500" />
            <span className="text-sm font-medium text-orange-600">Cons</span>
          </div>
          <ul className="space-y-1">
            {cons.map((con, idx) => (
              <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1.5">
                <span className="text-orange-400 mt-0.5">•</span>
                {con}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NeighborhoodCard;
