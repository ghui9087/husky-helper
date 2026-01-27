import { LucideIcon, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmergencyContactProps {
  name: string;
  phone?: string;
  description: string;
  icon: LucideIcon;
  urgent?: boolean;
}

const EmergencyContact = ({ name, phone, description, icon: Icon, urgent = false }: EmergencyContactProps) => {
  return (
    <div className={cn(
      "flex items-center gap-4 p-4 rounded-xl border transition-all",
      urgent 
        ? "bg-red-50 border-red-200 hover:border-red-300" 
        : "bg-card border-border/50 hover:border-border"
    )}>
      <div className={cn(
        "flex h-12 w-12 shrink-0 items-center justify-center rounded-full",
        urgent ? "bg-red-100" : "bg-secondary"
      )}>
        <Icon className={cn("h-6 w-6", urgent ? "text-red-600" : "text-primary")} />
      </div>
      <div className="flex-1">
        <h4 className={cn("font-semibold", urgent && "text-red-900")}>{name}</h4>
        {phone && (
          <a 
            href={`tel:${phone.replace(/[^0-9]/g, '')}`}
            className={cn(
              "text-lg font-mono font-bold hover:underline",
              urgent ? "text-red-600" : "text-primary"
            )}
          >
            {phone}
          </a>
        )}
        <p className={cn("text-sm", urgent ? "text-red-700/80" : "text-muted-foreground")}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default EmergencyContact;
