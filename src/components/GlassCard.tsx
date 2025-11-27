import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export function GlassCard({ children, className, hoverEffect = false }: GlassCardProps) {
  const Component = hoverEffect ? motion.div : "div";
  
  return (
    <Component
      className={cn(
        "rounded-2xl border backdrop-blur-2xl",
        "bg-white/60 border-white/50 dark:bg-[#1c1c1e]/60 dark:border-white/10",
        "shadow-lg dark:shadow-black/20",
        "transition-all duration-300",
        className
      )}
      {...(hoverEffect && {
        whileHover: { scale: 1.01, y: -2 },
        transition: { duration: 0.2 }
      })}
    >
      {children}
    </Component>
  );
}
