import { motion } from "framer-motion";
import { Search, Filter, MoreVertical, Edit, Ban, Trash2, RotateCcw, X, Mail, Phone, MapPin, Calendar, Clock, Award } from "lucide-react";
import { HapticButton } from "@/components/HapticButton";
import { mockUsers } from "@/lib/adminData";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function UserManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<typeof mockUsers[0] | null>(null);

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
              User Management
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">{mockUsers.length} total users</p>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              type="text"
              placeholder="Search by name, email, or plan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/80 dark:bg-[#1c1c1e]/60 border-white/50 dark:border-white/10 backdrop-blur-2xl"
            />
          </div>
          <HapticButton variant="secondary" className="gap-2">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </HapticButton>
        </motion.div>

        {/* User Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border backdrop-blur-2xl bg-white/80 border-white/50 dark:bg-[#1c1c1e]/60 dark:border-white/10 shadow-lg dark:shadow-black/20 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-slate-200 dark:border-white/10">
                <tr>
                  <th className="text-left p-4 text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    User
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider hidden md:table-cell">
                    Status
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider hidden lg:table-cell">
                    Plan
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider hidden lg:table-cell">
                    Usage
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider hidden xl:table-cell">
                    Revenue
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider hidden 2xl:table-cell">
                    Plans
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-white/10">
                {mockUsers.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    onClick={() => setSelectedUser(user)}
                    className="hover:bg-slate-100/50 dark:hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#007AFF] to-[#5856D6] flex items-center justify-center text-white font-semibold text-sm">
                          {user.avatar}
                        </div>
                        <div>
                          <div className="font-medium text-slate-900 dark:text-white">{user.name}</div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          user.status === "Active"
                            ? "bg-[#34C759]/10 text-[#34C759]"
                            : "bg-[#FF9500]/10 text-[#FF9500]"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="p-4 hidden lg:table-cell">
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white">{user.plan}</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">{user.billingStatus}</div>
                      </div>
                    </td>
                    <td className="p-4 hidden lg:table-cell">
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white">{user.usageTime}</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">{user.testsTaken} tests</div>
                      </div>
                    </td>
                    <td className="p-4 hidden xl:table-cell">
                      <div className="font-semibold text-slate-900 dark:text-white">{user.revenue}</div>
                    </td>
                    <td className="p-4 hidden 2xl:table-cell">
                      <div className="font-medium text-slate-900 dark:text-white">{user.plansPurchased}</div>
                    </td>
                    <td className="p-4" onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-2 rounded-lg hover:bg-slate-200/50 dark:hover:bg-white/10 transition-colors">
                            <MoreVertical className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem className="gap-2">
                            <Edit className="w-4 h-4" />
                            Edit Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <RotateCcw className="w-4 h-4" />
                            Reset Password
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Ban className="w-4 h-4" />
                            {user.status === "Active" ? "Ban User" : "Unban User"}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-red-600 dark:text-red-400">
                            <Trash2 className="w-4 h-4" />
                            Delete Account
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* User Detail Modal */}
        <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>User Details</span>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="p-2 rounded-lg hover:bg-slate-200/50 dark:hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </DialogTitle>
            </DialogHeader>

            {selectedUser && (
              <div className="space-y-6">
                {/* User Identity */}
                <div className="flex items-center gap-4 pb-6 border-b border-slate-200 dark:border-white/10">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#007AFF] to-[#5856D6] flex items-center justify-center text-white font-semibold text-xl">
                    {selectedUser.avatar}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedUser.name}</h3>
                    <p className="text-slate-500 dark:text-slate-400">{selectedUser.email}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          selectedUser.status === "Active"
                            ? "bg-[#34C759]/10 text-[#34C759]"
                            : "bg-[#FF9500]/10 text-[#FF9500]"
                        }`}
                      >
                        {selectedUser.status}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#007AFF]/10 text-[#007AFF]">
                        {selectedUser.role}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
                    Contact Information
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                      <Mail className="w-5 h-5" />
                      <span>{selectedUser.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                      <Phone className="w-5 h-5" />
                      <span>{selectedUser.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                      <MapPin className="w-5 h-5" />
                      <span>{selectedUser.country}</span>
                    </div>
                  </div>
                </div>

                {/* Subscription Details */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
                    Subscription Details
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-100/50 dark:bg-white/5">
                      <div className="text-sm text-slate-500 dark:text-slate-400">Current Plan</div>
                      <div className="text-lg font-semibold text-slate-900 dark:text-white mt-1">{selectedUser.plan}</div>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-100/50 dark:bg-white/5">
                      <div className="text-sm text-slate-500 dark:text-slate-400">Billing Status</div>
                      <div className="text-lg font-semibold text-slate-900 dark:text-white mt-1">{selectedUser.billingStatus}</div>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-100/50 dark:bg-white/5">
                      <div className="text-sm text-slate-500 dark:text-slate-400">Next Billing</div>
                      <div className="text-lg font-semibold text-slate-900 dark:text-white mt-1">{selectedUser.nextBilling}</div>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-100/50 dark:bg-white/5">
                      <div className="text-sm text-slate-500 dark:text-slate-400">Plans Purchased</div>
                      <div className="text-lg font-semibold text-slate-900 dark:text-white mt-1">{selectedUser.plansPurchased}</div>
                    </div>
                  </div>
                </div>

                {/* Usage & Engagement */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
                    Usage & Engagement
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-100/50 dark:bg-white/5">
                      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                        <Clock className="w-4 h-4" />
                        <span>Total Usage</span>
                      </div>
                      <div className="text-lg font-semibold text-slate-900 dark:text-white mt-1">{selectedUser.usageTime}</div>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-100/50 dark:bg-white/5">
                      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                        <Award className="w-4 h-4" />
                        <span>Tests Taken</span>
                      </div>
                      <div className="text-lg font-semibold text-slate-900 dark:text-white mt-1">{selectedUser.testsTaken}</div>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-100/50 dark:bg-white/5">
                      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                        <Calendar className="w-4 h-4" />
                        <span>Joined</span>
                      </div>
                      <div className="text-lg font-semibold text-slate-900 dark:text-white mt-1">{selectedUser.joinedDate}</div>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-100/50 dark:bg-white/5">
                      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                        <Clock className="w-4 h-4" />
                        <span>Last Active</span>
                      </div>
                      <div className="text-lg font-semibold text-slate-900 dark:text-white mt-1">{selectedUser.lastActive}</div>
                    </div>
                  </div>
                </div>

                {/* Financial Summary */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
                    Financial Summary
                  </h4>
                  <div className="p-6 rounded-xl bg-gradient-to-br from-[#007AFF]/10 to-[#5856D6]/10 dark:from-[#007AFF]/20 dark:to-[#5856D6]/20">
                    <div className="text-sm text-slate-600 dark:text-slate-400">Total Revenue Generated</div>
                    <div className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{selectedUser.revenue}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      Lifetime Value across {selectedUser.plansPurchased} plan{selectedUser.plansPurchased !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-white/10">
                  <HapticButton variant="primary" className="flex-1">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Details
                  </HapticButton>
                  <HapticButton variant="secondary" className="flex-1">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset Password
                  </HapticButton>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
