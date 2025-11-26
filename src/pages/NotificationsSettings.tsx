import { Header } from "@/components/Header";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function NotificationsSettings() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState({
    email: true,
    inApp: true,
    billing: true,
    performance: false,
    security: true,
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen">
      <Header title="Notifications" subtitle="Manage your notification preferences" />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-4xl mx-auto"
      >
        <button
          onClick={() => navigate("/settings")}
          className="flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground transition-colors haptic-btn"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back to Settings</span>
        </button>

        <div className="glass-card rounded-[2rem] p-8">
          <h3 className="text-xl font-semibold mb-6">Notification Preferences</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between py-4 border-b border-white/5">
              <div className="flex-1">
                <Label htmlFor="email" className="text-base font-medium cursor-pointer">
                  Email Notifications
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Receive updates and alerts via email
                </p>
              </div>
              <Switch
                id="email"
                checked={notifications.email}
                onCheckedChange={() => toggleNotification("email")}
                className="data-[state=checked]:bg-neon-green"
              />
            </div>

            <div className="flex items-center justify-between py-4 border-b border-white/5">
              <div className="flex-1">
                <Label htmlFor="inApp" className="text-base font-medium cursor-pointer">
                  In-App Notifications
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Show notifications while using the app
                </p>
              </div>
              <Switch
                id="inApp"
                checked={notifications.inApp}
                onCheckedChange={() => toggleNotification("inApp")}
                className="data-[state=checked]:bg-neon-green"
              />
            </div>

            <div className="flex items-center justify-between py-4 border-b border-white/5">
              <div className="flex-1">
                <Label htmlFor="billing" className="text-base font-medium cursor-pointer">
                  Payment & Billing
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Get notified about payments and subscriptions
                </p>
              </div>
              <Switch
                id="billing"
                checked={notifications.billing}
                onCheckedChange={() => toggleNotification("billing")}
                className="data-[state=checked]:bg-neon-green"
              />
            </div>

            <div className="flex items-center justify-between py-4 border-b border-white/5">
              <div className="flex-1">
                <Label htmlFor="performance" className="text-base font-medium cursor-pointer">
                  Performance Summaries
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Weekly performance reports and insights
                </p>
              </div>
              <Switch
                id="performance"
                checked={notifications.performance}
                onCheckedChange={() => toggleNotification("performance")}
                className="data-[state=checked]:bg-neon-green"
              />
            </div>

            <div className="flex items-center justify-between py-4">
              <div className="flex-1">
                <Label htmlFor="security" className="text-base font-medium cursor-pointer">
                  Security Alerts
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Important account security notifications
                </p>
              </div>
              <Switch
                id="security"
                checked={notifications.security}
                onCheckedChange={() => toggleNotification("security")}
                className="data-[state=checked]:bg-neon-green"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
