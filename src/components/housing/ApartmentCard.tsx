import { MapPin, DollarSign, Building } from "lucide-react";

interface ApartmentCardProps {
  name: string;
  distance: string;
  rentRange: string;
  description: string;
  image: string;
  delay?: number;
}

const ApartmentCard = ({
  name,
  distance,
  rentRange,
  description,
  image,
  delay = 0,
}: ApartmentCardProps) => {
  return (
    <div
      className="group bg-card rounded-2xl border border-border/50 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-purple-medium">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-background/90 backdrop-blur-sm text-xs font-medium">
            <DollarSign className="h-3 w-3 text-accent" />
            {rentRange}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
          {name}
        </h3>
        
        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
          <MapPin className="h-4 w-4" />
          <span>{distance} from UW</span>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ApartmentCard;
