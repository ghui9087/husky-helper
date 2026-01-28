import { MapPin, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Campus Life", href: "/campus" },
    { name: "Housing", href: "/housing" },
    { name: "Food & Dining", href: "/food" },
    { name: "Getting Around", href: "/transport" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/85">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 font-semibold text-lg shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg hero-gradient shadow-sm">
            <MapPin className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-foreground hidden xs:inline sm:inline">UW Survival Guide</span>
          <span className="text-foreground xs:hidden sm:hidden">UW Guide</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                isActive(link.href)
                  ? "bg-secondary text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden h-10 w-10"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 z-50 bg-background/98 backdrop-blur-sm animate-fade-in">
          <nav className="container py-6 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "flex items-center px-4 py-4 text-base font-medium rounded-xl transition-all",
                  isActive(link.href)
                    ? "bg-secondary text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50 active:bg-secondary"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Mobile contact link */}
            <div className="mt-6 pt-6 border-t border-border">
              <a
                href="mailto:uwsurvivalguide@uw.edu"
                className="flex items-center px-4 py-4 text-base font-medium text-muted-foreground hover:text-foreground rounded-xl hover:bg-secondary/50"
              >
                Contact Us
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
