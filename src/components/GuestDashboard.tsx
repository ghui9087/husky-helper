import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogIn, Send, Bot, BookOpen, Home, UtensilsCrossed, Bus, Sparkles } from "lucide-react";

const quickLinkKeys = [
  { icon: BookOpen, labelKey: "chat.campusLife", href: "/campus" },
  { icon: Home, labelKey: "chat.housingGuide", href: "/housing" },
  { icon: UtensilsCrossed, labelKey: "chat.foodGuide", href: "/food" },
  { icon: Bus, labelKey: "chat.transport", href: "/transport" },
];

const GuestDashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<{ role: "bot" | "user"; textKey?: string; text?: string }[]>([
    { role: "bot", textKey: "chat.welcomeMessage" },
  ]);

  const handleSend = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setChatInput("");
    setMessages((prev) => [
      ...prev,
      { role: "user", text: userMsg },
      { role: "bot", textKey: "chat.guestReply" },
    ]);
  };

  return (
    <section className="py-10 sm:py-14">
      <div className="container max-w-4xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            {t('chat.welcomeToHuskyGuide')}
          </h2>
          <p className="text-muted-foreground">
            {t('chat.browseOrSignIn')}
          </p>
        </div>

        {/* Quick Links Grid */}
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
              <span className="ml-auto text-xs font-normal text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                {t('chat.guestMode')}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Messages */}
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-xl px-4 py-2.5 text-sm ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-foreground"
                    }`}
                  >
                    {msg.textKey ? t(msg.textKey) : msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <Input
                placeholder={t('chat.placeholder')}
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1"
              />
              <Button size="icon" onClick={handleSend}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* CTA to Log In */}
        <Card className="border-accent/30 bg-gradient-to-r from-accent/5 to-primary/5">
          <CardContent className="flex flex-col sm:flex-row items-center gap-4 p-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <p className="font-semibold text-foreground">{t('chat.getPersonalized')}</p>
              <p className="text-sm text-muted-foreground">
                {t('chat.signInCta')}
              </p>
            </div>
            <Button variant="hero" size="lg" onClick={() => navigate("/auth")} className="shrink-0 gap-2">
              <LogIn className="h-4 w-4" />
              {t('chat.signInSignUp')}
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default GuestDashboard;
