import { Bus, Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShuttleCardProps {
  name: string;
  description: string;
  hours: string;
  howToUse: string;
  color: string;
}

const ShuttleCard = ({ name, description, hours, howToUse, color }: ShuttleCardProps) => {
  return (
    <div className={cn("rounded-2xl border-2 p-5", color)}>
      <div className="flex items-start gap-4 mb-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/80 shadow-sm">
          <Bus className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold mb-1">{name}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>{hours}</span>
        </div>
        <div className="flex items-start gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
          <span>{howToUse}</span>
        </div>
      </div>
    </div>
  );
};

export default ShuttleCard;
