import { Header } from "@/components/Header";
import { motion } from "framer-motion";
import { ChevronLeft, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ReportProblem() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Header title="Report a Problem" subtitle="Help us improve by reporting bugs" />

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

        {/* Bug Report Form */}
        <div className="glass-card rounded-[2rem] p-8 mb-6">
          <h3 className="text-xl font-semibold mb-6">Bug Report</h3>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="category">Problem Category</Label>
              <Select>
                <SelectTrigger id="category" className="rounded-xl h-12">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ui">User Interface</SelectItem>
                  <SelectItem value="audio">Audio/Recording</SelectItem>
                  <SelectItem value="performance">Performance Issue</SelectItem>
                  <SelectItem value="scoring">Scoring Problem</SelectItem>
                  <SelectItem value="login">Login/Authentication</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Problem Description</Label>
              <Textarea
                id="description"
                placeholder="What went wrong? Please be as detailed as possible..."
                className="rounded-xl min-h-[120px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="steps">Steps to Reproduce</Label>
              <Textarea
                id="steps"
                placeholder="1. Go to...&#10;2. Click on...&#10;3. See error..."
                className="rounded-xl min-h-[120px]"
              />
            </div>

            <div className="space-y-2">
              <Label>Attach Files</Label>
              <div className="glass-card rounded-xl p-6 border-2 border-dashed border-white/20 hover:border-primary/50 transition-colors cursor-pointer">
                <div className="flex flex-col items-center gap-2">
                  <Upload className="w-8 h-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Upload screenshots or recordings
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG, MP4, MP3 up to 20MB
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* System Information */}
        <div className="glass-card rounded-[2rem] p-8 mb-6">
          <h3 className="text-xl font-semibold mb-6">System Information</h3>
          <p className="text-sm text-muted-foreground mb-4">
            This information helps us debug the issue faster
          </p>
          <div className="space-y-3">
            <div className="flex justify-between py-3 border-b border-white/5">
              <span className="text-muted-foreground">Device</span>
              <span className="font-medium">MacBook Pro 14" (2024)</span>
            </div>
            <div className="flex justify-between py-3 border-b border-white/5">
              <span className="text-muted-foreground">Browser</span>
              <span className="font-medium">Chrome 120.0.6099.109</span>
            </div>
            <div className="flex justify-between py-3 border-b border-white/5">
              <span className="text-muted-foreground">Operating System</span>
              <span className="font-medium">macOS Sonoma 14.2</span>
            </div>
            <div className="flex justify-between py-3">
              <span className="text-muted-foreground">Screen Resolution</span>
              <span className="font-medium">3024 × 1964</span>
            </div>
          </div>
        </div>

        <Button className="w-full py-6 rounded-2xl text-lg font-semibold haptic-btn">
          Submit Bug Report
        </Button>
      </motion.div>
    </div>
  );
}
