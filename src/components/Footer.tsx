import { MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="container py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo & Description */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <a href="/" className="flex items-center gap-2 font-semibold">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg hero-gradient">
                <MapPin className="h-4 w-4 text-primary-foreground" />
              </div>
              <span>UW Survival Guide</span>
            </a>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              Helping international students thrive at University of Washington.
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="#housing" className="text-muted-foreground hover:text-foreground transition-colors">
              Housing
            </a>
            <a href="#food" className="text-muted-foreground hover:text-foreground transition-colors">
              Food
            </a>
            <a href="#campus" className="text-muted-foreground hover:text-foreground transition-colors">
              Campus
            </a>
            <a href="#transport" className="text-muted-foreground hover:text-foreground transition-colors">
              Transport
            </a>
          </nav>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            © {currentYear} UW Survival Guide. Made with 💜 by UW students.
          </p>
          <p className="text-center text-xs text-muted-foreground/70 mt-2">
            Not officially affiliated with the University of Washington.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
