import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import dubsMascot from "@/assets/dubs-mascot.jpg";

const HeroBanner = () => {
  const { t } = useTranslation();

  const scrollToChat = () => {
    const chatSection = document.querySelector("[data-chat-section]");
    if (chatSection) {
      chatSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-primary">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary-foreground rounded-full blur-[100px]" />
      </div>

      <div className="container relative py-14 sm:py-20 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Mascot */}
          <div
            className="shrink-0 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.15s" }}>
            
            <div className="relative group">
              <div className="absolute -inset-3 rounded-full bg-accent/30 blur-xl transition-all duration-500 group-hover:bg-accent/50" />
              <img
                src={dubsMascot}
                alt="Dubs the Husky"
                className="relative w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 rounded-full object-cover border-4 border-accent/60 shadow-2xl transition-transform duration-500 group-hover:scale-105 group-hover:animate-wiggle" />
              
            </div>
          </div>

          {/* Text content */}
          <div className="text-center lg:text-left space-y-4 sm:space-y-5 flex-1">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-primary-foreground tracking-tight leading-tight opacity-0 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}>
              
              {t("heroBanner.headline")}
            </h2>
            <p
              className="text-base sm:text-lg lg:text-xl text-primary-foreground/80 max-w-2xl mx-auto lg:mx-0 text-balance opacity-0 animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}>
              
              {t("heroBanner.subtitle")}
            </p>
            <div
              className="pt-2 opacity-0 animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}>
              
              <Button
                variant="gold"
                size="xl"
                onClick={scrollToChat}
                className="font-bold text-lg gap-2">
                
                {t("heroBanner.startChat")}
                
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default HeroBanner;