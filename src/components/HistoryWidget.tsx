import { History, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { MOCK_HISTORY, HistoryItem } from "@/lib/historyData";

interface HistoryWidgetProps {
  onViewAll: () => void;
}

function getScoreColor(score: number) {
  if (score >= 7.0) return "border-neon-green text-neon-green";
  if (score >= 5.5) return "border-primary text-primary";
  return "border-[#FF9F0A] text-[#FF9F0A]";
}

function HistoryListItem({ item, onClick }: { item: HistoryItem; onClick?: () => void }) {
  return (
    <motion.button
      whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
      onClick={onClick}
      className="w-full flex items-center gap-3 p-3 rounded-xl bg-secondary/30 border border-border transition-colors"
    >
      <div className={`w-9 h-9 rounded-full border-2 flex items-center justify-center font-bold text-sm ${getScoreColor(item.score)}`}>
        {item.score}
      </div>
      <div className="flex-1 text-left">
        <p className="text-foreground font-medium text-sm">{item.date}</p>
        <p className="text-muted-foreground text-xs uppercase tracking-wide">Speaking Test</p>
      </div>
      <ChevronRight className="w-4 h-4 text-muted-foreground" />
    </motion.button>
  );
}

export function HistoryWidget({ onViewAll }: HistoryWidgetProps) {
  const recentHistory = MOCK_HISTORY.slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-[2rem] p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <History className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Recent Activity</h3>
        </div>
        <button
          onClick={onViewAll}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          View All
        </button>
      </div>
      
      <div className="space-y-2">
        {recentHistory.map((item) => (
          <HistoryListItem key={item.id} item={item} />
        ))}
      </div>
    </motion.div>
  );
}
