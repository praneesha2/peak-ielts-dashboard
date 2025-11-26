import { Header } from "@/components/Header";
import { motion } from "framer-motion";
import { ChevronLeft, Mail, MessageSquare, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ContactSupport() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Header title="Contact Support" subtitle="Get help from our team" />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-3xl mx-auto"
      >
        <button
          onClick={() => navigate("/settings")}
          className="flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground transition-colors haptic-btn"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back to Settings</span>
        </button>

        {/* Quick Contact Options */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="glass-card rounded-2xl p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-[#007AFF]/20 flex items-center justify-center mx-auto mb-3">
              <MessageSquare className="w-6 h-6" style={{ color: "#007AFF" }} />
            </div>
            <h4 className="font-semibold mb-2">Live Chat</h4>
            <p className="text-sm text-muted-foreground mb-3">Average response: 2 mins</p>
            <Button variant="outline" className="w-full rounded-xl haptic-btn">
              Start Chat
            </Button>
          </div>

          <div className="glass-card rounded-2xl p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-[#34C759]/20 flex items-center justify-center mx-auto mb-3">
              <Mail className="w-6 h-6" style={{ color: "#34C759" }} />
            </div>
            <h4 className="font-semibold mb-2">Email Support</h4>
            <p className="text-sm text-muted-foreground mb-3">Response within 24h</p>
            <Button variant="outline" className="w-full rounded-xl haptic-btn">
              Send Email
            </Button>
          </div>

          <div className="glass-card rounded-2xl p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-[#AF52DE]/20 flex items-center justify-center mx-auto mb-3">
              <MessageSquare className="w-6 h-6" style={{ color: "#AF52DE" }} />
            </div>
            <h4 className="font-semibold mb-2">Help Center</h4>
            <p className="text-sm text-muted-foreground mb-3">Self-service articles</p>
            <Button variant="outline" className="w-full rounded-xl haptic-btn">
              Browse Articles
            </Button>
          </div>
        </div>

        {/* Contact Form */}
        <div className="glass-card rounded-[2rem] p-8 mb-6">
          <h3 className="text-xl font-semibold mb-6">Submit a Request</h3>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                defaultValue="Alex Johnson"
                className="rounded-xl h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                defaultValue="alex.johnson@example.com"
                className="rounded-xl h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="issueType">Issue Type</Label>
              <Select defaultValue="technical">
                <SelectTrigger id="issueType" className="rounded-xl h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technical">Technical Issue</SelectItem>
                  <SelectItem value="billing">Billing Question</SelectItem>
                  <SelectItem value="feedback">Feedback</SelectItem>
                  <SelectItem value="account">Account Issue</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Please describe your issue in detail..."
                className="rounded-xl min-h-[150px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="attachment">Attachment (Optional)</Label>
              <div className="glass-card rounded-xl p-6 border-2 border-dashed border-white/20 hover:border-primary/50 transition-colors cursor-pointer">
                <div className="flex flex-col items-center gap-2">
                  <Upload className="w-8 h-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG, PDF up to 10MB
                  </p>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full py-4 rounded-2xl text-lg haptic-btn">
              Submit Request
            </Button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="glass-card rounded-[2rem] p-8">
          <h3 className="text-xl font-semibold mb-4">Direct Contact</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-4 glass-card rounded-2xl">
              <Mail className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">support@peakielts.com</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
