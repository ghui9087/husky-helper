import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Plus, MessageSquare, Trash2, ChevronLeft, ChevronRight, PanelLeftClose, PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ConversationGroup, Conversation } from "@/hooks/useConversations";

interface ChatSidebarProps {
  groupedConversations: ConversationGroup[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewChat: () => void;
  onDeleteConversation: (id: string) => void;
  loading?: boolean;
}

const ChatSidebar = ({
  groupedConversations,
  activeConversationId,
  onSelectConversation,
  onNewChat,
  onDeleteConversation,
  loading,
}: ChatSidebarProps) => {
  const { t } = useTranslation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div
      className={cn(
        "flex flex-col h-full border-r border-border bg-secondary/30 transition-all duration-200",
        isCollapsed ? "w-12" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-2 border-b border-border">
        {!isCollapsed && (
          <Button
            variant="hero"
            size="sm"
            className="flex-1 gap-2 mr-2"
            onClick={onNewChat}
          >
            <Plus className="h-4 w-4" />
            {t("chat.newChat", "New Chat")}
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <PanelLeft className="h-4 w-4" />
          ) : (
            <PanelLeftClose className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Collapsed: just show new chat icon */}
      {isCollapsed ? (
        <div className="p-2">
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8"
            onClick={onNewChat}
            title={t("chat.newChat", "New Chat")}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-4">
            {loading ? (
              <p className="text-xs text-muted-foreground px-2">
                {t("common.loading", "Loading...")}
              </p>
            ) : groupedConversations.length === 0 ? (
              <p className="text-xs text-muted-foreground px-2">
                {t("chat.noHistory", "No conversations yet")}
              </p>
            ) : (
              groupedConversations.map((group) => (
                <div key={group.label}>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide px-2 mb-1">
                    {group.label}
                  </p>
                  <div className="space-y-0.5">
                    {group.conversations.map((conv) => (
                      <ConversationItem
                        key={conv.id}
                        conversation={conv}
                        isActive={activeConversationId === conv.id}
                        isHovered={hoveredId === conv.id}
                        onSelect={() => onSelectConversation(conv.id)}
                        onDelete={() => onDeleteConversation(conv.id)}
                        onMouseEnter={() => setHoveredId(conv.id)}
                        onMouseLeave={() => setHoveredId(null)}
                      />
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  isHovered: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const ConversationItem = ({
  conversation,
  isActive,
  isHovered,
  onSelect,
  onDelete,
  onMouseEnter,
  onMouseLeave,
}: ConversationItemProps) => {
  return (
    <div
      className={cn(
        "group flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer transition-colors",
        isActive
          ? "bg-primary/10 text-primary"
          : "hover:bg-secondary text-foreground"
      )}
      onClick={onSelect}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <MessageSquare className="h-4 w-4 shrink-0 opacity-60" />
      <span className="flex-1 text-sm truncate">{conversation.title}</span>
      {isHovered && (
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/10 hover:text-destructive"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      )}
    </div>
  );
};

export default ChatSidebar;
