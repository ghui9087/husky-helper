import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import { BookOpen, ChevronDown } from "lucide-react";

const viewSourcesLabels: Record<string, string> = {
  en: "📚 View Sources",
  zh: "📚 查看来源",
  ko: "📚 출처 보기",
  ja: "📚 出典を見る",
  hi: "📚 स्रोत देखें",
  vi: "📚 Xem nguồn",
  es: "📚 Ver fuentes",
  ar: "📚 عرض المصادر",
  fr: "📚 Voir les sources",
  ru: "📚 Показать источники",
};

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

/**
 * Parses source citations from the end of an assistant message.
 * Handles lines like:
 *   Source: Banking > Best Banks for Chinese Students
 *   Based on general knowledge. For the most accurate information, please verify at uw.edu or other online resources.
 */
function parseSourcesFromContent(content: string): {
  mainContent: string;
  sources: { category: string; title: string }[];
  isGeneralKnowledge: boolean;
} {
  const lines = content.trimEnd().split("\n");
  const sources: { category: string; title: string }[] = [];
  let isGeneralKnowledge = false;
  let lastContentLineIndex = lines.length - 1;

  // Scan from the bottom up for source lines
  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i].trim();
    if (!line) {
      continue; // skip empty lines at the bottom
    }

    const sourceMatch = line.match(/^(?:(?:来源|Source|Fuente|Источник|المصدر|स्रोत|出典|출처|Nguồn)\s*[:：])\s*(?:\[?(.+?)\]?\s*[>›»]\s*(.+)|(.+))$/i);
    if (sourceMatch) {
      if (sourceMatch[1] && sourceMatch[2]) {
        sources.unshift({ category: sourceMatch[1].trim(), title: sourceMatch[2].trim() });
      } else if (sourceMatch[3]) {
        sources.unshift({ category: "", title: sourceMatch[3].trim() });
      }
      lastContentLineIndex = i - 1;
      continue;
    }

    if (
      line.match(/^Based on general knowledge/i) ||
      line.match(/^基于通用知识/i) ||
      line.match(/^一般的な知識に基づ/i) ||
      line.match(/^일반 지식/i) ||
      line.match(/^Basé sur des connaissances générales/i) ||
      line.match(/^Basado en conocimiento general/i)
    ) {
      isGeneralKnowledge = true;
      lastContentLineIndex = i - 1;
      continue;
    }

    // Stop scanning when we hit a non-source, non-empty line
    break;
  }

  // Trim trailing empty lines from main content
  while (lastContentLineIndex >= 0 && !lines[lastContentLineIndex].trim()) {
    lastContentLineIndex--;
  }

  const mainContent = lines.slice(0, lastContentLineIndex + 1).join("\n");
  return { mainContent, sources, isGeneralKnowledge };
}

// Map categories to emoji
function getCategoryEmoji(category: string): string {
  const lower = category.toLowerCase();
  if (lower.includes("bank") || lower.includes("银行") || lower.includes("금융")) return "🏦";
  if (lower.includes("hous") || lower.includes("住房") || lower.includes("租")) return "🏠";
  if (lower.includes("food") || lower.includes("餐") || lower.includes("美食")) return "🍽️";
  if (lower.includes("transport") || lower.includes("交通")) return "🚌";
  if (lower.includes("campus") || lower.includes("校园")) return "🏫";
  if (lower.includes("visa") || lower.includes("签证") || lower.includes("immigra")) return "🛂";
  if (lower.includes("academic") || lower.includes("学术")) return "📚";
  if (lower.includes("daily") || lower.includes("日常")) return "🌟";
  if (lower.includes("onboard") || lower.includes("入学")) return "✅";
  return "📄";
}

const ChatMessage = ({ role, content }: ChatMessageProps) => {
  const { i18n } = useTranslation();
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const sourcesLabel = viewSourcesLabels[i18n.language] || viewSourcesLabels.en;

  const { mainContent, sources, isGeneralKnowledge } = useMemo(
    () => (role === "assistant" ? parseSourcesFromContent(content) : { mainContent: content, sources: [], isGeneralKnowledge: false }),
    [content, role]
  );

  const hasSources = sources.length > 0 || isGeneralKnowledge;

  if (role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-xl px-4 py-2.5 text-sm bg-primary text-primary-foreground">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div className="max-w-[85%] rounded-xl px-4 py-2.5 text-sm bg-secondary text-foreground">
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <ReactMarkdown>{mainContent}</ReactMarkdown>
        </div>

        {hasSources && (
          <div className="mt-2 border-t border-border/50 pt-1.5">
            <button
              onClick={() => setSourcesOpen((o) => !o)}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <BookOpen className="h-3 w-3" />
              <span>{sources.length > 0 ? `📚 View Sources (${sources.length})` : "📚 View Sources"}</span>
              <ChevronDown
                className={`h-3 w-3 transition-transform duration-200 ${sourcesOpen ? "rotate-180" : ""}`}
              />
            </button>

            <div
              className={`grid transition-all duration-300 ease-out ${
                sourcesOpen ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                {sources.length > 0 && (
                  <div className="space-y-1.5">
                    {sources.map((s, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-1.5 rounded-lg bg-background/60 px-2.5 py-1.5 text-xs text-muted-foreground"
                      >
                        <span className="shrink-0">{getCategoryEmoji(s.category)}</span>
                        <span>
                          {s.category && <span className="font-medium text-foreground/70">{s.category}</span>}
                          {s.category && " › "}
                          <span>{s.title}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                {isGeneralKnowledge && (
                  <div className="flex items-start gap-1.5 rounded-lg bg-background/60 px-2.5 py-1.5 text-xs text-muted-foreground">
                    <span className="shrink-0">💡</span>
                    <span>Based on general knowledge. For the most accurate information, please verify at uw.edu or other online resources.</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
