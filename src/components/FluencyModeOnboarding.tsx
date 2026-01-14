import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Cpu, 
  Users, 
  Briefcase, 
  Map, 
  Leaf, 
  Film,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Music,
  Trophy,
  Utensils,
  Heart,
  BookOpen,
  Palette,
  Plane,
  Home,
  Gamepad2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FluencyModeOnboardingProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (preferences: UserPreferences) => void;
}

interface UserPreferences {
  topics: string[];
  thought: string;
  mood: string;
}

const topics = [
  { id: "technology", label: "Technology", icon: Cpu },
  { id: "society", label: "Society & Culture", icon: Users },
  { id: "business", label: "Business", icon: Briefcase },
  { id: "travel", label: "Travel", icon: Plane },
  { id: "environment", label: "Environment", icon: Leaf },
  { id: "movies", label: "Movies & TV", icon: Film },
  { id: "music", label: "Music", icon: Music },
  { id: "sports", label: "Sports", icon: Trophy },
  { id: "food", label: "Food & Cooking", icon: Utensils },
  { id: "health", label: "Health & Wellness", icon: Heart },
  { id: "education", label: "Education", icon: BookOpen },
  { id: "art", label: "Art & Design", icon: Palette },
  { id: "lifestyle", label: "Lifestyle", icon: Home },
  { id: "gaming", label: "Gaming", icon: Gamepad2 },
];

const thoughts = [
  { id: "trends", label: "I want to discuss recent news or trends.", description: "Stay current with what's happening" },
  { id: "opinion", label: "I have a strong opinion I want to defend.", description: "Practice argumentation skills" },
  { id: "personal", label: "I just want to share a personal experience.", description: "Casual and reflective" },
];

const moods = [
  { id: "relaxed", label: "Relaxed", description: "Low pressure, casual chat", emoji: "😌" },
  { id: "confident", label: "Confident", description: "Practice leading the conversation", emoji: "💪" },
  { id: "challenged", label: "Challenged", description: "Deep, complex questions", emoji: "🧠" },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

export function FluencyModeOnboarding({ isOpen, onClose, onComplete }: FluencyModeOnboardingProps) {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [preferences, setPreferences] = useState<UserPreferences>({
    topics: [],
    thought: "",
    mood: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleTopicToggle = (topicId: string) => {
    setPreferences(prev => ({
      ...prev,
      topics: prev.topics.includes(topicId)
        ? prev.topics.filter(t => t !== topicId)
        : [...prev.topics, topicId]
    }));
  };

  const handleTopicsContinue = () => {
    if (preferences.topics.length > 0) {
      setDirection(1);
      setStep(2);
    }
  };

  const handleThoughtSelect = (thoughtId: string) => {
    setPreferences(prev => ({ ...prev, thought: thoughtId }));
    setTimeout(() => {
      setDirection(1);
      setStep(3);
    }, 300);
  };

  const handleMoodSelect = (moodId: string) => {
    setPreferences(prev => ({ ...prev, mood: moodId }));
    setTimeout(() => {
      setDirection(1);
      setStep(4);
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 2000);
    }, 300);
  };

  const handleBack = () => {
    setDirection(-1);
    setStep(prev => prev - 1);
  };

  const handleStart = () => {
    onComplete(preferences);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Main Card */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        className={cn(
          "relative w-full max-w-2xl overflow-hidden rounded-3xl",
          "bg-white/80 dark:bg-[#1c1c1e]/80",
          "backdrop-blur-2xl",
          "border border-white/50 dark:border-white/10",
          "shadow-2xl shadow-black/10 dark:shadow-black/40"
        )}
      >
        {/* Progress Bar */}
        <div className="h-1 bg-muted">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: `${(step / 4) * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
          {step > 1 && step < 4 ? (
            <button
              onClick={handleBack}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          ) : (
            <div />
          )}
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground">Fluency Mode</span>
          </div>
          <span className="text-xs text-muted-foreground">Step {step} of 4</span>
        </div>

        {/* Content */}
        <div className="relative min-h-[480px] p-6 overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="space-y-6"
              >
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold text-foreground">What interests you today?</h2>
                  <p className="text-muted-foreground">Select one or more topics to personalize your conversation</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[300px] overflow-y-auto pr-1">
                  {topics.map((topic) => {
                    const Icon = topic.icon;
                    const isSelected = preferences.topics.includes(topic.id);
                    return (
                      <motion.button
                        key={topic.id}
                        onClick={() => handleTopicToggle(topic.id)}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className={cn(
                          "relative flex flex-col items-center justify-center gap-2 p-4 rounded-2xl",
                          "bg-muted/50 dark:bg-white/5",
                          "border-2 transition-all duration-200",
                          isSelected 
                            ? "border-primary bg-primary/10 dark:bg-primary/20" 
                            : "border-transparent hover:border-primary/30 hover:bg-muted"
                        )}
                      >
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center"
                          >
                            <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </motion.div>
                        )}
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center",
                          "bg-primary/10 dark:bg-primary/20"
                        )}>
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-xs font-medium text-foreground text-center">{topic.label}</span>
                      </motion.button>
                    );
                  })}
                </div>

                <div className="flex justify-center pt-2">
                  <motion.button
                    onClick={handleTopicsContinue}
                    disabled={preferences.topics.length === 0}
                    whileHover={{ scale: preferences.topics.length > 0 ? 1.02 : 1 }}
                    whileTap={{ scale: preferences.topics.length > 0 ? 0.98 : 1 }}
                    className={cn(
                      "flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all",
                      preferences.topics.length > 0
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    )}
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                    {preferences.topics.length > 0 && (
                      <span className="ml-1 px-2 py-0.5 text-xs bg-primary-foreground/20 rounded-full">
                        {preferences.topics.length} selected
                      </span>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="space-y-6"
              >
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold text-foreground">What's on your mind?</h2>
                  <p className="text-muted-foreground">Tell us how you'd like to approach this topic</p>
                </div>

                <div className="space-y-3">
                  {thoughts.map((thought) => {
                    const isSelected = preferences.thought === thought.id;
                    return (
                      <motion.button
                        key={thought.id}
                        onClick={() => handleThoughtSelect(thought.id)}
                        whileHover={{ scale: 1.01, x: 4 }}
                        whileTap={{ scale: 0.99 }}
                        className={cn(
                          "w-full text-left p-5 rounded-2xl",
                          "bg-muted/50 dark:bg-white/5",
                          "border-2 transition-all duration-200",
                          isSelected 
                            ? "border-primary bg-primary/10 dark:bg-primary/20" 
                            : "border-transparent hover:border-primary/30 hover:bg-muted"
                        )}
                      >
                        <p className="font-medium text-foreground">{thought.label}</p>
                        <p className="text-sm text-muted-foreground mt-1">{thought.description}</p>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="space-y-6"
              >
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold text-foreground">How do you want to feel?</h2>
                  <p className="text-muted-foreground">Set the tone for your practice session</p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {moods.map((mood) => {
                    const isSelected = preferences.mood === mood.id;
                    return (
                      <motion.button
                        key={mood.id}
                        onClick={() => handleMoodSelect(mood.id)}
                        whileHover={{ scale: 1.03, y: -4 }}
                        whileTap={{ scale: 0.97 }}
                        className={cn(
                          "flex flex-col items-center justify-center gap-3 p-6 rounded-2xl",
                          "bg-muted/50 dark:bg-white/5",
                          "border-2 transition-all duration-200",
                          isSelected 
                            ? "border-primary bg-primary/10 dark:bg-primary/20" 
                            : "border-transparent hover:border-primary/30 hover:bg-muted"
                        )}
                      >
                        <span className="text-3xl">{mood.emoji}</span>
                        <div className="text-center">
                          <p className="font-semibold text-foreground">{mood.label}</p>
                          <p className="text-xs text-muted-foreground mt-1">{mood.description}</p>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="flex flex-col items-center justify-center h-[350px] space-y-8"
              >
                {isLoading ? (
                  <>
                    {/* Pulsing Loader */}
                    <div className="relative">
                      <motion.div
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="w-20 h-20 rounded-full bg-primary/20"
                      />
                      <motion.div
                        animate={{ 
                          scale: [1, 1.3, 1],
                          opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.3
                        }}
                        className="absolute inset-0 w-20 h-20 rounded-full bg-primary/10"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Sparkles className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                    <div className="text-center space-y-2">
                      <h2 className="text-xl font-semibold text-foreground">Aligning with your interests...</h2>
                      <p className="text-sm text-muted-foreground">Preparing your personalized experience</p>
                    </div>
                  </>
                ) : (
                  <>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                      className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.4 }}
                      >
                        <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <motion.path
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </motion.div>
                    </motion.div>

                    <div className="text-center space-y-2">
                      <h2 className="text-xl font-semibold text-foreground">You're all set!</h2>
                      <p className="text-sm text-muted-foreground">Your AI partner is ready to chat</p>
                    </div>

                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      onClick={handleStart}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        "px-8 py-4 rounded-2xl",
                        "bg-primary text-primary-foreground",
                        "font-semibold text-lg",
                        "shadow-lg shadow-primary/25",
                        "hover:shadow-xl hover:shadow-primary/30",
                        "transition-shadow duration-300"
                      )}
                    >
                      Start Conversation
                    </motion.button>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
