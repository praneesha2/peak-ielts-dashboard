import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface HapticButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

export function HapticButton({ 
  variant = "primary", 
  children, 
  className,
  ...props 
}: HapticButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={cn(
        "px-6 py-2.5 rounded-full font-medium transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        variant === "primary" && [
          "bg-[#007AFF] text-white shadow-lg",
          "hover:bg-[#0051D5] focus:ring-[#007AFF]"
        ],
        variant === "secondary" && [
          "bg-white/50 dark:bg-white/10 backdrop-blur-sm",
          "hover:bg-white/70 dark:hover:bg-white/20"
        ],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
