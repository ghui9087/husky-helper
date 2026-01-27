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
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {references.map((ref) => (
        <div key={ref.label} className="bg-card rounded-2xl p-5 md:p-6 text-center shadow-sm border border-border/50 hover:shadow-md transition-shadow">
          <div className={`inline-flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-xl ${ref.color} mb-3`}>
            <ref.icon className="h-6 w-6 md:h-7 md:w-7" />
          </div>
          <p className="text-xs md:text-sm text-muted-foreground mb-1">{ref.label}</p>
          <p className="text-sm md:text-base font-semibold">{ref.value}</p>
        </div>
      ))}
    </div>
  );
};

export default QuickReferenceCard;
