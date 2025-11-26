import { Header } from "@/components/Header";
import { CircularProgress } from "@/components/CircularProgress";
import { ProgressBar } from "@/components/ProgressBar";
import { Mic, TrendingUp, Calendar, Clock, ChevronRight, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { mockSkills, mockLatestSession, mockTips } from "@/lib/mockData";

export default function Dashboard() {
  return (
    <div className="min-h-screen">
      <Header title="Hello, Alex" subtitle="Track your progress and improve your skills" />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Stats Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="lg:col-span-2 glass-card rounded-[2rem] p-8"
        >
          <div className="flex items-start justify-between mb-8">
            <h2 className="text-2xl font-semibold">Current Band Score</h2>
            <button className="px-4 py-2 rounded-xl glass-card haptic-btn text-sm hover:bg-white/5">
              View History
            </button>
          </div>

          <div className="grid md:grid-cols-[240px_1fr] gap-12">
            {/* Circular Progress */}
            <div className="flex flex-col items-center">
              <CircularProgress value={6.0} max={9} label="BAND SCORE" className="w-48 h-48" />
              <div className="mt-6 px-6 py-2 rounded-full bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30">
                <span className="text-sm font-medium text-yellow-500">Competent User</span>
              </div>
            </div>

            {/* Progress Bars */}
            <div className="space-y-6">
              {mockSkills.map((skill) => (
                <ProgressBar key={skill.label} {...skill} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Quick Tips Sidebar */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Quick Tips</h3>
            <Zap className="w-5 h-5 text-yellow-500" />
          </div>
          {mockTips.map((tip, i) => (
            <motion.div
              key={i}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="glass-card rounded-2xl p-4 hover:bg-white/5 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full bg-neon-${tip.color} mt-2`} />
                <div>
                  <h4 className="font-medium mb-1">{tip.text}</h4>
                  <p className="text-sm text-muted-foreground">{tip.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Action Cards */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-[2rem] p-6 bg-gradient-to-br from-blue-600/40 to-purple-600/40 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-xl" />
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mb-4">
              <Mic className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">Speaking Test</h3>
            <p className="text-sm text-foreground/80 mb-6">
              Simulates a real examiner environment.
            </p>
            <button className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold haptic-btn hover:bg-primary/90 flex items-center justify-center gap-2">
              Start Test
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-[2rem] p-6"
        >
          <div className="w-14 h-14 rounded-2xl bg-neon-green/20 flex items-center justify-center mb-4">
            <TrendingUp className="w-7 h-7 text-neon-green" />
          </div>
          <h3 className="text-2xl font-semibold mb-2">Analytics</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Analyze your improvement over time.
          </p>
          <button className="w-full py-4 rounded-2xl glass-card font-semibold haptic-btn hover:bg-white/5 flex items-center justify-center gap-2">
            Details
            <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Latest Session */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 glass-card rounded-[2rem] p-8"
        >
          <h3 className="text-2xl font-semibold mb-6">Latest Test Session</h3>
          <div className="grid md:grid-cols-[1fr_2fr] gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary" />
                <span className="text-lg">{mockLatestSession.date}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-muted-foreground" />
                <span className="text-muted-foreground">{mockLatestSession.duration} duration</span>
              </div>
              <div className="inline-block px-4 py-2 rounded-xl bg-primary/20 text-primary text-sm font-medium">
                {mockLatestSession.type}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {mockLatestSession.scores.map((score, i) => (
                <div key={i} className="glass-card rounded-2xl p-4">
                  <div className="text-xs text-muted-foreground mb-1">{score.label}</div>
                  <div className="text-3xl font-bold">{score.value}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Pro Plan CTA */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="glass-card rounded-[2rem] p-6 bg-gradient-to-br from-purple-600/40 to-blue-600/40 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-xl" />
          <div className="relative z-10">
            <h3 className="text-2xl font-semibold mb-2">Pro Plan</h3>
            <p className="text-sm text-foreground/80 mb-6">Unlimited mock tests.</p>
            <button className="px-8 py-3 rounded-2xl bg-white text-purple-600 font-semibold haptic-btn hover:bg-white/90">
              Upgrade Now
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
