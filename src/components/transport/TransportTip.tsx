interface TransportTipProps {
  emoji: string;
  title: string;
  description: string;
}

const TransportTip = ({ emoji, title, description }: TransportTipProps) => {
  return (
    <div className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border/50 hover:shadow-sm transition-shadow">
      <span className="text-2xl shrink-0">{emoji}</span>
      <div>
        <h4 className="font-medium mb-0.5">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default TransportTip;
