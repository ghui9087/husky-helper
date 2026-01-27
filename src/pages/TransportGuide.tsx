import { 
  Bus, ArrowLeft, Train, Bike, Car, CreditCard, 
  Clock, MapPin, Smartphone, DollarSign, AlertCircle, CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const transportOptions = [
  {
    title: "U-Pass (Free Transit)",
    icon: CreditCard,
    color: "bg-green-50 border-green-200",
    iconColor: "text-green-600 bg-green-100",
    description: "Your Husky Card doubles as unlimited transit pass!",
    details: [
      "Activate through MyUW in your first week",
      "Works on all King County Metro buses",
      "Works on Link Light Rail",
      "Works on Sound Transit buses",
      "Valid during enrolled quarters only",
    ],
    tip: "Don't forget to tap your card when boarding!",
  },
  {
    title: "Link Light Rail",
    icon: Train,
    color: "bg-blue-50 border-blue-200",
    iconColor: "text-blue-600 bg-blue-100",
    description: "Fast, reliable way to get around Seattle.",
    details: [
      "UW Station is right on campus",
      "Direct to downtown Seattle (15 min)",
      "Connect to airport (45 min)",
      "Northgate for shopping (8 min)",
      "Runs every 6-10 minutes peak hours",
    ],
    tip: "The 1 Line connects UW to Capitol Hill, Downtown, and Sea-Tac Airport.",
  },
  {
    title: "Metro Buses",
    icon: Bus,
    color: "bg-purple-50 border-purple-200",
    iconColor: "text-primary bg-secondary",
    description: "Extensive network covering all of Seattle.",
    details: [
      "Routes 44, 48, 49 are most useful for students",
      "Route 372 connects U-District to Northgate",
      "Night Owl service for late nights",
      "Real-time tracking via OneBusAway app",
      "Most buses have bike racks",
    ],
    tip: "Download Transit or OneBusAway app for real-time arrivals.",
  },
  {
    title: "Biking",
    icon: Bike,
    color: "bg-gold-light border-accent/30",
    iconColor: "text-accent bg-gold-light",
    description: "Great for short trips and exercise.",
    details: [
      "Burke-Gilman Trail runs through campus",
      "Lime and LINK bikes available for rent",
      "Bike lanes on most major streets",
      "Free bike parking on campus",
      "Seattle is hilly – plan routes wisely!",
    ],
    tip: "Helmet required by law in King County. Many students use e-bikes for hills.",
  },
];

const usefulApps = [
  { name: "OneBusAway", desc: "Real-time bus arrivals", icon: "🚌" },
  { name: "Transit App", desc: "Trip planning & alerts", icon: "🗺️" },
  { name: "Google Maps", desc: "Directions & transit routes", icon: "📍" },
  { name: "Lime / LINK", desc: "Bike & scooter rentals", icon: "🚲" },
];

const commonRoutes = [
  { from: "UW Campus", to: "Downtown Seattle", method: "Light Rail", time: "15 min" },
  { from: "UW Campus", to: "Capitol Hill", method: "Light Rail", time: "6 min" },
  { from: "UW Campus", to: "U-Village", method: "Bus 75", time: "10 min" },
  { from: "UW Campus", to: "Sea-Tac Airport", method: "Light Rail", time: "45 min" },
  { from: "UW Campus", to: "Northgate Mall", method: "Light Rail", time: "8 min" },
];

const TransportGuide = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 py-16 md:py-20">
          <div className="container">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
                <Bus className="h-7 w-7 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                Getting Around
              </h1>
            </div>
            <p className="text-lg text-white/90 max-w-2xl">
              Navigate Seattle like a local. Your U-Pass gives you free unlimited transit – here's how to use it.
            </p>
          </div>
        </section>

        {/* U-Pass Highlight */}
        <section className="py-10 bg-green-50 border-b border-green-200">
          <div className="container">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-100">
                <CreditCard className="h-7 w-7 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-green-900 mb-1">Your U-Pass = Free Transit!</h2>
                <p className="text-green-700">
                  As a UW student, you get unlimited rides on buses and light rail included with your tuition. 
                  Activate it through MyUW in your first week.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Transport Options */}
        <section className="py-14 md:py-20 bg-background">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Transportation Options</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {transportOptions.map((option, index) => (
                <div 
                  key={option.title}
                  className={`p-5 sm:p-6 rounded-2xl border-2 ${option.color} opacity-0 animate-fade-in-up`}
                  style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${option.iconColor}`}>
                      <option.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{option.title}</h3>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-2 mb-4">
                    {option.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-white/60">
                    <AlertCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <p className="text-sm text-muted-foreground"><strong>Tip:</strong> {option.tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Common Routes */}
        <section className="py-14 md:py-20 bg-purple-light">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Common Routes</h2>
            <p className="text-muted-foreground mb-8">Quick reference for getting to popular destinations.</p>
            
            <div className="bg-card rounded-2xl border border-border shadow-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px]">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left p-4 font-medium text-sm">From</th>
                      <th className="text-left p-4 font-medium text-sm">To</th>
                      <th className="text-left p-4 font-medium text-sm">How</th>
                      <th className="text-left p-4 font-medium text-sm">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commonRoutes.map((route, idx) => (
                      <tr key={idx} className="border-b border-border/50 last:border-0">
                        <td className="p-4 text-sm">{route.from}</td>
                        <td className="p-4 text-sm font-medium">{route.to}</td>
                        <td className="p-4 text-sm text-muted-foreground">{route.method}</td>
                        <td className="p-4 text-sm">
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-secondary text-xs font-medium">
                            <Clock className="h-3 w-3" />
                            {route.time}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Useful Apps */}
        <section className="py-14 md:py-20 bg-background">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Useful Apps</h2>
            <p className="text-muted-foreground mb-8">Download these for easy navigation around Seattle.</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {usefulApps.map((app) => (
                <div 
                  key={app.name}
                  className="p-4 sm:p-5 rounded-2xl bg-card border border-border shadow-sm hover:shadow-card transition-shadow text-center"
                >
                  <span className="text-3xl mb-3 block">{app.icon}</span>
                  <h3 className="font-medium mb-1">{app.name}</h3>
                  <p className="text-xs text-muted-foreground">{app.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Safety Tips */}
        <section className="py-10 bg-gold-light">
          <div className="container">
            <h2 className="text-xl font-semibold mb-6 text-center">Transit Safety Tips</h2>
            <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <div className="bg-card rounded-xl p-4 sm:p-5 shadow-sm text-center">
                <span className="text-2xl mb-2 block">🌙</span>
                <h3 className="font-medium mb-1">Late Nights</h3>
                <p className="text-sm text-muted-foreground">Use Husky NightWalk for campus escorts. Call 206-685-WALK.</p>
              </div>
              <div className="bg-card rounded-xl p-4 sm:p-5 shadow-sm text-center">
                <span className="text-2xl mb-2 block">📱</span>
                <h3 className="font-medium mb-1">Stay Aware</h3>
                <p className="text-sm text-muted-foreground">Keep belongings close and stay alert, especially at night.</p>
              </div>
              <div className="bg-card rounded-xl p-4 sm:p-5 shadow-sm text-center">
                <span className="text-2xl mb-2 block">🚨</span>
                <h3 className="font-medium mb-1">Emergency</h3>
                <p className="text-sm text-muted-foreground">Text or call 911. UW Police: 206-543-0507.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TransportGuide;
