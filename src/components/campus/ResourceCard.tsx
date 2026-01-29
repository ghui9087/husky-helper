import { LucideIcon, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResourceCardProps {
  name: string;
  description: string;
  icon: LucideIcon;
  type: "app" | "website";
  link?: string;
}

const ResourceCard = ({ name, description, icon: Icon, type, link }: ResourceCardProps) => {
  const getTypeLabel = () => {
    switch (type) {
      case "app":
        return { label: "📱 App", bg: "bg-blue-50 text-blue-700" };
      case "website":
        return { label: "🌐 Website", bg: "bg-green-50 text-green-700" };
    }
  };

  const typeInfo = getTypeLabel();

  const content = (
    <div className={cn(
      "flex items-start gap-4 p-4 bg-card rounded-xl border border-border/50 transition-all",
      link && "hover:shadow-md hover:border-primary/30 cursor-pointer group"
    )}>
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className={cn(
            "font-medium truncate",
            link && "group-hover:text-primary transition-colors"
          )}>{name}</h4>
          <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium shrink-0", typeInfo.bg)}>
            {typeInfo.label}
          </span>
          {link && (
            <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
          )}
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    );
  }

  return content;
};

export default ResourceCard;
