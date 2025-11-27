import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, ChevronRight, Clock, FileText, Activity, Zap, BookOpen, Check, Mic } from "lucide-react";
import { Header } from "@/components/Header";
import { GlassCard } from "@/components/GlassCard";
import { SegmentedControl } from "@/components/SegmentedControl";
import { Sparkline } from "@/components/Sparkline";
import { mockChartData, mockSkillTrends, mockKeyMetrics, mockRecentSessions } from "@/lib/analyticsData";

const iconMap = {
  Clock,
  FileText,
  Activity,
  Zap,
  BookOpen,
  Check,
  Mic
};

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("Week");

  const getScoreColor = (score: number) => {
    if (score >= 7.0) return "text-green-500";
    if (score >= 6.0) return "text-blue-500";
    return "text-orange-500";
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-black relative">
      {/* Background Blobs - Light Mode Only */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none dark:hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative z-10">
        <Header 
          title="Analytics" 
          subtitle="Performance insights and history"
        />

        <div className="container mx-auto px-4 py-8 space-y-8 max-w-7xl">
          {/* Header with Time Range */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Performance</h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1">Insights across your speaking journey.</p>
            </div>
            <SegmentedControl 
              options={["Week", "Month", "Year"]}
              selected={timeRange}
              onChange={setTimeRange}
            />
          </div>

          {/* Main Chart */}
          <GlassCard className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">AVERAGE BAND SCORE</p>
                <h2 className="text-5xl font-bold text-slate-900 dark:text-white">6.8</h2>
              </div>
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-green-500/10 text-green-500">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-semibold">+0.5</span>
              </div>
            </div>

            {/* SVG Chart */}
            <div className="relative h-64">
              <svg viewBox="0 0 600 200" className="w-full h-full">
                {/* Grid Lines */}
                {[0, 1, 2, 3, 4].map((i) => (
                  <line
                    key={i}
                    x1="0"
                    y1={i * 50}
                    x2="600"
                    y2={i * 50}
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-slate-300/10"
                  />
                ))}

                {/* Data Line */}
                <defs>
                  <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#007AFF" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#007AFF" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Area Fill */}
                <motion.path
                  d={`M 0,${200 - (mockChartData[0].score - 5) * 40} 
                      ${mockChartData.map((d, i) => 
                        `L ${(i / (mockChartData.length - 1)) * 600},${200 - (d.score - 5) * 40}`
                      ).join(" ")} 
                      L 600,200 L 0,200 Z`}
                  fill="url(#chartGradient)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                />

                {/* Line */}
                <motion.path
                  d={`M 0,${200 - (mockChartData[0].score - 5) * 40} 
                      ${mockChartData.map((d, i) => 
                        `L ${(i / (mockChartData.length - 1)) * 600},${200 - (d.score - 5) * 40}`
                      ).join(" ")}`}
                  fill="none"
                  stroke="#007AFF"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />

                {/* Data Points */}
                {mockChartData.map((d, i) => (
                  <motion.circle
                    key={i}
                    cx={(i / (mockChartData.length - 1)) * 600}
                    cy={200 - (d.score - 5) * 40}
                    r="5"
                    fill="#007AFF"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  />
                ))}
              </svg>

              {/* X-axis Labels */}
              <div className="flex justify-between mt-2 text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {mockChartData.map((d) => (
                  <span key={d.day}>{d.day}</span>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Skill Breakdown */}
          <div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Skill Breakdown & Trends</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockSkillTrends.map((skill, index) => {
                const IconComponent = iconMap[skill.icon as keyof typeof iconMap];
                return (
                  <GlassCard key={skill.skill} hoverEffect className="p-5">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div 
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${skill.color}15` }}
                        >
                          <IconComponent className="w-5 h-5" style={{ color: skill.color }} />
                        </div>
                        <span className="font-semibold text-slate-900 dark:text-white">{skill.skill}</span>
                      </div>
                      
                      <div className="flex items-end justify-between mb-3">
                        <span className="text-3xl font-bold text-slate-900 dark:text-white">{skill.currentScore}</span>
                        <span className="text-sm text-green-500 flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          {skill.change}
                        </span>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">TREND (5 TESTS)</p>
                        <Sparkline data={skill.trendData} color={skill.color} className="w-full h-8" />
                      </div>
                    </motion.div>
                  </GlassCard>
                );
              })}
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {mockKeyMetrics.map((metric, index) => {
              const IconComponent = iconMap[metric.icon as keyof typeof iconMap];
              return (
                <GlassCard key={metric.label} hoverEffect className="p-6">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${metric.color}20` }}
                    >
                      <IconComponent className="w-6 h-6" style={{ color: metric.color }} />
                    </div>
                    <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1">{metric.label}</p>
                    <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-1">{metric.value}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{metric.subtitle}</p>
                  </motion.div>
                </GlassCard>
              );
            })}
          </div>

          {/* Recent Sessions */}
          <GlassCard className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Recent Sessions</h3>
              <button className="text-[#007AFF] text-sm font-semibold hover:underline">SEE ALL</button>
            </div>
            
            <div className="space-y-1">
              {mockRecentSessions.map((session, index) => (
                <motion.button
                  key={index}
                  className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 4 }}
                >
                  <div className="text-left">
                    <p className="font-semibold text-slate-900 dark:text-white">{session.title}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{session.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-2xl font-bold ${getScoreColor(session.score)}`}>
                      {session.score}
                    </span>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
                  </div>
                </motion.button>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
