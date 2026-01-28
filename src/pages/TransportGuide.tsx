import { 
  Bus, ArrowLeft, Train, Plane, MapPin, Smartphone,
  AlertCircle, CheckCircle, CreditCard, Bookmark
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RouteCard from "@/components/transport/RouteCard";
import TransportAppCard from "@/components/transport/TransportAppCard";
import QuickReferenceCard from "@/components/transport/QuickReferenceCard";
import TransportTip from "@/components/transport/TransportTip";
import ShuttleCard from "@/components/transport/ShuttleCard";
import seattleLightRail from "@/assets/seattle-light-rail.jpg";

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
  const { t } = useTranslation();

  const transportTips = [
    { emoji: "💳", title: t("transport.tips.tap"), description: t("transport.tips.tapDesc") },
    { emoji: "🛑", title: t("transport.tips.stop"), description: t("transport.tips.stopDesc") },
    { emoji: "📴", title: t("transport.tips.offline"), description: t("transport.tips.offlineDesc") },
    { emoji: "🌙", title: t("transport.tips.night"), description: t("transport.tips.nightDesc") },
    { emoji: "🚲", title: t("transport.tips.bike"), description: t("transport.tips.bikeDesc") },
    { emoji: "🎧", title: t("transport.tips.aware"), description: t("transport.tips.awareDesc") },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section with Image */}
        <section className="relative">
          <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
            <img 
              src={seattleLightRail} 
              alt="Seattle Light Rail at UW Station" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-blue-600/70 via-blue-500/50 to-blue-600/80" />
            
            <div className="absolute inset-0 flex items-center">
              <div className="container">
                <Link 
                  to="/" 
                  className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {t("common.backToHome")}
                </Link>
                
                {/* Save Tip */}
                <div className="flex items-center gap-2 mb-4 px-3 py-2 bg-white/10 backdrop-blur rounded-lg w-fit">
                  <Bookmark className="h-4 w-4 text-white" />
                  <span className="text-sm text-white/90">{t("transport.saveTip")}</span>
                </div>

                <div className="flex items-center gap-4 mb-3">
                  <div className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
                    <Bus className="h-6 w-6 md:h-7 md:w-7 text-white" />
                  </div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                    {t("transport.title")}
                  </h1>
                </div>
                <p className="text-base md:text-lg text-white/90 max-w-2xl">
                  {t("transport.subtitle")}
                </p>
              </div>
            </div>
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
                  <h2 className="text-xl md:text-2xl font-bold text-green-900 mb-2">{t("transport.upass.title")}</h2>
                  <p className="text-green-700 mb-4">
                    {t("transport.upass.description")}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 text-sm bg-green-100 text-green-800 px-3 py-1.5 rounded-full">
                      <CheckCircle className="h-4 w-4" />
                      <span>{t("transport.upass.activate")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm bg-green-100 text-green-800 px-3 py-1.5 rounded-full">
                      <CheckCircle className="h-4 w-4" />
                      <span>{t("transport.upass.tap")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm bg-green-100 text-green-800 px-3 py-1.5 rounded-full">
                      <CheckCircle className="h-4 w-4" />
                      <span>{t("transport.upass.valid")}</span>
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
            <h2 className="text-2xl md:text-3xl font-bold mb-3">{t("transport.gettingToCampus.title")}</h2>
            <p className="text-muted-foreground mb-8">{t("transport.gettingToCampus.subtitle")}</p>

            <div className="grid md:grid-cols-3 gap-5">
              {/* From Airport */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border-2 border-blue-200 p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500 text-white">
                    <Plane className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold">{t("transport.gettingToCampus.fromAirport")}</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Train className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                    <span>{t("transport.gettingToCampus.airportTip")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <span><strong>{t("transport.gettingToCampus.airportFree")}</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                    <span>{t("transport.gettingToCampus.airportTime")}</span>
                  </li>
                </ul>
              </div>

              {/* From Downtown */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200 p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white">
                    <Bus className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold">{t("transport.gettingToCampus.fromDowntown")}</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Train className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                    <span>{t("transport.gettingToCampus.downtownRail")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Bus className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span>{t("transport.gettingToCampus.downtownBus")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                    <span>{t("transport.gettingToCampus.downtownFreq")}</span>
                  </li>
                </ul>
              </div>

              {/* From Neighborhoods */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200 p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-600 text-white">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold">{t("transport.gettingToCampus.fromNearby")}</h3>
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
            <h2 className="text-2xl md:text-3xl font-bold mb-3">{t("transport.routes.title")}</h2>
            <p className="text-muted-foreground mb-8">{t("transport.routes.subtitle")}</p>

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
            <h2 className="text-2xl md:text-3xl font-bold mb-3">{t("transport.apps.title")}</h2>
            <p className="text-muted-foreground mb-8">{t("transport.apps.subtitle")}</p>
            
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
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center">{t("transport.quickRef.title")}</h2>
            <p className="text-muted-foreground mb-8 text-center">{t("transport.quickRef.subtitle")}</p>
            
            <div className="max-w-3xl mx-auto">
              <QuickReferenceCard />
            </div>
          </div>
        </section>

        {/* Transportation Tips */}
        <section className="py-12 md:py-16 bg-secondary/30">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">{t("transport.tips.title")}</h2>
            <p className="text-muted-foreground mb-8">{t("transport.tips.subtitle")}</p>

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
            <h2 className="text-2xl md:text-3xl font-bold mb-3">{t("transport.shuttles.title")}</h2>
            <p className="text-muted-foreground mb-8">{t("transport.shuttles.subtitle")}</p>

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
                <h3 className="font-semibold mb-2">{t("transport.firstWeekTip.title")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("transport.firstWeekTip.content")}
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
