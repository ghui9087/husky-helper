import { Home, Utensils, GraduationCap, Bus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useRef, useEffect, useCallback } from "react";
import FeatureCard from "./FeatureCard";
import { cn } from "@/lib/utils";

const FeaturesSection = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      title: t("features.campusLife.title"),
      description: t("features.campusLife.description"),
      icon: GraduationCap,
      link: "/campus",
      color: "text-primary",
      bgColor: "bg-secondary",
    },
    {
      title: t("features.housing.title"),
      description: t("features.housing.description"),
      icon: Home,
      link: "/housing",
      color: "text-accent",
      bgColor: "bg-gold-light",
    },
    {
      title: t("features.food.title"),
      description: t("features.food.description"),
      icon: Utensils,
      link: "/food",
      color: "text-primary",
      bgColor: "bg-secondary",
    },
    {
      title: t("features.transport.title"),
      description: t("features.transport.description"),
      icon: Bus,
      link: "/transport",
      color: "text-accent",
      bgColor: "bg-gold-light",
    },
  ];

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / features.length;
    const index = Math.round(el.scrollLeft / cardWidth);
    setActiveIndex(Math.min(index, features.length - 1));
  }, [features.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !isMobile) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [isMobile, handleScroll]);

  return (
    <section id="guides" className="py-16 md:py-24 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">
          <h2
            className="text-responsive-lg font-bold mb-4 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            {t("features.title")}
          </h2>
          <p
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in px-4"
            style={{ animationDelay: "0.2s" }}
          >
            {t("features.subtitle")}
          </p>
        </div>

        {/* Mobile: horizontal scroll carousel */}
        {isMobile ? (
          <div className="space-y-4">
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 -mx-4"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {features.map((feature, index) => (
                <div
                  key={feature.link}
                  className="snap-center shrink-0"
                  style={{ width: "75vw" }}
                >
                  <FeatureCard
                    {...feature}
                    delay={0.3 + index * 0.1}
                    learnMoreText={t("features.learnMore")}
                  />
                </div>
              ))}
            </div>
            {/* Dot indicators */}
            <div className="flex justify-center gap-2">
              {features.map((_, index) => (
                <button
                  key={index}
                  aria-label={`Go to card ${index + 1}`}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    activeIndex === index
                      ? "w-6 bg-primary"
                      : "w-2 bg-muted-foreground/30"
                  )}
                  onClick={() => {
                    const el = scrollRef.current;
                    if (!el) return;
                    const cardWidth = el.scrollWidth / features.length;
                    el.scrollTo({ left: cardWidth * index, behavior: "smooth" });
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Desktop: 4-column grid */
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.link}
                {...feature}
                delay={0.3 + index * 0.1}
                learnMoreText={t("features.learnMore")}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturesSection;
