import { cn } from "@/lib/utils";

interface TransportAppCardProps {
  name: string;
  description: string;
  icon: string;
  isMustHave?: boolean;
}

const TransportAppCard = ({ name, description, icon, isMustHave }: TransportAppCardProps) => {
  return (
    <div className={cn(
      "relative p-5 rounded-2xl bg-card border shadow-sm hover:shadow-card transition-all text-center",
      isMustHave ? "border-primary/50 ring-2 ring-primary/20" : "border-border"
    )}>
      {isMustHave && (
        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-xs font-semibold px-2 py-0.5 rounded-full bg-primary text-primary-foreground">
          MUST HAVE
        </span>
      )}
      <span className="text-4xl mb-3 block">{icon}</span>
      <h3 className="font-semibold mb-1">{name}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default TransportAppCard;
