import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SegmentedControlProps {
  options: string[];
  selected: string;
  onChange: (option: string) => void;
}

export function SegmentedControl({ options, selected, onChange }: SegmentedControlProps) {
  return (
    <div className="inline-flex p-1 rounded-full bg-muted/30 dark:bg-white/5 backdrop-blur-sm">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={cn(
            "relative px-6 py-2 rounded-full text-sm font-medium transition-colors z-10",
            selected === option
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {selected === option && (
            <motion.div
              layoutId="segmented-control"
              className="absolute inset-0 bg-white dark:bg-slate-700 rounded-full shadow-md"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{option}</span>
        </button>
      ))}
    </div>
  );
}
