import { Train, Phone, CreditCard, Download } from "lucide-react";

const QuickReferenceCard = () => {
  const references = [
    {
      icon: Train,
      label: "UW Station",
      value: "Light Rail on Campus",
      color: "text-blue-600 bg-blue-100",
    },
    {
      icon: Phone,
      label: "SafeRide",
      value: "206-685-SAFE",
      color: "text-red-600 bg-red-100",
    },
    {
      icon: CreditCard,
      label: "ORCA Help",
      value: "888-988-6722",
      color: "text-green-600 bg-green-100",
    },
    {
      icon: Download,
      label: "Get App",
      value: "OneBusAway",
      color: "text-purple-600 bg-purple-100",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-primary/5 to-accent/10 rounded-2xl border border-primary/20 p-5 md:p-6">
      <h3 className="font-bold text-lg mb-4 text-center">📌 Quick Reference</h3>
      <div className="grid grid-cols-2 gap-3">
        {references.map((ref) => (
          <div key={ref.label} className="bg-card rounded-xl p-3 text-center shadow-sm">
            <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${ref.color} mb-2`}>
              <ref.icon className="h-5 w-5" />
            </div>
            <p className="text-xs text-muted-foreground">{ref.label}</p>
            <p className="text-sm font-medium truncate">{ref.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickReferenceCard;
