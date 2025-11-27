import { motion } from "framer-motion";
import { Crown, Download, Star, Clock, Flame, Share2, BookOpen, Lock, Trophy } from "lucide-react";
import { Header } from "@/components/Header";
import { GlassCard } from "@/components/GlassCard";
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
      {/* Background Blobs - Light Mode Only */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none dark:hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative z-10">
        <Header 
          title="Achievements" 
          subtitle="Track your milestones and earn badges"
        />

        <div className="container mx-auto px-4 py-8 space-y-8 max-w-7xl">
          {/* Hero Progress Card */}
          <GlassCard className="p-8">
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
                    stroke="#FFD700"
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
                  <Crown className="w-6 h-6 text-[#FFD700]" />
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{mockProgress.level}</h2>
                </div>
                <p className="text-slate-500 dark:text-slate-400 mb-6">
                  You've unlocked {mockProgress.badges} out of {mockProgress.totalBadges} achievements. Keep practicing daily to reach the Master level!
                </p>
                
                <div className="flex items-center gap-8 justify-center md:justify-start">
                  <div className="text-center md:text-left">
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">{mockProgress.badges}</p>
                    <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">BADGES</p>
                  </div>
                  <div className="w-px h-12 bg-slate-300 dark:bg-slate-700" />
                  <div className="text-center md:text-left">
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">{mockProgress.points.toLocaleString()}</p>
                    <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">TOTAL POINTS</p>
                  </div>
                  <div className="w-px h-12 bg-slate-300 dark:bg-slate-700" />
                  <div className="text-center md:text-left">
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">#{mockProgress.rank}</p>
                    <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">RANK</p>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>

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
                  >
                    <GlassCard 
                      hoverEffect 
                      className={`p-6 relative ${!achievement.unlocked && "opacity-80"}`}
                    >
                      {/* Icon */}
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${achievement.iconBg} flex items-center justify-center mb-4 ${!achievement.unlocked && "grayscale"}`}>
                        <IconComponent className="w-10 h-10 text-white" />
                      </div>

                      {/* Badge */}
                      <div className="absolute top-6 right-6">
                        {achievement.unlocked ? (
                          <div className="px-3 py-1.5 rounded-full bg-[#FFD700]/20 text-[#FFD700] text-sm font-semibold flex items-center gap-1">
                            <Trophy className="w-4 h-4" />
                            {achievement.points} pts
                          </div>
                        ) : (
                          <div className="px-3 py-1.5 rounded-full bg-slate-500/20 text-slate-500 text-sm font-semibold flex items-center gap-1">
                            <Lock className="w-4 h-4" />
                            Locked
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{achievement.title}</h4>
                      <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">{achievement.description}</p>

                      {/* Progress Bar */}
                      {!achievement.unlocked && (
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">PROGRESS</span>
                            <span className="text-sm font-semibold text-slate-900 dark:text-white">{achievement.progress}%</span>
                          </div>
                          <div className="h-2 bg-slate-300/30 dark:bg-slate-700/30 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full ${
                                achievement.progress === 100 ? "bg-green-500" : "bg-blue-500"
                              } rounded-full`}
                              initial={{ width: 0 }}
                              animate={{ width: `${achievement.progress}%` }}
                              transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                            />
                          </div>
                        </div>
                      )}
                    </GlassCard>
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
                  >
                    <GlassCard 
                      hoverEffect 
                      className={`p-6 relative ${!achievement.unlocked && "opacity-80"}`}
                    >
                      {/* Icon */}
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${achievement.iconBg} flex items-center justify-center mb-4 ${!achievement.unlocked && "grayscale"}`}>
                        <IconComponent className="w-10 h-10 text-white" />
                      </div>

                      {/* Badge */}
                      <div className="absolute top-6 right-6">
                        {achievement.unlocked ? (
                          <div className="px-3 py-1.5 rounded-full bg-[#FFD700]/20 text-[#FFD700] text-sm font-semibold flex items-center gap-1">
                            <Trophy className="w-4 h-4" />
                            {achievement.points} pts
                          </div>
                        ) : (
                          <div className="px-3 py-1.5 rounded-full bg-slate-500/20 text-slate-500 text-sm font-semibold flex items-center gap-1">
                            <Lock className="w-4 h-4" />
                            Locked
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{achievement.title}</h4>
                      <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">{achievement.description}</p>

                      {/* Progress Bar */}
                      {!achievement.unlocked && (
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">PROGRESS</span>
                            <span className="text-sm font-semibold text-slate-900 dark:text-white">{achievement.progress}%</span>
                          </div>
                          <div className="h-2 bg-slate-300/30 dark:bg-slate-700/30 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-blue-500 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${achievement.progress}%` }}
                              transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                            />
                          </div>
                        </div>
                      )}
                    </GlassCard>
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
