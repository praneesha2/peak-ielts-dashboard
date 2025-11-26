import { motion } from "framer-motion";

interface CircularProgressProps {
  value: number;
  max: number;
  label: string;
  className?: string;
}

export function CircularProgress({ value, max, label, className = "" }: CircularProgressProps) {
  const percentage = (value / max) * 100;
  const circumference = 2 * Math.PI * 70;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className={`relative ${className}`}>
      <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
        {/* Background circle */}
        <circle
          cx="80"
          cy="80"
          r="70"
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth="8"
          opacity="0.2"
        />
        
        {/* Progress circle */}
        <motion.circle
          cx="80"
          cy="80"
          r="70"
          fill="none"
          stroke="hsl(var(--neon-blue))"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ filter: "drop-shadow(0 0 8px hsl(var(--neon-blue)))" }}
        />
      </svg>
      
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="text-5xl font-bold"
        >
          {value}
        </motion.span>
        <span className="text-sm text-muted-foreground mt-1">{label}</span>
      </div>
    </div>
  );
}
