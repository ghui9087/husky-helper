import { useTranslation } from "react-i18next";

type PageContext = "home" | "campus" | "housing" | "food" | "transport";

const PAGE_SUGGESTIONS: Record<PageContext, { key: string; emoji: string }[]> = {
  home: [
    { key: "chat.suggestion.home.bankAccount", emoji: "🏦" },
    { key: "chat.suggestion.home.whereToLive", emoji: "🏠" },
    { key: "chat.suggestion.home.firstWeek", emoji: "📋" },
    { key: "chat.suggestion.home.optTiming", emoji: "🛂" },
  ],
  campus: [
    { key: "chat.suggestion.campus.emailProfessor", emoji: "🎓" },
    { key: "chat.suggestion.campus.studySpots", emoji: "📚" },
    { key: "chat.suggestion.campus.imaGym", emoji: "🏋️" },
    { key: "chat.suggestion.campus.emergency", emoji: "🆘" },
  ],
  housing: [
    { key: "chat.suggestion.housing.bestNeighborhood", emoji: "🏠" },
    { key: "chat.suggestion.housing.rentalScam", emoji: "⚠️" },
    { key: "chat.suggestion.housing.leaseCheck", emoji: "📄" },
    { key: "chat.suggestion.housing.findRoommates", emoji: "👥" },
  ],
  food: [
    { key: "chat.suggestion.food.cheapRestaurants", emoji: "🍜" },
    { key: "chat.suggestion.food.groceryStore", emoji: "🛒" },
    { key: "chat.suggestion.food.mealPrep", emoji: "🍱" },
    { key: "chat.suggestion.food.freeFood", emoji: "🆓" },
  ],
  transport: [
    { key: "chat.suggestion.transport.upass", emoji: "🚌" },
    { key: "chat.suggestion.transport.lightRail", emoji: "🚇" },
    { key: "chat.suggestion.transport.car", emoji: "🚗" },
    { key: "chat.suggestion.transport.lateNight", emoji: "🌙" },
  ],
};

function getPageContext(pathname: string): PageContext {
  if (pathname.startsWith("/campus")) return "campus";
  if (pathname.startsWith("/housing")) return "housing";
  if (pathname.startsWith("/food")) return "food";
  if (pathname.startsWith("/transport")) return "transport";
  return "home";
}

interface SuggestionChipsProps {
  onSelect: (question: string) => void;
  disabled?: boolean;
  page?: string;
}

const SuggestionChips = ({ onSelect, disabled, page = "/" }: SuggestionChipsProps) => {
  const { t } = useTranslation();
  const context = getPageContext(page);
  const suggestions = PAGE_SUGGESTIONS[context];

  return (
    <div className="flex flex-wrap gap-2 py-2">
      {suggestions.map(({ key, emoji }) => {
        const text = t(key);
        return (
          <button
            key={key}
            onClick={() => onSelect(text)}
            disabled={disabled}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground shadow-sm hover:bg-secondary hover:border-primary/30 hover:shadow transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none"
          >
            <span>{emoji}</span>
            <span>{text}</span>
          </button>
        );
      })}
    </div>
  );
};

export default SuggestionChips;
