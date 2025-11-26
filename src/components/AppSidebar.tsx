import { Home, Mic, BarChart3, Award, Settings } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { motion } from "framer-motion";

const navItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Practice", url: "/practice", icon: Mic },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Achievements", url: "/achievements", icon: Award },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed left-0 top-0 h-screen w-64 p-6 glass-card border-r border-white/10 z-50"
    >
      {/* Logo */}
      <div className="mb-12">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
          <span className="text-2xl font-bold text-white">P</span>
        </div>
        <h1 className="mt-3 text-xl font-semibold">PeakIELTS</h1>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            end
            className="flex items-center gap-3 px-4 py-3 rounded-2xl transition-all haptic-btn hover:bg-white/5"
            activeClassName="bg-primary/20 text-primary"
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.title}</span>
          </NavLink>
        ))}
      </nav>

      {/* Mobile App Promo */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="absolute bottom-6 left-6 right-6 glass-card rounded-3xl p-6 bg-gradient-to-br from-neon-purple/20 to-neon-blue/20"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-purple to-neon-blue flex items-center justify-center mb-3">
          <Mic className="w-5 h-5 text-white" />
        </div>
        <h3 className="font-semibold mb-1">Get Mobile App</h3>
        <p className="text-sm text-muted-foreground mb-4">Practice anywhere, anytime.</p>
        <button className="w-full px-4 py-2 rounded-xl bg-primary text-primary-foreground font-medium haptic-btn hover:bg-primary/90">
          Download
        </button>
      </motion.div>
    </motion.aside>
  );
}
