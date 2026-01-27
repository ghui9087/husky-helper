import { Home, MapPin, CheckCircle, AlertTriangle, ExternalLink, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NeighborhoodCard from "@/components/housing/NeighborhoodCard";
import ApartmentCard from "@/components/housing/ApartmentCard";
import RentalTip from "@/components/housing/RentalTip";

const neighborhoods = [
  {
    name: "University District (U-District)",
    description: "The heart of student life. Walking distance to campus with tons of restaurants and shops.",
    safetyRating: 3.5,
    distance: "5-15 min walk",
    priceRange: "$1,200-2,000",
    pros: ["Walking distance to campus", "Lots of food options", "Student-friendly vibe", "Light rail access"],
    cons: ["Can be noisy", "Street parking difficult", "Some areas less safe at night"],
  },
  {
    name: "Roosevelt",
    description: "A quieter residential neighborhood with great light rail access to campus.",
    safetyRating: 4,
    distance: "10-15 min by bus",
    priceRange: "$1,400-2,200",
    pros: ["Quieter than U-District", "Light rail station", "Good grocery stores", "Family-friendly"],
    cons: ["Further from campus", "Less nightlife", "Fewer student amenities"],
  },
  {
    name: "Northgate",
    description: "Affordable option with a major mall and direct light rail connection to UW.",
    safetyRating: 4,
    distance: "20 min by light rail",
    priceRange: "$1,100-1,800",
    pros: ["More affordable", "Direct light rail", "Northgate Mall", "Newer apartments"],
    cons: ["Further commute", "Less walkable", "Fewer restaurants nearby"],
  },
  {
    name: "Capitol Hill",
    description: "Seattle's vibrant, diverse neighborhood with great food and nightlife scenes.",
    safetyRating: 3.5,
    distance: "15-20 min by bus",
    priceRange: "$1,500-2,500",
    pros: ["Vibrant nightlife", "Diverse community", "Great food scene", "Light rail access"],
    cons: ["Higher rent", "Parking is expensive", "Can be crowded", "Longer commute"],
  },
];

const apartments = [
  {
    name: "UW Tower Apartments",
    distance: "2 min walk",
    rentRange: "$1,400-1,800/mo",
    description: "High-rise living right next to campus. Popular with graduate students. Includes utilities and internet.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
  },
  {
    name: "The Apex",
    distance: "5 min walk",
    rentRange: "$1,200-1,600/mo",
    description: "Modern student apartments with study rooms, fitness center, and rooftop deck. U-District location.",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
  },
  {
    name: "Roosevelt Studios",
    distance: "12 min by light rail",
    rentRange: "$1,100-1,500/mo",
    description: "Quiet studio and 1-bedroom units near Roosevelt station. Great for students who prefer peace.",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
  },
  {
    name: "AVA U-District",
    distance: "8 min walk",
    rentRange: "$1,600-2,200/mo",
    description: "Upscale apartments with modern amenities, pet-friendly, and great building community.",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
  },
  {
    name: "Northgate Commons",
    distance: "18 min by light rail",
    rentRange: "$1,000-1,400/mo",
    description: "Budget-friendly option near Northgate Mall. Spacious units with parking included.",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop",
  },
  {
    name: "Pine Street Lofts",
    distance: "20 min by bus",
    rentRange: "$1,400-1,900/mo",
    description: "Capitol Hill living with character. Historic building with modern updates and rooftop views.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
  },
];

const checklistItems = [
  "Check for water damage, mold, and pest issues",
  "Test all appliances, faucets, and outlets",
  "Verify heating/cooling systems work properly",
  "Document existing damage with photos before move-in",
  "Understand what's included (utilities, internet, parking)",
  "Ask about the lease break policy and subletting rules",
];

const redFlags = [
  "Landlord asks for cash-only payments",
  "Pressure to sign immediately without viewing",
  "No written lease agreement provided",
  "Unusually low rent compared to area averages",
  "Landlord is hard to reach or evasive about questions",
  "Building appears poorly maintained",
];

const resources = [
  "Zillow, Apartments.com, Craigslist (be cautious)",
  "UW Off-Campus Housing Facebook groups",
  "UW Housing & Food Services resources",
  "Padmapper for map-based apartment searching",
  "Local property management companies",
];

const HousingGuide = () => {
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
                <Home className="h-7 w-7 text-primary-foreground" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground">
                Housing Guide
              </h1>
            </div>
            <p className="text-lg text-primary-foreground/80 max-w-2xl">
              Find safe neighborhoods, discover student-friendly apartments, and learn what to look for when renting in Seattle.
            </p>
          </div>
        </section>

        {/* Neighborhoods Section */}
        <section id="neighborhoods" className="py-16 md:py-20 bg-background">
          <div className="container">
            <div className="flex items-center gap-3 mb-3">
              <MapPin className="h-6 w-6 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold">Safe Neighborhoods</h2>
            </div>
            <p className="text-muted-foreground mb-10 max-w-2xl">
              Popular areas near UW where students typically live. Each has its own character and trade-offs.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {neighborhoods.map((neighborhood, index) => (
                <NeighborhoodCard
                  key={neighborhood.name}
                  {...neighborhood}
                  delay={0.1 + index * 0.1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Apartments Section */}
        <section id="apartments" className="py-16 md:py-20 bg-purple-light">
          <div className="container">
            <div className="flex items-center gap-3 mb-3">
              <Home className="h-6 w-6 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold">Popular Student Apartments</h2>
            </div>
            <p className="text-muted-foreground mb-10 max-w-2xl">
              These are commonly recommended by students. Prices are estimates and may vary.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {apartments.map((apartment, index) => (
                <ApartmentCard
                  key={apartment.name}
                  {...apartment}
                  delay={0.1 + index * 0.1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Rental Tips Section */}
        <section id="tips" className="py-16 md:py-20 bg-background">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Rental Tips</h2>
            <p className="text-muted-foreground mb-10 max-w-2xl">
              What to know before signing a lease. These tips can save you from common problems.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <RentalTip
                title="Before Signing"
                items={checklistItems}
                icon={CheckCircle}
                variant="check"
                delay={0.1}
              />
              <RentalTip
                title="Red Flags to Avoid"
                items={redFlags}
                icon={AlertTriangle}
                variant="warning"
                delay={0.2}
              />
              <RentalTip
                title="Where to Find Listings"
                items={resources}
                icon={ExternalLink}
                variant="link"
                delay={0.3}
              />
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="py-10 bg-muted">
          <div className="container">
            <p className="text-center text-sm text-muted-foreground max-w-3xl mx-auto">
              <strong>Disclaimer:</strong> This information is based on student experiences and is for reference only. 
              Prices, availability, and conditions may change. Always verify details independently before making any decisions.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HousingGuide;
