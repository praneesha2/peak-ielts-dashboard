import { X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MOCK_HISTORY, HistoryItem } from "@/lib/historyData";

interface HistorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedId: string | null;
  onSelectItem: (id: string) => void;
}

function getScoreColor(score: number) {
  if (score >= 7.0) return "border-neon-green text-neon-green";
  if (score >= 5.5) return "border-primary text-primary";
  return "border-[#FF9F0A] text-[#FF9F0A]";
}

function HistoryListItem({ 
  item, 
  isActive, 
  onClick 
}: { 
  item: HistoryItem; 
  isActive: boolean; 
  onClick: () => void;
}) {
  return (
    <motion.button
      whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
      onClick={onClick}
      className={`w-full flex items-center gap-4 p-4 rounded-xl transition-colors ${
        isActive 
          ? "bg-secondary border border-primary" 
          : "bg-secondary/30 border border-border"
      }`}
    >
      <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-sm ${getScoreColor(item.score)}`}>
        {item.score}
      </div>
      <div className="flex-1 text-left">
        <p className="text-foreground font-medium">{item.date}</p>
        <p className="text-muted-foreground text-xs uppercase tracking-wide">{item.time} • Speaking Test</p>
      </div>
      <ChevronRight className="w-5 h-5 text-muted-foreground" />
    </motion.button>
  );
}

export function HistorySidebar({ isOpen, onClose, selectedId, onSelectItem }: HistorySidebarProps) {
  const totalTests = MOCK_HISTORY.length;
  const averageScore = (MOCK_HISTORY.reduce((sum, item) => sum + item.score, 0) / totalTests).toFixed(1);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          
          {/* Sidebar Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[400px] bg-[#1C1C1E] border-l border-border z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-bold text-foreground">Test History</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-secondary transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            
            {/* Scrollable List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {MOCK_HISTORY.map((item) => (
                <HistoryListItem
                  key={item.id}
                  item={item}
                  isActive={selectedId === item.id}
                  onClick={() => onSelectItem(item.id)}
                />
              ))}
            </div>
            
            {/* Footer Stats */}
            <div className="p-6 border-t border-border bg-black/20">
              <div className="flex justify-between">
                <div>
                  <p className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Total Tests</p>
                  <p className="text-2xl font-bold text-foreground">{totalTests}</p>
                </div>
                <div className="text-right">
                  <p className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Average Score</p>
                  <p className="text-2xl font-bold text-foreground">{averageScore}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
