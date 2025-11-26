import { Header } from "@/components/Header";
import { motion } from "framer-motion";
import { ChevronLeft, Upload, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export default function PersonalInformation() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "Alex Johnson",
    displayName: "alexj",
    email: "alex.johnson@example.com",
    country: "us",
    timezone: "America/New_York",
  });

  return (
    <div className="min-h-screen">
      <Header title="Personal Information" subtitle="Manage your personal details" />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-3xl mx-auto"
      >
        {/* Back Button */}
        <button
          onClick={() => navigate("/settings")}
          className="flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground transition-colors haptic-btn"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back to Settings</span>
        </button>

        {/* Profile Photo */}
        <div className="glass-card rounded-[2rem] p-8 mb-6">
          <h3 className="text-xl font-semibold mb-6">Profile Photo</h3>
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-3xl overflow-hidden glass-card">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-3">
              <Button className="rounded-2xl haptic-btn">
                <Upload className="w-4 h-4 mr-2" />
                Upload New
              </Button>
              <Button variant="outline" className="rounded-2xl haptic-btn">
                <X className="w-4 h-4 mr-2" />
                Remove
              </Button>
            </div>
          </div>
        </div>

        {/* Personal Details */}
        <div className="glass-card rounded-[2rem] p-8 mb-6">
          <h3 className="text-xl font-semibold mb-6">Personal Details</h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="rounded-xl h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                value={formData.displayName}
                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                className="rounded-xl h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="flex gap-3">
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="rounded-xl h-12 flex-1"
                />
                <Button variant="outline" className="rounded-xl haptic-btn">
                  Verify Email
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">✓ Email verified</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country / Region</Label>
              <Select value={formData.country} onValueChange={(value) => setFormData({ ...formData, country: value })}>
                <SelectTrigger className="rounded-xl h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">Time Zone</Label>
              <Select value={formData.timezone} onValueChange={(value) => setFormData({ ...formData, timezone: value })}>
                <SelectTrigger className="rounded-xl h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                  <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                  <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                  <SelectItem value="Europe/London">GMT</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="glass-card rounded-[2rem] p-8 mb-6">
          <h3 className="text-xl font-semibold mb-6">Account Information</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-white/5">
              <span className="text-muted-foreground">Account ID</span>
              <span className="font-mono text-sm">USR-7A3K9P2X</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-white/5">
              <span className="text-muted-foreground">Date Joined</span>
              <span>January 15, 2024</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-muted-foreground">Email Status</span>
              <span className="text-neon-green">✓ Verified</span>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <Button className="w-full py-6 rounded-2xl text-lg font-semibold haptic-btn">
          Save Changes
        </Button>
      </motion.div>
    </div>
  );
}
