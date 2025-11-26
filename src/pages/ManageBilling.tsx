import { Header } from "@/components/Header";
import { motion } from "framer-motion";
import { ChevronLeft, CreditCard, Download, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function ManageBilling() {
  const navigate = useNavigate();

  const invoices = [
    { date: "Nov 1, 2024", amount: "$19.99", status: "Paid", id: "INV-2024-11" },
    { date: "Oct 1, 2024", amount: "$19.99", status: "Paid", id: "INV-2024-10" },
    { date: "Sep 1, 2024", amount: "$19.99", status: "Paid", id: "INV-2024-09" },
  ];

  return (
    <div className="min-h-screen">
      <Header title="Manage Billing" subtitle="View and manage your subscription" />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-3xl mx-auto"
      >
        <button
          onClick={() => navigate("/settings")}
          className="flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground transition-colors haptic-btn"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back to Settings</span>
        </button>

        {/* Current Subscription */}
        <div className="glass-card rounded-[2rem] p-8 mb-6 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              background: "linear-gradient(135deg, hsl(var(--neon-blue)) 0%, hsl(var(--neon-purple)) 100%)",
            }}
          />
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Free Plan</h3>
                <p className="text-muted-foreground">No payment required</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-neon-green/20 text-neon-green text-sm font-medium">
                Active
              </span>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-muted-foreground">Subscription Status</span>
                <span className="font-medium">Active</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-muted-foreground">Renewal Frequency</span>
                <span className="font-medium">—</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Next Billing Date</span>
                <span className="font-medium">—</span>
              </div>
            </div>

            <Button className="w-full py-4 rounded-2xl haptic-btn">
              Upgrade to Pro
            </Button>
          </div>
        </div>

        {/* Payment Method */}
        <div className="glass-card rounded-[2rem] p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Payment Method</h3>
            <Button variant="outline" className="rounded-xl haptic-btn">
              <ExternalLink className="w-4 h-4 mr-2" />
              Manage in Paddle
            </Button>
          </div>

          <div className="flex items-center gap-4 p-4 glass-card rounded-2xl">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF9500] to-[#FF6B00] flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-medium">No payment method on file</p>
              <p className="text-sm text-muted-foreground">Add a payment method to upgrade</p>
            </div>
          </div>
        </div>

        {/* Billing History */}
        <div className="glass-card rounded-[2rem] p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Billing History</h3>
            <Button variant="outline" className="rounded-xl haptic-btn">
              <ExternalLink className="w-4 h-4 mr-2" />
              View All Invoices
            </Button>
          </div>

          <div className="space-y-3">
            {invoices.map((invoice, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 glass-card rounded-2xl hover:bg-white/5 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-medium">{invoice.id}</p>
                  <p className="text-sm text-muted-foreground">{invoice.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold">{invoice.amount}</span>
                  <span className="px-2 py-1 rounded-lg bg-neon-green/20 text-neon-green text-xs">
                    {invoice.status}
                  </span>
                  <Button variant="ghost" size="icon" className="rounded-xl haptic-btn">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Plan Comparison */}
        <div className="glass-card rounded-[2rem] p-8">
          <h3 className="text-xl font-semibold mb-6">Change Your Plan</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="glass-card rounded-2xl p-6 border-2 border-primary">
              <div className="mb-4">
                <h4 className="text-lg font-semibold mb-1">Free</h4>
                <p className="text-3xl font-bold">$0</p>
                <p className="text-sm text-muted-foreground">per month</p>
              </div>
              <Button variant="outline" className="w-full rounded-xl" disabled>
                Current Plan
              </Button>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <div className="mb-4">
                <h4 className="text-lg font-semibold mb-1">Pro</h4>
                <p className="text-3xl font-bold">$19.99</p>
                <p className="text-sm text-muted-foreground">per month</p>
              </div>
              <Button className="w-full rounded-xl haptic-btn">
                Upgrade Now
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
