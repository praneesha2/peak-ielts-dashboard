import { Header } from "@/components/Header";
import { motion } from "framer-motion";
import { ChevronLeft, Smartphone, Monitor, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export default function LoginSecurity() {
  const navigate = useNavigate();
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);

  const sessions = [
    { device: "iPhone 14 Pro", location: "New York, US", ip: "192.168.1.1", active: true },
    { device: "Chrome on MacBook Pro", location: "New York, US", ip: "192.168.1.2", active: false },
  ];

  return (
    <div className="min-h-screen">
      <Header title="Login & Security" subtitle="Manage your security settings" />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-3xl"
      >
        <button
          onClick={() => navigate("/settings")}
          className="flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground transition-colors haptic-btn"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back to Settings</span>
        </button>

        {/* Password Management */}
        <div className="glass-card rounded-[2rem] p-8 mb-6">
          <h3 className="text-xl font-semibold mb-6">Change Password</h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                placeholder="Enter current password"
                className="rounded-xl h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="Enter new password"
                className="rounded-xl h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                className="rounded-xl h-12"
              />
            </div>

            <div className="pt-2">
              <p className="text-sm text-muted-foreground mb-4">
                Last changed: October 15, 2024
              </p>
              <Button className="w-full py-3 rounded-2xl haptic-btn">
                Update Password
              </Button>
            </div>
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div className="glass-card rounded-[2rem] p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold mb-1">Two-Factor Authentication</h3>
              <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
            </div>
            <Switch
              checked={twoFAEnabled}
              onCheckedChange={setTwoFAEnabled}
              className="data-[state=checked]:bg-neon-green"
            />
          </div>

          {twoFAEnabled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-4"
            >
              <div className="glass-card rounded-2xl p-6 flex flex-col items-center">
                <div className="w-48 h-48 bg-white rounded-2xl flex items-center justify-center mb-4">
                  <p className="text-sm text-black">QR Code Placeholder</p>
                </div>
                <p className="text-sm text-center text-muted-foreground">
                  Scan this QR code with your authenticator app
                </p>
              </div>
              <Input
                placeholder="Enter 6-digit code"
                className="rounded-xl h-12 text-center text-2xl tracking-widest"
                maxLength={6}
              />
            </motion.div>
          )}
        </div>

        {/* Active Sessions */}
        <div className="glass-card rounded-[2rem] p-8 mb-6">
          <h3 className="text-xl font-semibold mb-6">Active Sessions</h3>
          <div className="space-y-4">
            {sessions.map((session, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 glass-card rounded-2xl"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  {session.device.includes("iPhone") ? (
                    <Smartphone className="w-6 h-6 text-primary" />
                  ) : (
                    <Monitor className="w-6 h-6 text-primary" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{session.device}</p>
                    {session.active && (
                      <span className="px-2 py-0.5 text-xs rounded-full bg-neon-green/20 text-neon-green">
                        Active Now
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {session.location} • {session.ip}
                  </p>
                </div>
                {!session.active && (
                  <Button variant="outline" size="sm" className="rounded-xl">
                    Revoke
                  </Button>
                )}
              </div>
            ))}
          </div>
          <Button
            variant="outline"
            className="w-full mt-4 py-3 rounded-2xl text-destructive border-destructive/30 hover:bg-destructive/10 haptic-btn"
          >
            Log Out From All Devices
          </Button>
        </div>

        {/* Security Alerts */}
        <div className="glass-card rounded-[2rem] p-8">
          <h3 className="text-xl font-semibold mb-6">Recent Security Alerts</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 glass-card rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-neon-green/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-neon-green" />
              </div>
              <div className="flex-1">
                <p className="font-medium">New device login</p>
                <p className="text-sm text-muted-foreground">
                  Chrome on MacBook Pro • November 20, 2024
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 glass-card rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-neon-green/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-neon-green" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Password changed</p>
                <p className="text-sm text-muted-foreground">October 15, 2024</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
