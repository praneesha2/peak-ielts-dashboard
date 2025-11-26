import { Bell, Sun, Menu } from "lucide-react";
import { motion } from "framer-motion";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex items-center justify-between mb-8"
    >
      <div className="flex items-center gap-4">
        <button className="lg:hidden p-2 rounded-xl glass-card haptic-btn">
          <Menu className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-3 rounded-full glass-card haptic-btn hover:bg-white/5">
          <Sun className="w-5 h-5" />
        </button>
        <button className="relative p-3 rounded-full glass-card haptic-btn hover:bg-white/5">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full"></span>
        </button>
        <button className="w-10 h-10 rounded-full overflow-hidden glass-card haptic-btn">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
            alt="User avatar"
            className="w-full h-full object-cover"
          />
        </button>
      </div>
    </motion.header>
  );
}
