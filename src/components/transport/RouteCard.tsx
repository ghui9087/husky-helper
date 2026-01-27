import { Bus, Train, Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface RouteCardProps {
  routeNumber: string;
  routeName: string;
  description: string;
  frequency: string;
  usefulFor: string[];
  type: "bus" | "rail";
}

const RouteCard = ({ routeNumber, routeName, description, frequency, usefulFor, type }: RouteCardProps) => {
  const Icon = type === "rail" ? Train : Bus;
  const colorClass = type === "rail" ? "bg-blue-100 text-blue-700 border-blue-200" : "bg-green-100 text-green-700 border-green-200";
  const iconBgClass = type === "rail" ? "bg-blue-500" : "bg-green-600";

  return (
    <div className="bg-card rounded-2xl border border-border shadow-card hover:shadow-lg transition-all p-5">
      <div className="flex items-start gap-4 mb-4">
        <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white", iconBgClass)}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className={cn("text-sm font-bold px-2.5 py-0.5 rounded-full border", colorClass)}>
              {routeNumber}
            </span>
            <h3 className="font-semibold truncate">{routeName}</h3>
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
        <Clock className="h-4 w-4 text-primary" />
        <span>{frequency}</span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {usefulFor.map((use) => (
          <span 
            key={use} 
            className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
          >
            {use}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RouteCard;
