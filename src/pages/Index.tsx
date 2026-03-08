import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CampusCarousel from "@/components/CampusCarousel";
import FeaturesSection from "@/components/FeaturesSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import GuestDashboard from "@/components/GuestDashboard";
import PersonalizedDashboard from "@/components/PersonalizedDashboard";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user, loading } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        {!loading && (user ? <PersonalizedDashboard /> : <GuestDashboard />)}
        <CampusCarousel />
        <FeaturesSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
