import { 
  GraduationCap, ArrowLeft, CreditCard, Bus, User, MapPin, Users,
  Library, Dumbbell, Coffee, Monitor, Heart, 
  Smartphone, Shield, MessageCircle, Train,
  Phone, Building, Globe, Brain,
  CheckCircle, Compass, AlertTriangle
} from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChecklistItem from "@/components/campus/ChecklistItem";
import LocationCard from "@/components/campus/LocationCard";
import ResourceCard from "@/components/campus/ResourceCard";
import EmergencyContact from "@/components/campus/EmergencyContact";

const firstWeekChecklist = [
  {
    title: "Get Your Husky Card",
    description: "Your official UW ID. Needed for building access, library, gym, transit, and more. Get it at the Husky Card Office in Schmitz Hall.",
    icon: CreditCard,
    priority: "high" as const,
  },
  {
    title: "Activate Your U-Pass",
    description: "Free unlimited transit on buses and light rail! Activate through your MyUW account within the first week.",
    icon: Bus,
    priority: "high" as const,
  },
  {
    title: "Set Up MyUW Account",
    description: "Your portal for class registration, grades, email, and all UW services. Use your UW NetID to log in.",
    icon: User,
    priority: "high" as const,
  },
  {
    title: "Find Your Classrooms",
    description: "Do a campus walk-through before classes start. The UW campus is big – know where you're going!",
    icon: MapPin,
    priority: "medium" as const,
  },
  {
    title: "Join Student Organizations",
    description: "Over 1,000 clubs at UW! Check out the Student Activities Office or attend the RSO Fair to find your community.",
    icon: Users,
    priority: "medium" as const,
  },
];

const campusLocations = [
  {
    name: "Odegaard Library",
    description: "24/7 undergraduate library with group study rooms, computer labs, and the popular UW Starbucks.",
    icon: Library,
    hours: "24 hours (during quarters)",
    location: "Central Campus",
    color: "purple" as const,
  },
  {
    name: "Suzzallo Library",
    description: "The iconic 'Harry Potter' library. Beautiful reading room, quiet study spaces, and research resources.",
    icon: Library,
    hours: "7am - 11pm",
    location: "Red Square",
    color: "purple" as const,
  },
  {
    name: "IMA (Intramural Activities)",
    description: "State-of-the-art gym with pools, climbing wall, basketball courts, and fitness classes. Free for students!",
    icon: Dumbbell,
    hours: "6am - 11pm",
    location: "East Campus",
    color: "green" as const,
  },
  {
    name: "Suzzallo Espresso",
    description: "Cozy café in Suzzallo Library. Great coffee and snacks for study sessions.",
    icon: Coffee,
    hours: "7:30am - 6pm",
    location: "Suzzallo Library",
    color: "gold" as const,
  },
  {
    name: "HUB (Husky Union Building)",
    description: "Student center with food court, study lounges, bowling alley, and student org offices.",
    icon: Building,
    hours: "7am - 11pm",
    location: "Central Campus",
    color: "gold" as const,
  },
  {
    name: "Computer Labs",
    description: "Multiple labs across campus with printing, scanning, and software. Odegaard and Mary Gates Hall are popular.",
    icon: Monitor,
    hours: "Varies by location",
    location: "Multiple buildings",
    color: "blue" as const,
  },
  {
    name: "Hall Health Center",
    description: "Primary care, mental health, pharmacy, and health education. Most services covered by student insurance.",
    icon: Heart,
    hours: "8am - 5pm (M-F)",
    location: "North Campus",
    color: "green" as const,
  },
  {
    name: "Quiet Study: Allen Library",
    description: "North wing has dedicated quiet floors. Perfect for focused studying and research.",
    icon: Library,
    hours: "8am - 10pm",
    location: "Next to Suzzallo",
    color: "purple" as const,
  },
];

const appsAndResources = [
  {
    name: "MyUW Mobile App",
    description: "Access classes, grades, campus map, and bus schedules on the go.",
    icon: Smartphone,
    type: "app" as const,
  },
  {
    name: "UW SafeCampus",
    description: "Report safety concerns, access emergency resources, and get real-time alerts.",
    icon: Shield,
    type: "app" as const,
  },
  {
    name: "Transit App / OneBusAway",
    description: "Real-time bus arrivals and trip planning for Seattle transit.",
    icon: Train,
    type: "app" as const,
  },
  {
    name: "UW International WeChat Groups",
    description: "Connect with other international students. Search 'UW Class of [Year]' groups.",
    icon: MessageCircle,
    type: "social" as const,
  },
  {
    name: "Canvas (Learning Platform)",
    description: "Where professors post assignments, lectures, and grades. Check daily!",
    icon: Monitor,
    type: "website" as const,
  },
  {
    name: "ISS Website",
    description: "International Student Services portal for visa info, events, and resources.",
    icon: Globe,
    type: "website" as const,
  },
];

const emergencyContacts = [
  {
    name: "UW Police Department",
    phone: "206-543-0507",
    description: "24/7 campus police for emergencies. Call 911 for life-threatening emergencies.",
    icon: Phone,
    urgent: true,
  },
  {
    name: "Hall Health Center",
    phone: "206-685-1011",
    description: "Medical appointments and health advice during business hours.",
    icon: Heart,
    urgent: false,
  },
  {
    name: "International Student Services",
    phone: "206-543-1250",
    description: "Visa questions, travel signatures, and international student support.",
    icon: Globe,
    urgent: false,
  },
  {
    name: "Counseling Center",
    phone: "206-543-1240",
    description: "Free mental health counseling for students. Crisis support available.",
    icon: Brain,
    urgent: false,
  },
  {
    name: "SafeCampus 24/7 Helpline",
    phone: "206-685-7233",
    description: "Report concerns, get advice, or talk to someone any time.",
    icon: Shield,
    urgent: false,
  },
];

const CampusLife = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="hero-gradient py-16 md:py-20">
          <div className="container">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-foreground/10 backdrop-blur">
                <GraduationCap className="h-7 w-7 text-primary-foreground" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground">
                Campus Life Essentials
              </h1>
            </div>
            <p className="text-lg text-primary-foreground/80 max-w-2xl">
              Everything you need to know to hit the ground running at UW. From your first week tasks to emergency contacts.
            </p>
          </div>
        </section>

        {/* First Week Checklist */}
        <section className="py-14 md:py-20 bg-background">
          <div className="container">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle className="h-6 w-6 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold">First Week Checklist</h2>
            </div>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              Complete these tasks in your first week to set yourself up for success. High priority items first!
            </p>

            <div className="grid gap-4 max-w-3xl">
              {firstWeekChecklist.map((item) => (
                <ChecklistItem key={item.title} {...item} />
              ))}
            </div>
          </div>
        </section>

        {/* Essential Campus Locations */}
        <section className="py-14 md:py-20 bg-purple-light">
          <div className="container">
            <div className="flex items-center gap-3 mb-3">
              <Compass className="h-6 w-6 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold">Essential Campus Locations</h2>
            </div>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              Know where to study, work out, get help, and grab coffee. These are the spots you'll visit most.
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
              <h2 className="text-2xl md:text-3xl font-bold">Useful Apps & Resources</h2>
            </div>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              Download these apps and bookmark these sites. They'll make your UW life much easier.
            </p>

            <div className="grid md:grid-cols-2 gap-4 max-w-4xl">
              {appsAndResources.map((resource) => (
                <ResourceCard key={resource.name} {...resource} />
              ))}
            </div>
          </div>
        </section>

        {/* Emergency Contacts */}
        <section className="py-14 md:py-20 bg-muted">
          <div className="container">
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle className="h-6 w-6 text-destructive" />
              <h2 className="text-2xl md:text-3xl font-bold">Emergency Contacts</h2>
            </div>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              Save these numbers in your phone. You might never need them, but it's important to have them.
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
                  <h3 className="text-2xl font-bold text-red-900">For Life-Threatening Emergencies</h3>
                  <p className="text-4xl font-mono font-bold text-red-600">Call 911</p>
                  <p className="text-sm text-red-700 mt-1">Police, Fire, Medical emergencies – available 24/7</p>
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
              <h3 className="font-semibold text-lg mb-2">Pro Tip for International Students</h3>
              <p className="text-sm text-muted-foreground">
                Visit the International Student Services (ISS) office in Schmitz Hall during your first week. 
                They can help with visa questions, cultural adjustment, and connecting you with other international students.
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
