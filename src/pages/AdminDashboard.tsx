import { motion } from "framer-motion";
import { Download, TrendingUp, Users, DollarSign, AlertCircle, UserPlus, Crown, MessageSquare } from "lucide-react";
import { SegmentedControl } from "@/components/SegmentedControl";
import { HapticButton } from "@/components/HapticButton";
import { mockAdminMetrics } from "@/lib/adminData";
import { useState } from "react";

const iconMap = {
  UserPlus,
  TrendingUp,
  MessageSquare,
  Crown,
};

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState("Last 30 Days");

  const revenueData = mockAdminMetrics.revenueGrowth;
  const maxRevenue = Math.max(...revenueData.map((d) => d.revenue));
  const minRevenue = Math.min(...revenueData.map((d) => d.revenue));
  const chartWidth = 600;
  const chartHeight = 200;
  const paddingX = 32;
  const paddingTop = 16;
  const paddingBottom = 32;
  const revenueRange = maxRevenue - minRevenue || 1;
  const yTicks = 4;

  const revenuePoints = revenueData.map((point, index) => {
    const x =
      paddingX +
      (index * (chartWidth - paddingX * 2)) / (revenueData.length - 1 || 1);
    const y =
      paddingTop +
      ((maxRevenue - point.revenue) *
        (chartHeight - paddingTop - paddingBottom)) /
        revenueRange;

    return { ...point, x, y };
  });

  const linePath =
    revenuePoints.length > 0
      ? revenuePoints
          .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
          .join(" ")
      : "";

  const areaPath =
    revenuePoints.length > 1
      ? `${linePath} L ${
          revenuePoints[revenuePoints.length - 1].x
        } ${chartHeight - paddingBottom} L ${
          revenuePoints[0].x
        } ${chartHeight - paddingBottom} Z`
      : "";

  return (
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-black p-6 md:p-8">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 dark:bg-blue-500/10 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/20 dark:bg-purple-500/10 rounded-full blur-[120px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Admin Console
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">System health and business metrics</p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <SegmentedControl
              options={["Last 7 Days", "Last 30 Days", "Year to Date"]}
              selected={timeRange}
              onChange={setTimeRange}
            />
            <HapticButton variant="secondary" className="gap-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </HapticButton>
          </div>
        </motion.div>

        {/* Key Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { label: "Total Revenue", value: mockAdminMetrics.totalRevenue, icon: DollarSign, color: "#34C759" },
            { label: "Active Subscriptions", value: mockAdminMetrics.activeSubscriptions, icon: TrendingUp, color: "#007AFF" },
            { label: "Total Users", value: mockAdminMetrics.totalUsers, icon: Users, color: "#AF52DE" },
            { label: "Churn Rate", value: mockAdminMetrics.churnRate, icon: AlertCircle, color: "#FF9500" },
          ].map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              whileHover={{ scale: 1.01, y: -2 }}
              className="rounded-2xl border backdrop-blur-2xl bg-white/80 border-white/50 dark:bg-[#1c1c1e]/60 dark:border-white/10 shadow-lg dark:shadow-black/20 p-6 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl`} style={{ backgroundColor: `${metric.color}15` }}>
                  <metric.icon className="w-5 h-5" style={{ color: metric.color }} />
                </div>
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                {metric.value}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Revenue Growth Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border backdrop-blur-2xl bg-white/80 border-white/50 dark:bg-[#1c1c1e]/60 dark:border-white/10 shadow-lg dark:shadow-black/20 p-6 md:p-8"
        >
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">
                Monthly Recurring Revenue
              </div>
              <div className="text-4xl font-bold text-slate-900 dark:text-white">
                {mockAdminMetrics.totalRevenue}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className="px-3 py-1 rounded-full bg-[#34C759]/10 text-[#34C759] text-sm font-medium flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  +18.5%
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-64">
            <svg
              className="w-full h-full"
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              preserveAspectRatio="none"
            >
              {/* Grid lines & Y-axis labels */}
              {[...Array(yTicks + 1)].map((_, i) => {
                const ratio = i / yTicks;
                const y =
                  paddingTop +
                  (chartHeight - paddingTop - paddingBottom) * ratio;
                const value =
                  maxRevenue - (maxRevenue - minRevenue) * ratio;
                const label =
                  value >= 1000 ? `$${(value / 1000).toFixed(0)}k` : `$${value}`;

                return (
                  <g key={i}>
                    <line
                      x1={paddingX}
                      y1={y}
                      x2={chartWidth - paddingX}
                      y2={y}
                      stroke="currentColor"
                      strokeOpacity={0.08}
                      className="text-slate-300 dark:text-slate-700"
                    />
                    <text
                      x={0}
                      y={y}
                      fill="currentColor"
                      className="text-[10px] text-slate-400 dark:text-slate-500"
                      dominantBaseline="middle"
                    >
                      {label}
                    </text>
                  </g>
                );
              })}

              {/* Area gradient */}
              <defs>
                <linearGradient id="revenueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#007AFF" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#007AFF" stopOpacity={0} />
                </linearGradient>
              </defs>

              {/* Area */}
              {areaPath && (
                <path d={areaPath} fill="url(#revenueGradient)" />
              )}

              {/* Line */}
              {linePath && (
                <path
                  d={linePath}
                  fill="none"
                  stroke="#007AFF"
                  strokeWidth={3}
                  strokeLinecap="round"
                />
              )}

              {/* Data points */}
              {revenuePoints.map((point) => (
                <circle
                  key={point.month}
                  cx={point.x}
                  cy={point.y}
                  r={4}
                  fill="#007AFF"
                  className="cursor-pointer"
                >
                  <title>{`${point.month}: $${point.revenue.toLocaleString()}`}</title>
                </circle>
              ))}
            </svg>

            {/* Month labels */}
            <div className="flex justify-between mt-4 px-2">
              {mockAdminMetrics.revenueGrowth.map((item) => (
                <div key={item.month} className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {item.month}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Plan Distribution & Revenue by Plan */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Plan Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-2xl border backdrop-blur-2xl bg-white/80 border-white/50 dark:bg-[#1c1c1e]/60 dark:border-white/10 shadow-lg dark:shadow-black/20 p-6"
          >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Plan Distribution</h3>
            <div className="space-y-4">
              {mockAdminMetrics.planDistribution.map((plan) => (
                <div key={plan.plan} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700 dark:text-slate-300">{plan.plan}</span>
                    <span className="text-slate-500 dark:text-slate-400">{plan.count} users</span>
                  </div>
                  <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(plan.count / mockAdminMetrics.totalUsers) * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: plan.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Revenue by Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="rounded-2xl border backdrop-blur-2xl bg-white/80 border-white/50 dark:bg-[#1c1c1e]/60 dark:border-white/10 shadow-lg dark:shadow-black/20 p-6"
          >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Revenue by Plan</h3>
            <div className="space-y-6">
              {mockAdminMetrics.revenueByPlan.map((plan) => (
                <div key={plan.plan} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-slate-900 dark:text-white">{plan.plan}</div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{plan.revenue}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-[#007AFF]">{plan.percentage}%</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">of total</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl border backdrop-blur-2xl bg-white/80 border-white/50 dark:bg-[#1c1c1e]/60 dark:border-white/10 shadow-lg dark:shadow-black/20 p-6"
        >
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {mockAdminMetrics.recentActivity.map((activity, index) => {
              const Icon = iconMap[activity.icon as keyof typeof iconMap];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-100/50 dark:hover:bg-white/5 transition-colors"
                >
                  <div
                    className="p-3 rounded-xl"
                    style={{ backgroundColor: `${activity.color}15` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: activity.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="min-w-0">
                        <div className="font-medium text-slate-900 dark:text-white truncate">
                          {activity.user}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          {activity.email}
                        </div>
                        <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                          {activity.action}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-xs text-slate-600 dark:bg-white/5 dark:text-slate-300">
                          {activity.country}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-blue-50 text-xs text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                          {activity.plan} plan
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-slate-400 dark:text-slate-500 whitespace-nowrap">
                    {activity.time}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
