import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface RentalTipProps {
  title: string;
  items: string[];
  icon: LucideIcon;
  variant: "check" | "warning" | "link";
  delay?: number;
}

const RentalTip = ({ title, items, icon: Icon, variant, delay = 0 }: RentalTipProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "check":
        return {
          bg: "bg-green-50 border-green-100",
          icon: "bg-green-100 text-green-600",
          bullet: "text-green-500",
        };
      case "warning":
        return {
          bg: "bg-orange-50 border-orange-100",
          icon: "bg-orange-100 text-orange-600",
          bullet: "text-orange-500",
        };
      case "link":
        return {
          bg: "bg-secondary border-primary/10",
          icon: "bg-primary/10 text-primary",
          bullet: "text-primary",
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div
      className={cn(
        "rounded-2xl border p-6 opacity-0 animate-fade-in-up",
        styles.bg
      )}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-start gap-4">
        <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", styles.icon)}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-3">{title}</h3>
          <ul className="space-y-2">
            {items.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className={cn("mt-1", styles.bullet)}>•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RentalTip;
