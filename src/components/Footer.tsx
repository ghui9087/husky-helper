import { MapPin, Mail, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const lastUpdated = "January 2026";

  const quickLinks = [
    { name: t("nav.housing"), href: "/housing" },
    { name: t("nav.food"), href: "/food" },
    { name: t("nav.campusLife"), href: "/campus" },
    { name: t("nav.transport"), href: "/transport" },
  ];

  const externalLinks = [
    { name: t("footer.uwOfficial"), href: "https://www.washington.edu" },
    { name: t("footer.myuw"), href: "https://my.uw.edu" },
    { name: t("footer.iss"), href: "https://iss.washington.edu" },
  ];

  return (
    <footer className="border-t border-border bg-secondary/30">
      {/* Main Footer Content */}
      <div className="container py-12 md:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 font-semibold text-lg mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg hero-gradient shadow-sm">
                <MapPin className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-foreground">UW Survival Guide</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {t("footer.description")}
            </p>
            <p className="text-sm font-medium text-primary">
              {t("footer.madeBy")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{t("footer.quickLinks")}</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* UW Resources */}
          <div>
            <h4 className="font-semibold mb-4">{t("footer.uwResources")}</h4>
            <ul className="space-y-3">
              {externalLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                  >
                    {link.name}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">{t("footer.getInTouch")}</h4>
            <div className="space-y-3">
              <a
                href="mailto:wxy95929@uw.edu"
                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
              >
                <Mail className="h-4 w-4" />
                wxy95929@uw.edu
              </a>
              <p className="text-sm text-muted-foreground">
                {t("footer.suggestions")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border bg-muted/50">
        <div className="container py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                © {currentYear} {t("footer.copyright")}
              </p>
              <p className="text-xs text-muted-foreground/70">
                {t("footer.notAffiliated")}
              </p>
            </div>
            <p className="text-xs text-muted-foreground/70">
              {t("footer.lastUpdated")}: {lastUpdated}
            </p>
          </div>
          
          {/* Disclaimer */}
          <div className="mt-6 pt-4 border-t border-border/50">
            <p className="text-xs text-muted-foreground/70 text-center max-w-3xl mx-auto">
              <strong>{t("footer.disclaimer")}</strong> {t("footer.disclaimerText")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
