import { Users, Heart, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const AboutSection = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-16 md:py-24 bg-purple-light">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-responsive-lg font-bold mb-4">
              {t("about.title")}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground px-4">
              {t("about.subtitle")}
            </p>
          </div>

          {/* Stats/Values */}
          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 mb-10 md:mb-12">
            <div className="text-center p-5 sm:p-6 bg-card rounded-2xl shadow-card border border-border/50">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary mx-auto mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{t("about.byStudents")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("about.byStudentsDesc")}
              </p>
            </div>
            <div className="text-center p-5 sm:p-6 bg-card rounded-2xl shadow-card border border-border/50">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-light mx-auto mb-4">
                <Heart className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{t("about.community")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("about.communityDesc")}
              </p>
            </div>
            <div className="text-center p-5 sm:p-6 bg-card rounded-2xl shadow-card border border-border/50">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary mx-auto mb-4">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{t("about.updated")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("about.updatedDesc")}
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center p-6 sm:p-8 rounded-2xl bg-card shadow-card border border-border/50">
            <p className="text-muted-foreground mb-4">
              {t("about.contactPrompt")}
            </p>
            <a 
              href="mailto:wxy95929@uw.edu" 
              className="inline-flex items-center text-primary font-medium hover:underline"
            >
              {t("about.getInTouch")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
