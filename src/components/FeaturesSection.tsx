import { Home, Utensils, GraduationCap, Bus } from "lucide-react";
import { useTranslation } from "react-i18next";
import FeatureCard from "./FeatureCard";

const FeaturesSection = () => {
  const { t } = useTranslation();

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

        {/* Features Grid */}
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
      </div>
    </section>
  );
};

export default FeaturesSection;
