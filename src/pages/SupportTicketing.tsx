import { motion } from "framer-motion";
import { Filter, AlertCircle, Clock, CheckCircle2, ExternalLink } from "lucide-react";
import { HapticButton } from "@/components/HapticButton";
import { SegmentedControl } from "@/components/SegmentedControl";
import { mockTickets } from "@/lib/adminData";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function SupportTicketing() {
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredTickets = statusFilter === "All" 
    ? mockTickets 
    : mockTickets.filter(t => t.status === statusFilter);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Open":
        return <AlertCircle className="w-5 h-5 text-[#FF9500]" />;
      case "In Progress":
        return <Clock className="w-5 h-5 text-[#007AFF]" />;
      case "Resolved":
        return <CheckCircle2 className="w-5 h-5 text-[#34C759]" />;
      default:
        return null;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-[#FF3B30]/10 text-[#FF3B30] border-[#FF3B30]/20";
      case "Medium":
        return "bg-[#FF9500]/10 text-[#FF9500] border-[#FF9500]/20";
      case "Low":
        return "bg-[#34C759]/10 text-[#34C759] border-[#34C759]/20";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

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
              Support Tickets
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">{filteredTickets.length} tickets</p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <SegmentedControl
              options={["All", "Open", "In Progress", "Resolved"]}
              selected={statusFilter}
              onChange={setStatusFilter}
            />
            <HapticButton variant="secondary" className="gap-2">
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </HapticButton>
          </div>
        </motion.div>

        {/* Tickets Grid */}
        <div className="grid grid-cols-1 gap-4">
          {filteredTickets.map((ticket, index) => (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              whileHover={{ scale: 1.005, y: -2 }}
              className="rounded-2xl border backdrop-blur-2xl bg-white/80 border-white/50 dark:bg-[#1c1c1e]/60 dark:border-white/10 shadow-lg dark:shadow-black/20 p-6 transition-all duration-300 cursor-pointer"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                {/* Left Section - Ticket Info */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-white/5">
                      {getStatusIcon(ticket.status)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-slate-900 dark:text-white text-lg">
                          {ticket.subject}
                        </h3>
                        <span className="text-sm text-slate-500 dark:text-slate-400">#{ticket.id}</span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 line-clamp-2">
                        {ticket.message}
                      </p>
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="flex items-center gap-2 ml-11">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#007AFF] to-[#5856D6] flex items-center justify-center text-white font-semibold text-xs">
                      {ticket.user.charAt(0)}
                    </div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {ticket.user}
                    </span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {ticket.userEmail}
                    </span>
                    <Link
                      to="/admin/users"
                      className="ml-2 p-1 rounded hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-4 h-4 text-slate-400" />
                    </Link>
                  </div>
                </div>

                {/* Right Section - Metadata */}
                <div className="flex flex-row lg:flex-col items-start lg:items-end gap-3">
                  {/* Status & Priority Badges */}
                  <div className="flex flex-wrap gap-2">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        ticket.status === "Open"
                          ? "bg-[#FF9500]/10 text-[#FF9500]"
                          : ticket.status === "In Progress"
                          ? "bg-[#007AFF]/10 text-[#007AFF]"
                          : "bg-[#34C759]/10 text-[#34C759]"
                      }`}
                    >
                      {ticket.status}
                    </span>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
                        ticket.priority
                      )}`}
                    >
                      {ticket.priority}
                    </span>
                  </div>

                  {/* Category Badge */}
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-200/50 dark:bg-white/5 text-slate-700 dark:text-slate-300">
                    {ticket.category}
                  </span>

                  {/* Time */}
                  <div className="text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    {ticket.submittedAt}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-4 ml-11">
                <HapticButton variant="primary" className="text-sm px-4 py-2">
                  View Details
                </HapticButton>
                {ticket.status !== "Resolved" && (
                  <HapticButton variant="secondary" className="text-sm px-4 py-2">
                    Mark as Resolved
                  </HapticButton>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
