import { MapPin, Menu, X, LogIn, LogOut, User, Settings, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import LanguageSelector from "./LanguageSelector";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

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
    { name: t("nav.home"), href: "/" },
    { name: t("nav.campusLife"), href: "/campus" },
    { name: t("nav.housing"), href: "/housing" },
    { name: t("nav.food"), href: "/food" },
    { name: t("nav.transport"), href: "/transport" },
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
              key={link.href}
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
          <div className="ml-2 border-l border-border pl-3 flex items-center gap-2">
            <LanguageSelector />
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-1.5">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <User className="h-3.5 w-3.5" />
                    </div>
                    <span className="max-w-[100px] truncate text-sm">{user.email?.split("@")[0] || "Account"}</span>
                    <ChevronDown className="h-3 w-3 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => navigate("/profile")} className="gap-2 cursor-pointer">
                    <Settings className="h-4 w-4" /> Edit Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()} className="gap-2 cursor-pointer text-destructive focus:text-destructive">
                    <LogOut className="h-4 w-4" /> Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="hero" size="sm" onClick={() => navigate('/auth')} className="gap-1.5">
                <LogIn className="h-4 w-4" />
                Sign In
              </Button>
            )}
          </div>
        </nav>

        {/* Mobile: Language + Menu Button */}
        <div className="lg:hidden flex items-center gap-1">
          <LanguageSelector />
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 z-50 bg-background animate-fade-in">
          <nav className="container py-6 flex flex-col gap-2 bg-background">
            {navLinks.map((link) => (
              <Link
                key={link.href}
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
            
            {/* Mobile auth + contact */}
            <div className="mt-6 pt-6 border-t border-border space-y-2">
              {user ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-4 text-base font-medium text-muted-foreground hover:text-foreground rounded-xl hover:bg-secondary/50"
                  >
                    <Settings className="h-4 w-4" />
                    Edit Profile
                  </Link>
                  <button
                    onClick={() => { signOut(); setIsMenuOpen(false); }}
                    className="flex items-center gap-2 px-4 py-4 w-full text-base font-medium text-destructive hover:bg-secondary/50 rounded-xl"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-4 text-base font-medium text-primary hover:bg-secondary/50 rounded-xl"
                >
                  <LogIn className="h-4 w-4" />
                  Sign In / Sign Up
                </Link>
              )}
              <a
                href="mailto:wxy95929@uw.edu"
                className="flex items-center px-4 py-4 text-base font-medium text-muted-foreground hover:text-foreground rounded-xl hover:bg-secondary/50"
              >
                {t("nav.contact")}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
