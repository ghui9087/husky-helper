import { MapPin, Clock, Bed, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ApartmentCardProps {
  name: string;
  address?: string;
  distance: string;
  walkTime?: string;
  rentRange: string;
  bedrooms?: string;
  description: string;
  image: string;
  websiteUrl?: string;
  availableNow?: boolean;
  delay?: number;
}

const ApartmentCard = ({
  name,
  address,
  distance,
  walkTime,
  rentRange,
  bedrooms,
  description,
  image,
  websiteUrl,
  availableNow = true,
  delay = 0,
}: ApartmentCardProps) => {
  return (
    <div
      className="group bg-card rounded-xl border border-border shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Image */}
      <div className="relative h-48 sm:h-52 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Overlay badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {availableNow && (
            <Badge className="bg-green-600 hover:bg-green-600 text-white text-xs font-medium">
              Available Now
            </Badge>
          )}
        </div>
        {bedrooms && (
          <div className="absolute bottom-3 right-3">
            <Badge variant="secondary" className="bg-background/95 backdrop-blur-sm text-foreground gap-1">
              <Bed className="h-3 w-3" />
              {bedrooms}
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title & Price Row */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-base font-semibold group-hover:text-primary transition-colors line-clamp-1 flex-1">
            {name}
          </h3>
          <span className="text-primary font-bold text-sm whitespace-nowrap">
            {rentRange}
          </span>
        </div>

        {/* Address */}
        {address && (
          <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
            {address}
          </p>
        )}

        {/* Info Row */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span>{distance}</span>
          </div>
          {walkTime && (
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 shrink-0" />
              <span>{walkTime} walk</span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-3">
          {description}
        </p>

        {/* Website Link */}
        {websiteUrl && (
          <a
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline font-medium"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            View Listing
          </a>
        )}
      </div>
    </div>
  );
};

export default ApartmentCard;
