import { Header } from "@/components/Header";
import { motion } from "framer-motion";
import { Edit2, LogOut, CheckCircle, Lock, ChevronRight, Award, AlertTriangle } from "lucide-react";
import { mockUser, mockPlanFeatures, mockSettingsSections } from "@/lib/mockData";
import * as Icons from "lucide-react";

export default function Settings() {
  return (
    <div className="min-h-screen">
      <Header title="Dashboard" subtitle="Manage your preferences and subscription" />

      {/* Profile Header */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-card rounded-[2rem] p-8 mb-6"
      >
        <div className="grid md:grid-cols-[auto_1fr_auto] gap-8 items-center">
          {/* Avatar */}
          <div className="relative">
            <div className="w-32 h-32 rounded-3xl overflow-hidden glass-card">
              <img src={mockUser.avatar} alt={mockUser.name} className="w-full h-full object-cover" />
            </div>
            <button className="absolute bottom-0 right-0 w-10 h-10 rounded-xl bg-primary flex items-center justify-center haptic-btn">
              <Edit2 className="w-4 h-4" />
            </button>
          </div>

          {/* Info */}
          <div>
            <h2 className="text-3xl font-bold mb-2">{mockUser.name}</h2>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
              <span>✉️ {mockUser.email}</span>
              <span>📍 {mockUser.location}</span>
            </div>
            <div className="flex gap-8">
              <div>
                <div className="text-3xl font-bold">{mockUser.bandScore}</div>
                <div className="text-xs text-muted-foreground">BAND SCORE</div>
              </div>
              <div>
                <div className="text-3xl font-bold">{mockUser.testsTaken}</div>
                <div className="text-xs text-muted-foreground">TESTS TAKEN</div>
              </div>
              <div>
                <div className="text-3xl font-bold">{mockUser.attendance}%</div>
                <div className="text-xs text-muted-foreground">ATTENDANCE</div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <button className="px-8 py-3 rounded-2xl bg-primary text-primary-foreground font-semibold haptic-btn hover:bg-primary/90">
              Edit Profile
            </button>
            <button className="px-8 py-3 rounded-2xl glass-card font-medium haptic-btn hover:bg-white/5 flex items-center justify-center gap-2">
              <LogOut className="w-4 h-4" />
              Log Out
            </button>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Current Plan */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-[2rem] p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold">Current Plan</h3>
            <span className="px-3 py-1 rounded-full bg-neon-green/20 text-neon-green text-sm font-medium">
              Active
            </span>
          </div>

          <div className="glass-card rounded-2xl p-6 mb-6">
            <h4 className="text-2xl font-bold mb-1">Free Plan</h4>
            <p className="text-sm text-muted-foreground">BASIC TIER</p>
          </div>

          <div className="space-y-3 mb-6">
            {mockPlanFeatures.map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                {feature.included ? (
                  <CheckCircle className="w-5 h-5 text-neon-green" />
                ) : (
                  <Lock className="w-5 h-5 text-muted-foreground" />
                )}
                <span className={feature.included ? "" : "text-muted-foreground"}>
                  {feature.text}
                </span>
              </div>
            ))}
          </div>

          <button className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold haptic-btn hover:bg-primary/90">
            Upgrade to Pro
          </button>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-[2rem] p-8 bg-gradient-to-br from-purple-600/40 to-blue-600/40 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-semibold">Achievements</h3>
            </div>
            <p className="text-lg mb-4">You're on a 3-day streak!</p>
            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "75%" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-white rounded-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Settings Navigation */}
        {mockSettingsSections.map((section, idx) => (
          <motion.div
            key={section.title}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 + idx * 0.1 }}
            className="space-y-4"
          >
            <h4 className="text-xs font-semibold text-muted-foreground px-2">{section.title}</h4>
            <div className="glass-card rounded-[2rem] overflow-hidden">
              {section.items.map((item, i) => {
                const IconComponent = (Icons as any)[item.icon];
                return (
                  <button
                    key={i}
                    className="w-full flex items-center gap-4 p-4 haptic-btn hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                  >
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                        section.title === "GENERAL"
                          ? "bg-primary/20 text-primary"
                          : section.title === "SECURITY"
                          ? "bg-neon-green/20 text-neon-green"
                          : section.title === "BILLING"
                          ? "bg-neon-purple/20 text-neon-purple"
                          : "bg-neon-cyan/20 text-neon-cyan"
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="flex-1 text-left font-medium">{item.label}</span>
                    {item.value && (
                      <span className="text-sm text-muted-foreground">{item.value}</span>
                    )}
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </button>
                );
              })}
            </div>
          </motion.div>
        ))}

        {/* Danger Zone */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="lg:col-span-2 glass-card rounded-[2rem] p-6 border-destructive/30"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-destructive/20 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <h4 className="font-semibold text-destructive">Danger Zone</h4>
                <p className="text-sm text-muted-foreground">Permanently remove your data.</p>
              </div>
            </div>
            <button className="px-6 py-3 rounded-2xl bg-destructive/20 text-destructive font-medium haptic-btn hover:bg-destructive/30">
              Delete Account
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
