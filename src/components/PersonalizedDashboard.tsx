import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, BookOpen, Home, UtensilsCrossed, Bus, Loader2 } from "lucide-react";
import OnboardingForm from "./OnboardingForm";

interface Profile {
  full_name: string | null;
  country: string | null;
  program: string | null;
  start_quarter: string | null;
  budget_range: string | null;
}

const quickLinks = [
  { icon: BookOpen, label: "Campus Life", href: "/campus" },
  { icon: Home, label: "Housing Guide", href: "/housing" },
  { icon: UtensilsCrossed, label: "Food Guide", href: "/food" },
  { icon: Bus, label: "Transport", href: "/transport" },
];

const PersonalizedDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);

  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, country, program, start_quarter, budget_range")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) {
        console.error("Error fetching profile:", error);
        setLoading(false);
        return;
      }

      if (!data || !data.full_name || !data.program) {
        setNeedsOnboarding(true);
      } else {
        setProfile(data);
      }
      setLoading(false);
    };
    fetchProfile();
  }, [user]);

  if (loading) {
    return (
      <section className="py-16">
        <div className="container flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  if (needsOnboarding) {
    return <OnboardingForm onComplete={(data) => {
      setProfile(data);
      setNeedsOnboarding(false);
    }} />;
  }

  if (!profile) return null;

  return (
    <section className="py-10 sm:py-14">
      <div className="container max-w-4xl space-y-8">
        {/* Welcome Card */}
        <Card className="border-primary/20 shadow-lg overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-primary to-accent" />
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <Sparkles className="h-7 w-7 text-primary" />
            </div>
            <CardTitle className="text-2xl sm:text-3xl">My Husky Dashboard</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-3 pb-8">
            <p className="text-lg text-foreground">
              Welcome <span className="font-bold text-primary">{profile.full_name}</span>! 🎉
            </p>
            <p className="text-muted-foreground text-base">
              We are preparing your tailored guide for{" "}
              <span className="font-semibold text-foreground">{profile.program}</span> in{" "}
              <span className="font-semibold text-foreground">{profile.start_quarter}</span>...
            </p>
            {profile.country && (
              <p className="text-sm text-muted-foreground">
                🌍 From <span className="font-medium text-foreground">{profile.country}</span>
                {profile.budget_range && <> · 💰 Budget: {profile.budget_range}</>}
              </p>
            )}
            <div className="pt-3 flex justify-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0s" }} />
              <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.15s" }} />
              <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.3s" }} />
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickLinks.map(({ icon: Icon, label, href }) => (
            <Card
              key={href}
              className="cursor-pointer border-border hover:border-primary/40 hover:shadow-md transition-all group"
              onClick={() => navigate(href)}
            >
              <CardContent className="flex flex-col items-center gap-2 p-4 sm:p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground text-center">{label}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PersonalizedDashboard;
