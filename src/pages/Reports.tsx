import { motion } from "framer-motion";
import {
  AlertCircle,
  Sparkles,
  ArrowRight,
  ListTodo,
  Mic,
  History,
  Download,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  Lightbulb,
  Target,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

// Mock data
const performanceData = {
  fluency: { score: 7.5, trend: [6.5, 6.8, 7.0, 7.2, 7.5, 7.5] },
  lexical: { score: 7.0, trend: [6.0, 6.2, 6.5, 6.8, 7.0, 7.0] },
  grammar: { score: 6.5, trend: [5.5, 5.8, 6.0, 6.2, 6.5, 6.5] },
  pronunciation: { score: 7.0, trend: [6.5, 6.5, 6.8, 7.0, 7.0, 7.0] },
};

const corrections = [
  {
    id: 1,
    original: "I have been living in this city since 5 years.",
    corrected: "I have been living in this city for 5 years.",
    insight: "Use 'for' with periods of time (5 years, 2 months) and 'since' with specific points in time (2019, last summer).",
  },
  {
    id: 2,
    original: "The informations are very useful for my research.",
    corrected: "The information is very useful for my research.",
    insight: "'Information' is an uncountable noun in English and doesn't take a plural form.",
  },
  {
    id: 3,
    original: "I am interesting in learning new languages.",
    corrected: "I am interested in learning new languages.",
    insight: "Use '-ed' adjectives to describe how someone feels, and '-ing' adjectives to describe what causes the feeling.",
  },
];

const nativeTransformations = [
  {
    original: "I think this is a good idea.",
    improved: "I'd say this is quite a solid idea.",
    badge: "Band 9 Style",
  },
  {
    original: "Many people have this problem.",
    improved: "This is a fairly common issue that a lot of people face.",
    badge: "Natural Flow",
  },
];

const suggestedIdioms = [
  {
    idiom: "Hit the ground running",
    context: "Starting something with full energy",
    usage: "When discussing how you approached your new job",
  },
  {
    idiom: "A piece of cake",
    context: "Something very easy",
    usage: "When describing tasks you find simple",
  },
];

const improvementSteps = [
  { number: 1, title: "Master Article Usage", description: "Focus on when to use 'a', 'an', and 'the' in context." },
  { number: 2, title: "Expand Vocabulary Range", description: "Learn 5 new topic-specific collocations daily." },
  { number: 3, title: "Practice Connected Speech", description: "Work on linking words naturally when speaking." },
  { number: 4, title: "Record & Self-Evaluate", description: "Record yourself and compare with native speakers." },
];

// Sparkline component
function Sparkline({ data, color }: { data: number[]; color: string }) {
  const chartData = data.map((value, index) => ({ value, index }));
  return (
    <ResponsiveContainer width={80} height={32}>
      <LineChart data={chartData}>
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

// Circular Progress Ring
function CircularProgressRing({ score }: { score: number }) {
  const percentage = (score / 9) * 100;
  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-72 h-72">
      {/* Ambient glow */}
      <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl" />
      
      <svg className="w-full h-full -rotate-90" viewBox="0 0 280 280">
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--neon-blue))" />
            <stop offset="100%" stopColor="hsl(var(--neon-purple))" />
          </linearGradient>
        </defs>
        {/* Background track */}
        <circle
          cx="140"
          cy="140"
          r="120"
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth="12"
        />
        {/* Progress track */}
        <circle
          cx="140"
          cy="140"
          r="120"
          fill="none"
          stroke="url(#scoreGradient)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000"
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-6xl font-bold text-foreground">{score}</span>
        <span className="text-sm text-muted-foreground uppercase tracking-widest mt-2">Band Score</span>
      </div>
    </div>
  );
}

// Performance Card
function PerformanceCard({ 
  title, 
  score, 
  insight, 
  data 
}: { 
  title: string; 
  score: number; 
  insight: string; 
  data: number[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-[2rem] p-6"
    >
      <div className="flex justify-between items-start mb-4">
        <span className="text-muted-foreground text-sm font-medium">{title}</span>
        <span className="text-2xl font-bold text-primary">{score}</span>
      </div>
      <div className="flex justify-between items-end">
        <p className="text-muted-foreground text-xs max-w-[60%]">{insight}</p>
        <Sparkline data={data} color="hsl(var(--primary))" />
      </div>
    </motion.div>
  );
}

// Correction Accordion Item
function CorrectionItem({ correction }: { correction: typeof corrections[0] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-start gap-3 p-4 text-left"
      >
        <X className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
        <span className="text-foreground italic flex-1">"{correction.original}"</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        )}
      </button>
      
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="px-4 pb-4"
        >
          <div className="flex items-start gap-3 mb-3">
            <Check className="w-5 h-5 text-neon-green mt-0.5 flex-shrink-0" />
            <span className="text-neon-green">"{correction.corrected}"</span>
          </div>
          <div className="bg-secondary/50 rounded-xl p-4">
            <div className="flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-muted-foreground text-sm">{correction.insight}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default function Reports() {
  return (
    <div className="min-h-screen pb-32">
      {/* Hero Section */}
      <section className="py-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          {/* Left - Greeting */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl lg:text-5xl font-bold mb-4"
            >
              Great work, Sarah 🔥
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-lg mb-6"
            >
              Your speaking skills are improving steadily. Here's your latest analysis.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex gap-3"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <TrendingUp className="w-4 h-4" />
                Fluency Up
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                New Vocabulary
              </span>
            </motion.div>
          </div>

          {/* Right - Score Ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <CircularProgressRing score={7.5} />
          </motion.div>
        </div>
      </section>

      {/* Performance Grid */}
      <section className="py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <PerformanceCard
            title="Fluency & Coherence"
            score={performanceData.fluency.score}
            insight="Speaks smoothly with natural pauses"
            data={performanceData.fluency.trend}
          />
          <PerformanceCard
            title="Lexical Resource"
            score={performanceData.lexical.score}
            insight="Good range of vocabulary"
            data={performanceData.lexical.trend}
          />
          <PerformanceCard
            title="Grammar Range"
            score={performanceData.grammar.score}
            insight="Minor errors in complex structures"
            data={performanceData.grammar.trend}
          />
          <PerformanceCard
            title="Pronunciation"
            score={performanceData.pronunciation.score}
            insight="Clear with slight L1 influence"
            data={performanceData.pronunciation.trend}
          />
        </div>
      </section>

      {/* Main Analysis Section */}
      <section className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Detailed Feedback */}
          <div className="space-y-8">
            {/* Corrections Section */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-5 h-5 text-destructive" />
                <h2 className="text-xl font-semibold">Corrections</h2>
              </div>
              <div className="space-y-3">
                {corrections.map((correction) => (
                  <CorrectionItem key={correction.id} correction={correction} />
                ))}
              </div>
            </div>

            {/* Native Transformations */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-5 h-5 text-neon-green" />
                <h2 className="text-xl font-semibold">Native Transformations</h2>
              </div>
              <div className="space-y-4">
                {nativeTransformations.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card rounded-2xl p-5"
                  >
                    <span className="inline-block px-3 py-1 rounded-full border border-neon-green/50 text-neon-green text-xs font-medium mb-4">
                      {item.badge}
                    </span>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <p className="text-muted-foreground line-through">{item.original}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-primary flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-foreground">{item.improved}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Smart Insights */}
          <div className="space-y-6">
            {/* Coach's Insight */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-[2rem] p-6 bg-gradient-to-br from-primary/5 to-accent/5"
            >
              <h3 className="text-lg font-semibold mb-4">Coach's Insight</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-neon-green mt-2 shadow-[0_0_8px_hsl(var(--neon-green))]" />
                  <span className="text-foreground/80">Excellent use of complex sentence structures in Part 3</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-neon-green mt-2 shadow-[0_0_8px_hsl(var(--neon-green))]" />
                  <span className="text-foreground/80">Good topic development with relevant examples</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 shadow-[0_0_8px_hsl(var(--primary))]" />
                  <span className="text-foreground/80">Work on reducing hesitation markers like "um" and "uh"</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 shadow-[0_0_8px_hsl(var(--primary))]" />
                  <span className="text-foreground/80">Practice word stress on multi-syllable words</span>
                </li>
              </ul>
            </motion.div>

            {/* Suggested Idioms */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Suggested Idioms</h3>
              <div className="space-y-4">
                {suggestedIdioms.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                    className="glass-card rounded-2xl p-5"
                  >
                    <h4 className="text-primary font-medium mb-1">{item.idiom}</h4>
                    <p className="text-muted-foreground text-sm mb-4">{item.context}</p>
                    <div className="border-l-2 border-primary pl-4">
                      <p className="text-foreground/80 text-sm">
                        <span className="text-muted-foreground">Try using here: </span>
                        {item.usage}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Next Focus */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative rounded-[2rem] p-[1px] bg-gradient-to-r from-primary to-accent"
            >
              <div className="glass-card rounded-[2rem] p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Target className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">Next Focus</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Practice discussing environmental topics using conditionals and hypothetical language.
                </p>
                <button className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
                  Practice This Topic
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Improvement Plan */}
      <section className="py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative glass-card rounded-[2rem] p-8 overflow-hidden"
        >
          {/* Ambient glow */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-neon-green/10 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <ListTodo className="w-6 h-6 text-neon-green" />
              <h2 className="text-2xl font-semibold">Improvement Plan</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {improvementSteps.map((step) => (
                <motion.div
                  key={step.number}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-secondary/30 border border-border group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-neon-green/10 flex items-center justify-center group-hover:bg-neon-green transition-colors">
                    <span className="text-neon-green font-bold group-hover:text-primary-foreground transition-colors">
                      {step.number}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">{step.title}</h4>
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Action Bar */}
      <section className="fixed bottom-0 left-0 right-0 py-6 bg-background/80 backdrop-blur-xl border-t border-border">
        <div className="flex items-center justify-center gap-4 px-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold"
          >
            <Mic className="w-5 h-5" />
            Practice Again
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-6 py-4 rounded-2xl glass-card font-medium"
          >
            <History className="w-5 h-5" />
            Past Reports
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-6 py-4 rounded-2xl glass-card text-muted-foreground font-medium"
          >
            <Download className="w-5 h-5" />
            PDF
          </motion.button>
        </div>
      </section>
    </div>
  );
}
