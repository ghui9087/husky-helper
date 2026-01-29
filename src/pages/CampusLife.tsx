import { 
  GraduationCap, ArrowLeft, CreditCard, Bus, User, MapPin, Users,
  Library, Dumbbell, Coffee, Monitor, Heart, 
  Smartphone, Shield, MessageCircle, Train,
  Phone, Building, Globe, Brain,
  CheckCircle, Compass, AlertTriangle, Camera, Sparkles, HeartHandshake, Podcast
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChecklistItem from "@/components/campus/ChecklistItem";
import LocationCard from "@/components/campus/LocationCard";
import ResourceCard from "@/components/campus/ResourceCard";
import EmergencyContact from "@/components/campus/EmergencyContact";
import uwCampusHero from "@/assets/uw-campus-hero.jpg";
import uwSuzzalloLibrary from "@/assets/uw-suzzallo-library.jpg";
import uwRedSquare from "@/assets/uw-red-square.jpg";

const CampusLife = () => {
  const { t } = useTranslation();

  const firstWeekChecklist = [
    {
      title: t("campusLife.firstWeek.huskyCard"),
      description: t("campusLife.firstWeek.huskyCardDesc"),
      icon: CreditCard,
      priority: "high" as const,
    },
    {
      title: t("campusLife.firstWeek.upass"),
      description: t("campusLife.firstWeek.upassDesc"),
      icon: Bus,
      priority: "high" as const,
    },
    {
      title: t("campusLife.firstWeek.myuw"),
      description: t("campusLife.firstWeek.myuwDesc"),
      icon: User,
      priority: "high" as const,
    },
    {
      title: t("campusLife.firstWeek.classrooms"),
      description: t("campusLife.firstWeek.classroomsDesc"),
      icon: MapPin,
      priority: "medium" as const,
    },
    {
      title: t("campusLife.firstWeek.clubs"),
      description: t("campusLife.firstWeek.clubsDesc"),
      icon: Users,
      priority: "medium" as const,
    },
  ];

  const campusLocations = [
    {
      name: t("campusLife.locations.odegaard"),
      description: t("campusLife.locations.odegaardDesc"),
      icon: Library,
      hours: "24 hours",
      location: "Central Campus",
      color: "purple" as const,
    },
    {
      name: t("campusLife.locations.suzzallo"),
      description: t("campusLife.locations.suzzalloDesc"),
      icon: Library,
      hours: "7am - 11pm",
      location: "Red Square",
      color: "purple" as const,
    },
    {
      name: t("campusLife.locations.ima"),
      description: t("campusLife.locations.imaDesc"),
      icon: Dumbbell,
      hours: "6am - 11pm",
      location: "East Campus",
      color: "green" as const,
    },
    {
      name: t("campusLife.locations.espresso"),
      description: t("campusLife.locations.espressoDesc"),
      icon: Coffee,
      hours: "7:30am - 6pm",
      location: "Suzzallo Library",
      color: "gold" as const,
    },
    {
      name: t("campusLife.locations.hub"),
      description: t("campusLife.locations.hubDesc"),
      icon: Building,
      hours: "7am - 11pm",
      location: "Central Campus",
      color: "gold" as const,
    },
    {
      name: t("campusLife.locations.labs"),
      description: t("campusLife.locations.labsDesc"),
      icon: Monitor,
      hours: "Varies",
      location: "Multiple",
      color: "blue" as const,
    },
    {
      name: t("campusLife.locations.health"),
      description: t("campusLife.locations.healthDesc"),
      icon: Heart,
      hours: "8am - 5pm",
      location: "North Campus",
      color: "green" as const,
    },
    {
      name: t("campusLife.locations.allen"),
      description: t("campusLife.locations.allenDesc"),
      icon: Library,
      hours: "8am - 10pm",
      location: "Next to Suzzallo",
      color: "purple" as const,
    },
  ];

  const appsAndResources = [
    {
      name: t("campusLife.apps.myuwApp"),
      description: t("campusLife.apps.myuwAppDesc"),
      icon: Smartphone,
      type: "app" as const,
    },
    {
      name: t("campusLife.apps.safeCampus"),
      description: t("campusLife.apps.safeCampusDesc"),
      icon: Shield,
      type: "app" as const,
    },
    {
      name: t("campusLife.apps.transit"),
      description: t("campusLife.apps.transitDesc"),
      icon: Train,
      type: "app" as const,
    },
    {
      name: t("campusLife.apps.wechat"),
      description: t("campusLife.apps.wechatDesc"),
      icon: MessageCircle,
      type: "social" as const,
    },
    {
      name: t("campusLife.apps.canvas"),
      description: t("campusLife.apps.canvasDesc"),
      icon: Monitor,
      type: "website" as const,
    },
    {
      name: t("campusLife.apps.iss"),
      description: t("campusLife.apps.issDesc"),
      icon: Globe,
      type: "website" as const,
    },
  ];

  const emergencyContacts = [
    {
      name: t("campusLife.emergency.police"),
      phone: "206-543-0507",
      description: t("campusLife.emergency.policeDesc"),
      icon: Phone,
      urgent: true,
    },
    {
      name: t("campusLife.emergency.hallHealth"),
      phone: "206-685-1011",
      description: t("campusLife.emergency.hallHealthDesc"),
      icon: Heart,
      urgent: false,
    },
    {
      name: t("campusLife.emergency.issContact"),
      phone: "206-543-1250",
      description: t("campusLife.emergency.issContactDesc"),
      icon: Globe,
      urgent: false,
    },
    {
      name: t("campusLife.emergency.counseling"),
      phone: "206-543-1240",
      description: t("campusLife.emergency.counselingDesc"),
      icon: Brain,
      urgent: false,
    },
    {
      name: t("campusLife.emergency.safeCampusLine"),
      phone: "206-685-7233",
      description: t("campusLife.emergency.safeCampusLineDesc"),
      icon: Shield,
      urgent: false,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section with Campus Image */}
        <section className="relative">
          {/* Hero Image */}
          <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
            <img 
              src={uwCampusHero} 
              alt="University of Washington Campus with cherry blossoms" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-primary/80" />
            
            {/* Hero Content Overlay */}
            <div className="absolute inset-0 flex items-center">
              <div className="container">
                <Link 
                  to="/" 
                  className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {t("common.backToHome")}
                </Link>
                
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
                    <GraduationCap className="h-6 w-6 md:h-7 md:w-7 text-white" />
                  </div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                    {t("campusLife.title")}
                  </h1>
                </div>
                <p className="text-base md:text-lg text-white/90 max-w-2xl">
                  {t("campusLife.subtitle")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* First Week Checklist */}
        <section className="py-14 md:py-20 bg-background">
          <div className="container">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle className="h-6 w-6 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold">{t("campusLife.firstWeek.title")}</h2>
            </div>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              {t("campusLife.firstWeek.subtitle")}
            </p>

            <div className="grid gap-4 max-w-3xl">
              {firstWeekChecklist.map((item) => (
                <ChecklistItem key={item.title} {...item} />
              ))}
            </div>
          </div>
        </section>

        {/* Campus Gallery Section */}
        <section className="py-12 md:py-16 bg-muted/50">
          <div className="container">
            <div className="flex items-center gap-3 mb-3">
              <Camera className="h-6 w-6 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold">{t("campusLife.scenery.title")}</h2>
            </div>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              {t("campusLife.scenery.subtitle")}
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="group relative rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src={uwSuzzalloLibrary} 
                  alt="Suzzallo Library Reading Room" 
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-semibold text-lg">{t("campusLife.scenery.suzzallo")}</h3>
                  <p className="text-sm text-white/80">{t("campusLife.scenery.suzzalloDesc")}</p>
                </div>
              </div>

              <div className="group relative rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src={uwRedSquare} 
                  alt="Red Square and Drumheller Fountain" 
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-semibold text-lg">{t("campusLife.scenery.redSquare")}</h3>
                  <p className="text-sm text-white/80">{t("campusLife.scenery.redSquareDesc")}</p>
                </div>
              </div>
            </div>

            {/* Interactive Map Link */}
            <div className="mt-8 p-6 bg-card rounded-2xl border border-border shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-lg mb-1">{t("campusLife.scenery.mapTitle")}</h3>
                  <p className="text-sm text-muted-foreground">{t("campusLife.scenery.mapSubtitle")}</p>
                </div>
                <a
                  href="https://www.washington.edu/maps/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  <MapPin className="h-4 w-4" />
                  {t("campusLife.scenery.openMap")}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Essential Campus Locations */}
        <section className="py-14 md:py-20 bg-purple-light">
          <div className="container">
            <div className="flex items-center gap-3 mb-3">
              <Compass className="h-6 w-6 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold">{t("campusLife.locations.title")}</h2>
            </div>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              {t("campusLife.locations.subtitle")}
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {campusLocations.map((location, index) => (
                <LocationCard key={location.name} {...location} delay={0.05 + index * 0.05} />
              ))}
            </div>
          </div>
        </section>

        {/* Apps & Resources */}
        <section className="py-14 md:py-20 bg-background">
          <div className="container">
            <div className="flex items-center gap-3 mb-3">
              <Smartphone className="h-6 w-6 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold">{t("campusLife.apps.title")}</h2>
            </div>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              {t("campusLife.apps.subtitle")}
            </p>

            <div className="grid md:grid-cols-2 gap-4 max-w-4xl">
              {appsAndResources.map((resource) => (
                <ResourceCard key={resource.name} {...resource} />
              ))}
            </div>
          </div>
        </section>

        {/* CIRCLE - International Student Resources */}
        <section className="py-14 md:py-20 bg-secondary/50">
          <div className="container">
            <div className="flex items-center gap-3 mb-3">
              <Sparkles className="h-6 w-6 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold">{t("campusLife.circle.title")}</h2>
            </div>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              {t("campusLife.circle.subtitle")}
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
              {/* Success & Well-being Coaching */}
              <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-sm hover:shadow-md transition-all">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 mb-4">
                  <HeartHandshake className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{t("campusLife.circle.coaching")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("campusLife.circle.coachingDesc")}
                </p>
              </div>

              {/* CIRCLE of Friends */}
              <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-sm hover:shadow-md transition-all">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 mb-4">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{t("campusLife.circle.friends")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("campusLife.circle.friendsDesc")}
                </p>
              </div>

              {/* Unite UW */}
              <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-sm hover:shadow-md transition-all">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 mb-4">
                  <Globe className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{t("campusLife.circle.uniteUW")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("campusLife.circle.uniteUWDesc")}
                </p>
              </div>

              {/* International Welcome Programs */}
              <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-sm hover:shadow-md transition-all">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-light mb-4">
                  <GraduationCap className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{t("campusLife.circle.iwp")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("campusLife.circle.iwpDesc")}
                </p>
              </div>

              {/* Global Leadership Series */}
              <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-sm hover:shadow-md transition-all">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{t("campusLife.circle.leadership")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("campusLife.circle.leadershipDesc")}
                </p>
              </div>

              {/* In the Loop Podcast */}
              <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-sm hover:shadow-md transition-all">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 mb-4">
                  <Podcast className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{t("campusLife.circle.podcast")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("campusLife.circle.podcastDesc")}
                </p>
              </div>
            </div>

            {/* CIRCLE Website Link */}
            <div className="p-6 bg-card rounded-2xl border border-border shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-lg mb-1">{t("campusLife.circle.visitTitle")}</h3>
                  <p className="text-sm text-muted-foreground">{t("campusLife.circle.visitSubtitle")}</p>
                </div>
                <a
                  href="https://www.washington.edu/circle/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  {t("campusLife.circle.visitButton")}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Contacts */}
        <section className="py-14 md:py-20 bg-muted">
          <div className="container">
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle className="h-6 w-6 text-destructive" />
              <h2 className="text-2xl md:text-3xl font-bold">{t("campusLife.emergency.title")}</h2>
            </div>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              {t("campusLife.emergency.subtitle")}
            </p>

            <div className="grid md:grid-cols-2 gap-4 max-w-4xl">
              {emergencyContacts.map((contact) => (
                <EmergencyContact key={contact.name} {...contact} />
              ))}
            </div>

            {/* 911 callout */}
            <div className="mt-8 p-6 rounded-2xl bg-red-100 border-2 border-red-300 max-w-4xl">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500 text-white">
                  <Phone className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-red-900">{t("campusLife.emergency.lifeThreatening")}</h3>
                  <p className="text-4xl font-mono font-bold text-red-600">{t("campusLife.emergency.call911")}</p>
                  <p className="text-sm text-red-700 mt-1">{t("campusLife.emergency.available247")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pro tip section */}
        <section className="py-10 bg-gold-light">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-3xl mb-3 block">💡</span>
              <h3 className="font-semibold text-lg mb-2">{t("campusLife.proTip.title")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("campusLife.proTip.content")}
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CampusLife;
