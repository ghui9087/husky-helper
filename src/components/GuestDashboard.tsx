import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogIn, Send, Bot, BookOpen, Home, UtensilsCrossed, Bus, Sparkles } from "lucide-react";

const quickLinks = [
  { icon: BookOpen, label: "Campus Life", href: "/campus" },
  { icon: Home, label: "Housing Guide", href: "/housing" },
  { icon: UtensilsCrossed, label: "Food Guide", href: "/food" },
  { icon: Bus, label: "Transport", href: "/transport" },
];

const GuestDashboard = () => {
  const navigate = useNavigate();
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<{ role: "bot" | "user"; text: string }[]>([
    {
      role: "bot",
      text: "Hi! I'm HuskyGuide 🐾. I can help you explore UW resources. Log in to get advice tailored to your specific program and budget!",
    },
  ]);

  const handleSend = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setChatInput("");
    setMessages((prev) => [
      ...prev,
      { role: "user", text: userMsg },
      {
        role: "bot",
        text: "Hi! I'm HuskyGuide. Log in to get advice tailored to your specific program and budget! In the meantime, feel free to browse our guides above. 🐺",
      },
    ]);
  };

  return (
    <section className="py-10 sm:py-14">
      <div className="container max-w-4xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            🐺 Welcome to HuskyGuide
          </h2>
          <p className="text-muted-foreground">
            Browse general resources or sign in for a personalized experience
          </p>
        </div>

        {/* Quick Links Grid */}
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

        {/* AI Chat Card */}
        <Card className="border-primary/20 shadow-lg overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-primary to-accent" />
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Bot className="h-5 w-5 text-primary" />
              HuskyGuide AI
              <span className="ml-auto text-xs font-normal text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                Guest Mode
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
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <Input
                placeholder="Ask about UW life..."
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
              <p className="font-semibold text-foreground">Get Your Personalized Guide</p>
              <p className="text-sm text-muted-foreground">
                Sign in to save your progress and get tailored advice for your program, budget, and quarter.
              </p>
            </div>
            <Button variant="hero" size="lg" onClick={() => navigate("/auth")} className="shrink-0 gap-2">
              <LogIn className="h-4 w-4" />
              Sign In / Sign Up
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default GuestDashboard;
