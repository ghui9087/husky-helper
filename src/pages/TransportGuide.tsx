import { 
  Bus, ArrowLeft, Train, Plane, MapPin, Smartphone,
  AlertCircle, CheckCircle, CreditCard, Bookmark
} from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RouteCard from "@/components/transport/RouteCard";
import TransportAppCard from "@/components/transport/TransportAppCard";
import QuickReferenceCard from "@/components/transport/QuickReferenceCard";
import TransportTip from "@/components/transport/TransportTip";
import ShuttleCard from "@/components/transport/ShuttleCard";

const popularRoutes = [
  {
    routeNumber: "44",
    routeName: "Ballard - U-District",
    description: "East-west route connecting Ballard to the Ave",
    frequency: "Every 10-15 min",
    usefulFor: ["Shopping", "Restaurants", "Ballard nightlife"],
    type: "bus" as const,
  },
  {
    routeNumber: "48",
    routeName: "North-South through U-District",
    description: "Connects Mount Baker to UW and north to Loyal Heights",
    frequency: "Every 15 min",
    usefulFor: ["Columbia City", "Rainier Valley", "Grocery stores"],
    type: "bus" as const,
  },
  {
    routeNumber: "70",
    routeName: "Downtown to Campus",
    description: "Direct route from downtown Seattle to UW campus",
    frequency: "Every 10-12 min",
    usefulFor: ["Downtown Seattle", "South Lake Union", "Events"],
    type: "bus" as const,
  },
  {
    routeNumber: "73",
    routeName: "Jackson Park - Downtown",
    description: "Runs through campus connecting north Seattle to downtown",
    frequency: "Every 15-20 min",
    usefulFor: ["Northgate", "Lake City", "Shopping"],
    type: "bus" as const,
  },
  {
    routeNumber: "372",
    routeName: "UW to Bothell",
    description: "Connects UW Seattle to UW Bothell campus",
    frequency: "Every 30 min",
    usefulFor: ["UW Bothell", "Lake Forest Park", "Kenmore"],
    type: "bus" as const,
  },
  {
    routeNumber: "1 Line",
    routeName: "Link Light Rail",
    description: "Rapid transit from Lynnwood to SeaTac Airport",
    frequency: "Every 6-10 min",
    usefulFor: ["Airport", "Downtown", "Capitol Hill", "Northgate"],
    type: "rail" as const,
  },
];

const transportApps = [
  { name: "OneBusAway", description: "Real-time bus arrivals and alerts", icon: "🚌", isMustHave: true },
  { name: "Transit App", description: "Trip planning with multiple modes", icon: "🗺️", isMustHave: false },
  { name: "Google Maps", description: "Navigation and transit directions", icon: "📍", isMustHave: false },
  { name: "Uber/Lyft", description: "Rideshare backup option", icon: "🚗", isMustHave: false },
];

const transportTips = [
  { emoji: "💳", title: "Tap Every Time", description: "Tap your Husky Card when boarding buses and at Light Rail stations. It's free but required!" },
  { emoji: "🛑", title: "Request Your Stop", description: "Pull the yellow cord or push the red button near your stop. The bus won't stop automatically." },
  { emoji: "📴", title: "Download Offline", description: "Save bus schedules and maps offline for areas with poor signal." },
  { emoji: "🌙", title: "Night Safety", description: "Stick to well-lit routes after dark. Use NightRide shuttle or travel with friends." },
  { emoji: "🚲", title: "Bike Share", description: "Lime bikes are scattered around campus. Great for short trips when the bus isn't coming." },
  { emoji: "🎧", title: "Stay Aware", description: "Keep one earbud out and stay alert, especially at night or in unfamiliar areas." },
];

const shuttleServices = [
  {
    name: "NightRide",
    description: "Free evening shuttle service around campus and nearby areas",
    hours: "6:00 PM - 2:00 AM (during quarters)",
    howToUse: "Call 206-685-RIDE or use the TransLoc app",
    color: "bg-purple-50 border-purple-200",
  },
  {
    name: "Health Sciences Express",
    description: "Connects main campus to UW Medical Center",
    hours: "7:00 AM - 6:00 PM weekdays",
    howToUse: "Pick up at HUB or Health Sciences building",
    color: "bg-blue-50 border-blue-200",
  },
];

const TransportGuide = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 py-12 md:py-20">
          <div className="container">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            
            {/* Save Tip */}
            <div className="flex items-center gap-2 mb-6 px-3 py-2 bg-white/10 backdrop-blur rounded-lg w-fit">
              <Bookmark className="h-4 w-4 text-white" />
              <span className="text-sm text-white/90">Save this page - screenshot the routes you use most!</span>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
                <Bus className="h-7 w-7 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                Getting Around Seattle
              </h1>
            </div>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl">
              Your Husky Card is your free transit pass. Buses, trains, streetcars – all included with your tuition!
            </p>
          </div>
        </section>

        {/* U-Pass Activation Card */}
        <section className="py-10 bg-green-50 border-b border-green-200">
          <div className="container">
            <div className="bg-white rounded-2xl border-2 border-green-300 shadow-lg p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-green-100">
                  <CreditCard className="h-8 w-8 text-green-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl md:text-2xl font-bold text-green-900 mb-2">Your U-Pass = FREE Unlimited Transit!</h2>
                  <p className="text-green-700 mb-4">
                    As a UW student, your Husky Card works as an unlimited transit pass. It covers King County Metro buses, 
                    Link Light Rail, Sound Transit, Seattle Streetcar, and Water Taxi.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 text-sm bg-green-100 text-green-800 px-3 py-1.5 rounded-full">
                      <CheckCircle className="h-4 w-4" />
                      <span>Activate via MyUW</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm bg-green-100 text-green-800 px-3 py-1.5 rounded-full">
                      <CheckCircle className="h-4 w-4" />
                      <span>Tap at ORCA reader</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm bg-green-100 text-green-800 px-3 py-1.5 rounded-full">
                      <CheckCircle className="h-4 w-4" />
                      <span>Valid during enrolled quarters</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Getting to Campus */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Getting to Campus</h2>
            <p className="text-muted-foreground mb-8">How to reach UW from major locations</p>

            <div className="grid md:grid-cols-3 gap-5">
              {/* From Airport */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border-2 border-blue-200 p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500 text-white">
                    <Plane className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold">From SeaTac Airport</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Train className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                    <span>Take Link Light Rail (1 Line) directly to UW Station</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <span><strong>FREE</strong> with your U-Pass!</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                    <span>~45 minutes, runs every 6-10 min</span>
                  </li>
                </ul>
              </div>

              {/* From Downtown */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200 p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white">
                    <Bus className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold">From Downtown Seattle</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Train className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                    <span>Light Rail: Westlake → UW Station (15 min)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Bus className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span>Bus 70, 71, 73: Multiple stops on campus</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                    <span>Frequent service during rush hours</span>
                  </li>
                </ul>
              </div>

              {/* From Neighborhoods */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200 p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-600 text-white">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold">From Nearby Areas</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="font-medium text-muted-foreground w-16 shrink-0">Northgate:</span>
                    <span>Light Rail (8 min)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-medium text-muted-foreground w-16 shrink-0">Ballard:</span>
                    <span>Bus 44 (20 min)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-medium text-muted-foreground w-16 shrink-0">Cap Hill:</span>
                    <span>Light Rail (6 min)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-medium text-muted-foreground w-16 shrink-0">Fremont:</span>
                    <span>Bus 31, 32 (15 min)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Routes */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Popular Student Routes</h2>
            <p className="text-muted-foreground mb-8">Routes you'll use most often – save these for quick reference!</p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {popularRoutes.map((route) => (
                <RouteCard key={route.routeNumber} {...route} />
              ))}
            </div>
          </div>
        </section>

        {/* Essential Apps Section */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Essential Apps</h2>
            <p className="text-muted-foreground mb-8">Download these before your first day</p>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {transportApps.map((app) => (
                <TransportAppCard key={app.name} {...app} />
              ))}
            </div>
          </div>
        </section>

        {/* Quick Reference Section */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center">📌 Quick Reference</h2>
            <p className="text-muted-foreground mb-8 text-center">Important contacts and info at your fingertips</p>
            
            <div className="max-w-3xl mx-auto">
              <QuickReferenceCard />
            </div>
          </div>
        </section>

        {/* Transportation Tips */}
        <section className="py-12 md:py-16 bg-secondary/30">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Tips for New Students</h2>
            <p className="text-muted-foreground mb-8">Transit etiquette and safety advice</p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {transportTips.map((tip) => (
                <TransportTip key={tip.title} {...tip} />
              ))}
            </div>
          </div>
        </section>

        {/* Campus Shuttles */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Campus Shuttle Services</h2>
            <p className="text-muted-foreground mb-8">Free shuttles operated by UW Transportation</p>

            <div className="grid md:grid-cols-2 gap-5 max-w-4xl">
              {shuttleServices.map((shuttle) => (
                <ShuttleCard key={shuttle.name} {...shuttle} />
              ))}
            </div>
          </div>
        </section>

        {/* Important Notice */}
        <section className="py-10 bg-gold-light">
          <div className="container">
            <div className="flex flex-col sm:flex-row items-start gap-4 max-w-3xl mx-auto">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <AlertCircle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">First Week Tip</h3>
                <p className="text-sm text-muted-foreground">
                  Activate your U-Pass through MyUW <strong>before</strong> your first bus ride. It takes 24-48 hours to activate. 
                  If you need to travel before activation, single-ride fares are $2.75 (pay with ORCA or credit card).
                </p>
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
