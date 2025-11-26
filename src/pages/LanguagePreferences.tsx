import { Header } from "@/components/Header";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function LanguagePreferences() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");
  const [accent, setAccent] = useState("british");

  return (
    <div className="min-h-screen">
      <Header title="Language & Region" subtitle="Customize your language preferences" />

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

        {/* App Language */}
        <div className="glass-card rounded-[2rem] p-8 mb-6">
          <h3 className="text-xl font-semibold mb-6">App Interface Language</h3>
          <div className="space-y-2">
            <Label htmlFor="language">Select Language</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger id="language" className="rounded-xl h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
                <SelectItem value="zh">中文</SelectItem>
                <SelectItem value="ja">日本語</SelectItem>
                <SelectItem value="ar">العربية</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground mt-2">
              Change the language of the app interface
            </p>
          </div>
        </div>

        {/* Voice Accent */}
        <div className="glass-card rounded-[2rem] p-8 mb-6">
          <h3 className="text-xl font-semibold mb-6">Voice Accent Preference</h3>
          <RadioGroup value={accent} onValueChange={setAccent} className="space-y-4">
            <div className="flex items-center space-x-4 p-4 glass-card rounded-2xl hover:bg-white/5 transition-colors cursor-pointer">
              <RadioGroupItem value="british" id="british" className="border-2" />
              <Label htmlFor="british" className="flex-1 cursor-pointer">
                <div className="font-medium">British English</div>
                <div className="text-sm text-muted-foreground">UK pronunciation and vocabulary</div>
              </Label>
            </div>

            <div className="flex items-center space-x-4 p-4 glass-card rounded-2xl hover:bg-white/5 transition-colors cursor-pointer">
              <RadioGroupItem value="american" id="american" className="border-2" />
              <Label htmlFor="american" className="flex-1 cursor-pointer">
                <div className="font-medium">American English</div>
                <div className="text-sm text-muted-foreground">US pronunciation and vocabulary</div>
              </Label>
            </div>

            <div className="flex items-center space-x-4 p-4 glass-card rounded-2xl hover:bg-white/5 transition-colors cursor-pointer">
              <RadioGroupItem value="australian" id="australian" className="border-2" />
              <Label htmlFor="australian" className="flex-1 cursor-pointer">
                <div className="font-medium">Australian English</div>
                <div className="text-sm text-muted-foreground">Australian pronunciation and vocabulary</div>
              </Label>
            </div>

            <div className="flex items-center space-x-4 p-4 glass-card rounded-2xl hover:bg-white/5 transition-colors cursor-pointer">
              <RadioGroupItem value="mixed" id="mixed" className="border-2" />
              <Label htmlFor="mixed" className="flex-1 cursor-pointer">
                <div className="font-medium">Mixed</div>
                <div className="text-sm text-muted-foreground">Variety of accents for practice</div>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <Button className="w-full py-6 rounded-2xl text-lg font-semibold haptic-btn">
          Save Preferences
        </Button>
      </motion.div>
    </div>
  );
}
