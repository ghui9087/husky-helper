import { cn } from "@/lib/utils";

interface FilterTabsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const FilterTabs = ({ categories, activeCategory, onCategoryChange }: FilterTabsProps) => {
  return (
    <div className="w-full overflow-x-auto scrollbar-hide -mx-1 px-1">
      <div className="flex gap-2 pb-2 min-w-max">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={cn(
              "px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 touch-manipulation",
              activeCategory === category
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-card text-muted-foreground hover:bg-secondary hover:text-foreground border border-border active:bg-secondary"
            )}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterTabs;
