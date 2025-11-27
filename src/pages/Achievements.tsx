import { motion } from "framer-motion";
import { Crown, Download, Star, Clock, Flame, Share2, BookOpen, Lock, Trophy } from "lucide-react";
import { Header } from "@/components/Header";
import { mockAchievements, mockProgress } from "@/lib/achievementsData";

const iconMap = {
  Download,
  Star,
  Clock,
  Flame,
  Share2,
  BookOpen,
  Trophy
};

export default function Achievements() {
  const circumference = 2 * Math.PI * 70;
  const offset = circumference - (mockProgress.percentage / 100) * circumference;

  return (
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-black relative">
      <div className="relative z-10">
        <Header 
          title="Achievements" 
          subtitle="Track your milestones and earn badges"
        />

        <div className="container mx-auto px-4 py-8 space-y-8 max-w-7xl">
          {/* Hero Progress Card */}
          <div className="rounded-3xl border backdrop-blur-2xl bg-white/80 border-white/50 dark:bg-[#1c1c1e]/60 dark:border-white/10 shadow-lg dark:shadow-black/20 p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Progress Ring */}
              <div className="relative">
                <svg className="w-48 h-48 -rotate-90" viewBox="0 0 160 160">
                  {/* Background circle */}
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="12"
                    className="text-slate-300/20"
                  />
                  
                  {/* Progress circle */}
                  <motion.circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke="#FDB827"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </svg>
                
                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="text-4xl font-bold text-slate-900 dark:text-white"
                  >
                    {mockProgress.percentage}%
                  </motion.span>
                  <span className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider">COMPLETED</span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center gap-2 mb-3 justify-center md:justify-start">
                  <Crown className="w-6 h-6 text-[#FDB827]" />
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{mockProgress.level}</h2>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  You've unlocked {mockProgress.badges} out of {mockProgress.totalBadges} achievements. Keep practicing daily to reach the Master level!
                </p>
                
                <div className="flex items-center gap-8 justify-center md:justify-start">
                  <div className="text-center md:text-left">
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">{mockProgress.badges}</p>
                    <p className="text-xs uppercase tracking-widest text-slate-600 dark:text-slate-400">BADGES</p>
                  </div>
                  <div className="w-px h-12 bg-slate-300 dark:bg-slate-700" />
                  <div className="text-center md:text-left">
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">{mockProgress.points.toLocaleString()}</p>
                    <p className="text-xs uppercase tracking-widest text-slate-600 dark:text-slate-400">TOTAL POINTS</p>
                  </div>
                  <div className="w-px h-12 bg-slate-300 dark:bg-slate-700" />
                  <div className="text-center md:text-left">
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">#{mockProgress.rank}</p>
                    <p className="text-xs uppercase tracking-widest text-slate-600 dark:text-slate-400">RANK</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Milestones Section */}
          <div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Milestones</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockAchievements.milestones.map((achievement, index) => {
                const IconComponent = iconMap[achievement.icon as keyof typeof iconMap];
                return (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.01, y: -2 }}
                  >
                    <div className={`rounded-3xl border backdrop-blur-2xl bg-white/80 border-white/50 dark:bg-[#1c1c1e]/60 dark:border-white/10 shadow-lg dark:shadow-black/20 p-6 relative transition-all duration-300 ${!achievement.unlocked && "opacity-90"}`}>
                      {/* Icon */}
                      <div className={`w-20 h-20 rounded-2xl ${achievement.iconBg} flex items-center justify-center mb-4 shadow-lg ${!achievement.unlocked && "grayscale opacity-60"}`}>
                        <IconComponent className="w-10 h-10 text-white" />
                      </div>

                      {/* Badge */}
                      <div className="absolute top-6 right-6">
                        {achievement.unlocked ? (
                          <div className="px-3 py-1.5 rounded-full bg-[#FDB827]/20 text-[#B8860B] dark:text-[#FDB827] text-sm font-semibold flex items-center gap-1">
                            <Trophy className="w-4 h-4" />
                            {achievement.points} pts
                          </div>
                        ) : (
                          <div className="px-3 py-1.5 rounded-full bg-slate-300/50 dark:bg-slate-500/20 text-slate-600 dark:text-slate-500 text-sm font-semibold flex items-center gap-1">
                            <Lock className="w-4 h-4" />
                            Locked
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{achievement.title}</h4>
                      <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">{achievement.description}</p>

                      {/* Progress Bar */}
                      {!achievement.unlocked && (
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs uppercase tracking-widest text-slate-600 dark:text-slate-400">PROGRESS</span>
                            <span className="text-sm font-semibold text-slate-900 dark:text-white">{achievement.progress}%</span>
                          </div>
                          <div className="h-2 bg-slate-200 dark:bg-slate-700/30 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full ${
                                achievement.progress === 100 ? "bg-[#34C759]" : "bg-[#007AFF]"
                              } rounded-full`}
                              initial={{ width: 0 }}
                              animate={{ width: `${achievement.progress}%` }}
                              transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Streaks & Social Section */}
          <div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Streaks & Social</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockAchievements.streaksAndSocial.map((achievement, index) => {
                const IconComponent = iconMap[achievement.icon as keyof typeof iconMap];
                return (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.01, y: -2 }}
                  >
                    <div className={`rounded-3xl border backdrop-blur-2xl bg-white/80 border-white/50 dark:bg-[#1c1c1e]/60 dark:border-white/10 shadow-lg dark:shadow-black/20 p-6 relative transition-all duration-300 ${!achievement.unlocked && "opacity-90"}`}>
                      {/* Icon */}
                      <div className={`w-20 h-20 rounded-2xl ${achievement.iconBg} flex items-center justify-center mb-4 shadow-lg ${!achievement.unlocked && "grayscale opacity-60"}`}>
                        <IconComponent className="w-10 h-10 text-white" />
                      </div>

                      {/* Badge */}
                      <div className="absolute top-6 right-6">
                        {achievement.unlocked ? (
                          <div className="px-3 py-1.5 rounded-full bg-[#FDB827]/20 text-[#B8860B] dark:text-[#FDB827] text-sm font-semibold flex items-center gap-1">
                            <Trophy className="w-4 h-4" />
                            {achievement.points} pts
                          </div>
                        ) : (
                          <div className="px-3 py-1.5 rounded-full bg-slate-300/50 dark:bg-slate-500/20 text-slate-600 dark:text-slate-500 text-sm font-semibold flex items-center gap-1">
                            <Lock className="w-4 h-4" />
                            Locked
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{achievement.title}</h4>
                      <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">{achievement.description}</p>

                      {/* Progress Bar */}
                      {!achievement.unlocked && (
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs uppercase tracking-widest text-slate-600 dark:text-slate-400">PROGRESS</span>
                            <span className="text-sm font-semibold text-slate-900 dark:text-white">{achievement.progress}%</span>
                          </div>
                          <div className="h-2 bg-slate-200 dark:bg-slate-700/30 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-[#007AFF] rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${achievement.progress}%` }}
                              transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
