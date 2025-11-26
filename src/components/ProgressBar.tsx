import { motion } from "framer-motion";

interface ProgressBarProps {
  label: string;
  value: number;
  max: number;
  color: "orange" | "blue" | "purple" | "pink";
}

const colorMap = {
  orange: "hsl(var(--neon-orange))",
  blue: "hsl(var(--neon-blue))",
  purple: "hsl(var(--neon-purple))",
  pink: "hsl(var(--neon-pink))",
};

export function ProgressBar({ label, value, max, color }: ProgressBarProps) {
  const percentage = (value / max) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm text-muted-foreground">{value}/{max}</span>
      </div>
      <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{
            backgroundColor: colorMap[color],
            boxShadow: `0 0 10px ${colorMap[color]}`,
          }}
        />
      </div>
    </div>
  );
}
