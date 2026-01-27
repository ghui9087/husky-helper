import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResourceCardProps {
  name: string;
  description: string;
  icon: LucideIcon;
  type: "app" | "website" | "social";
}

const ResourceCard = ({ name, description, icon: Icon, type }: ResourceCardProps) => {
  const getTypeLabel = () => {
    switch (type) {
      case "app":
        return { label: "📱 App", bg: "bg-blue-50 text-blue-700" };
      case "website":
        return { label: "🌐 Website", bg: "bg-green-50 text-green-700" };
      case "social":
        return { label: "💬 Social", bg: "bg-purple-50 text-purple-700" };
    }
  };

  const typeInfo = getTypeLabel();

  return (
    <div className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border/50 hover:shadow-md transition-all">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-medium truncate">{name}</h4>
          <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium shrink-0", typeInfo.bg)}>
            {typeInfo.label}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default ResourceCard;
