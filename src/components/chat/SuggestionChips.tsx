import { useTranslation } from "react-i18next";

const SUGGESTION_KEYS = [
  { key: "chat.suggestion.bankAccount", emoji: "🏦" },
  { key: "chat.suggestion.whereToLive", emoji: "🏠" },
  { key: "chat.suggestion.firstWeek", emoji: "📋" },
  { key: "chat.suggestion.optTiming", emoji: "🛂" },
];

interface SuggestionChipsProps {
  onSelect: (question: string) => void;
  disabled?: boolean;
}

const SuggestionChips = ({ onSelect, disabled }: SuggestionChipsProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap gap-2 py-2">
      {SUGGESTION_KEYS.map(({ key, emoji }) => {
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
