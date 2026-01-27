import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChecklistItemProps {
  title: string;
  description: string;
  icon: LucideIcon;
  priority?: "high" | "medium" | "low";
}

const ChecklistItem = ({ title, description, icon: Icon, priority = "medium" }: ChecklistItemProps) => {
  const getPriorityStyles = () => {
    switch (priority) {
      case "high":
        return "border-l-primary bg-secondary/50";
      case "medium":
        return "border-l-accent bg-gold-light/50";
      case "low":
        return "border-l-muted-foreground/30 bg-muted/50";
    }
  };

  return (
    <div className={cn(
      "flex items-start gap-4 p-4 rounded-xl border-l-4 transition-all hover:shadow-sm",
      getPriorityStyles()
    )}>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-card shadow-sm">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div>
        <h4 className="font-medium mb-1">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default ChecklistItem;
