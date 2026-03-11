import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸", countryCode: "US" },
  { code: "zh", name: "中文", flag: "🇨🇳", countryCode: "CN" },
  { code: "ko", name: "한국어", flag: "🇰🇷", countryCode: "KR" },
  { code: "ja", name: "日本語", flag: "🇯🇵", countryCode: "JP" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳", countryCode: "IN" },
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳", countryCode: "VN" },
  { code: "es", name: "Español", flag: "🇪🇸", countryCode: "ES" },
  { code: "ar", name: "العربية", flag: "🇸🇦", countryCode: "SA" },
  { code: "fr", name: "Français", flag: "🇫🇷", countryCode: "FR" },
  { code: "ru", name: "Русский", flag: "🇷🇺", countryCode: "RU" },
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (language: typeof languages[0]) => {
    i18n.changeLanguage(language.code);
    localStorage.setItem("preferredLanguage", language.code);
    
    // Set document direction for RTL languages
    if (language.code === "ar") {
      document.documentElement.dir = "rtl";
    } else {
      document.documentElement.dir = "ltr";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 h-9 px-3">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{currentLanguage.flag}</span>
          <span className="hidden md:inline text-sm">{currentLanguage.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-background border border-border shadow-lg z-50">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language)}
            className={`flex items-center gap-3 cursor-pointer ${
              currentLanguage.code === language.code ? "bg-secondary" : ""
            }`}
          >
            <span className="text-xs font-medium text-muted-foreground w-6">{language.countryCode}</span>
            <span className="text-lg">{language.flag}</span>
            <span>{language.name}</span>
            {currentLanguage.code === language.code && (
              <span className="ml-auto text-primary">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
