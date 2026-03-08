import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, BookOpen, Home, UtensilsCrossed, Bus, Loader2, Bot, Send } from "lucide-react";
import OnboardingForm from "./OnboardingForm";
import { useHuskyChat } from "@/hooks/useHuskyChat";

interface Profile {
  full_name: string | null;
  country: string | null;
  program: string | null;
  start_quarter: string | null;
  budget_range: string | null;
}

const quickLinkKeys = [
  { icon: BookOpen, labelKey: "chat.campusLife", href: "/campus" },
  { icon: Home, labelKey: "chat.housingGuide", href: "/housing" },
  { icon: UtensilsCrossed, labelKey: "chat.foodGuide", href: "/food" },
  { icon: Bus, labelKey: "chat.transport", href: "/transport" },
];

const PersonalizedDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const { messages, isLoading, send } = useHuskyChat();
  const scrollRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!chatInput.trim() || isLoading) return;
    send(chatInput.trim());
    setChatInput("");
  };

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
          <CardContent className="text-center space-y-3 pb-6">
            <p className="text-lg text-foreground">
              Welcome <span className="font-bold text-primary">{profile.full_name}</span>! 🎉
            </p>
            <p className="text-muted-foreground text-sm">
              {profile.program} · {profile.start_quarter}
              {profile.country && <> · 🌍 {profile.country}</>}
              {profile.budget_range && <> · 💰 {profile.budget_range}</>}
            </p>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickLinkKeys.map(({ icon: Icon, labelKey, href }) => (
            <Card
              key={href}
              className="cursor-pointer border-border hover:border-primary/40 hover:shadow-md transition-all group"
              onClick={() => navigate(href)}
            >
              <CardContent className="flex flex-col items-center gap-2 p-4 sm:p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground text-center">{t(labelKey)}</span>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Chat Card */}
        <Card className="border-primary/20 shadow-lg overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-primary to-accent" />
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Bot className="h-5 w-5 text-primary" />
              {t('chat.huskyGuideAI')}
              <span className="ml-auto text-xs font-normal text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                ✨ Personalized
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div ref={scrollRef} className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {messages.length === 0 && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-xl px-4 py-2.5 text-sm bg-secondary text-foreground">
                    {t('chat.welcomeMessage')}
                  </div>
                </div>
              )}
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-4 py-2.5 text-sm ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-foreground"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))}
              {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-xl px-4 py-2.5 text-sm bg-secondary text-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Input
                placeholder={t('chat.placeholder')}
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1"
                disabled={isLoading}
              />
              <Button size="icon" onClick={handleSend} disabled={isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PersonalizedDashboard;
