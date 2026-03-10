import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { X, Send, Loader2, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useHuskyChat } from "@/hooks/useHuskyChat";
import { useIsMobile } from "@/hooks/use-mobile";
import ChatMessage from "@/components/chat/ChatMessage";
import { cn } from "@/lib/utils";

const PAGE_HINTS: Record<string, { emoji: string; hintKey: string }> = {
  "/housing": { emoji: "🏠", hintKey: "floatingChat.askHousing" },
  "/food": { emoji: "🍜", hintKey: "floatingChat.askFood" },
  "/campus": { emoji: "📚", hintKey: "floatingChat.askCampus" },
  "/transport": { emoji: "🚌", hintKey: "floatingChat.askTransport" },
};

const FloatingChat = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isPillExpanded, setIsPillExpanded] = useState(false);
  const [isDismissedThisSession, setIsDismissedThisSession] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const pillTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevPathRef = useRef(location.pathname);

  const { messages, isLoading, send, reset } = useHuskyChat();

  // Don't show on homepage (already has chat) or auth page
  const isHomePage = location.pathname === "/";
  const isAuthPage = location.pathname === "/auth";
  const shouldHide = isHomePage || isAuthPage;

  const pageHint = PAGE_HINTS[location.pathname];

  // Auto-expand pill on page change (if not dismissed)
  useEffect(() => {
    if (shouldHide || isPanelOpen || isDismissedThisSession) return;

    if (prevPathRef.current !== location.pathname && pageHint) {
      setIsPillExpanded(true);

      if (pillTimerRef.current) clearTimeout(pillTimerRef.current);
      pillTimerRef.current = setTimeout(() => {
        setIsPillExpanded(false);
      }, 5000);
    }

    prevPathRef.current = location.pathname;

    return () => {
      if (pillTimerRef.current) clearTimeout(pillTimerRef.current);
    };
  }, [location.pathname, shouldHide, isPanelOpen, isDismissedThisSession, pageHint]);

  // Scroll chat to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleButtonClick = () => {
    if (isPillExpanded) {
      // Second click opens panel
      setIsPillExpanded(false);
      setIsPanelOpen(true);
    } else if (!isPanelOpen) {
      // First click expands pill
      setIsPillExpanded(true);
      if (pillTimerRef.current) clearTimeout(pillTimerRef.current);
      pillTimerRef.current = setTimeout(() => {
        setIsPillExpanded(false);
      }, 5000);
    }
  };

  const handlePillClick = () => {
    setIsPillExpanded(false);
    setIsPanelOpen(true);
  };

  const handleDismissPill = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPillExpanded(false);
    setIsDismissedThisSession(true);
    if (pillTimerRef.current) clearTimeout(pillTimerRef.current);
  };

  const handleSend = () => {
    if (!chatInput.trim() || isLoading) return;
    send(chatInput.trim());
    setChatInput("");
  };

  if (shouldHide) return null;

  const buttonSize = isMobile ? 50 : 60;
  const hintText = pageHint
    ? t(pageHint.hintKey, `Ask about this ${pageHint.emoji}`)
    : t("floatingChat.askAnything", "Ask HuskyGuide AI 🐾");

  return (
    <>
      {/* Chat Panel */}
      <div
        className={cn(
          "fixed z-50 bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ease-out",
          isPanelOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4 pointer-events-none",
          isMobile
            ? "inset-x-3 bottom-3 top-16"
            : "bottom-24 right-6 w-[400px] h-[560px]"
        )}
      >
        {/* Panel Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border hero-gradient text-primary-foreground">
          <div className="flex items-center gap-2">
            <span className="text-lg">🤖</span>
            <span className="font-semibold text-sm">{t("chat.huskyGuideAI")}</span>
          </div>
          <button
            onClick={() => setIsPanelOpen(false)}
            className="p-1 rounded-md hover:bg-white/20 transition-colors"
            aria-label="Minimize chat"
          >
            <Minus className="h-4 w-4" />
          </button>
        </div>

        {/* Safety Disclaimer */}
        <div className="px-3 pt-3">
          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 px-3 py-2 text-xs text-amber-800 dark:text-amber-200">
            {t("chat.safetyDisclaimer")}
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-3">
          {messages.length === 0 && (
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-xl px-4 py-2.5 text-sm bg-secondary text-foreground">
                {t("chat.welcomeMessage")}
              </div>
            </div>
          )}
          {messages.map((msg, i) => (
            <ChatMessage key={i} role={msg.role} content={msg.content} />
          ))}
          {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-xl px-4 py-2.5 text-sm bg-secondary text-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-3 border-t border-border">
          <div className="flex gap-2">
            <Input
              placeholder={t("chat.placeholder")}
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1"
              disabled={isLoading}
            />
            <Button size="icon" onClick={handleSend} disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Button + Pill */}
      {!isPanelOpen && (
        <div
          className={cn(
            "fixed z-50 flex items-center gap-0",
            isMobile ? "bottom-4 right-4" : "bottom-6 right-6"
          )}
        >
          {/* Pill hint */}
          <div
            className={cn(
              "flex items-center gap-2 overflow-hidden transition-all duration-300 ease-out cursor-pointer",
              "bg-primary text-primary-foreground rounded-full shadow-lg",
              isPillExpanded
                ? "max-w-[260px] opacity-100 pl-4 pr-2 py-2 mr-2"
                : "max-w-0 opacity-0 pl-0 pr-0 py-0 mr-0"
            )}
            onClick={handlePillClick}
          >
            <span className="text-sm font-medium whitespace-nowrap">
              {hintText}
            </span>
            <button
              onClick={handleDismissPill}
              className="p-0.5 rounded-full hover:bg-white/20 transition-colors shrink-0"
              aria-label="Dismiss"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Main FAB */}
          <button
            onClick={handleButtonClick}
            className={cn(
              "flex items-center justify-center rounded-full hero-gradient text-primary-foreground shadow-lg",
              "hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            )}
            style={{
              width: buttonSize,
              height: buttonSize,
              fontSize: isMobile ? 22 : 26,
            }}
            aria-label="Open AI Chat"
          >
            🤖
          </button>
        </div>
      )}
    </>
  );
};

export default FloatingChat;
