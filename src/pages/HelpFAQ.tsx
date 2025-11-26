import { Header } from "@/components/Header";
import { motion } from "framer-motion";
import { ChevronLeft, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export default function HelpFAQ() {
  const navigate = useNavigate();

  const faqs = [
    {
      question: "How does the IELTS scoring system work?",
      answer:
        "IELTS uses a 9-band scoring system. Each band corresponds to a level of English proficiency, from 1 (Non-user) to 9 (Expert user). Your overall band score is calculated as the average of your four skill areas: Listening, Reading, Writing, and Speaking.",
    },
    {
      question: "How are subscriptions billed?",
      answer:
        "Subscriptions are billed monthly or annually, depending on your chosen plan. You'll be charged automatically at the start of each billing period. You can manage your subscription and payment methods in the Billing section.",
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer:
        "Yes, you can cancel your subscription at any time from the Manage Billing page. Your access will continue until the end of your current billing period, and you won't be charged again.",
    },
    {
      question: "How accurate is the AI scoring?",
      answer:
        "Our AI scoring system is trained on thousands of real IELTS exams and aligned with official IELTS band descriptors. While it provides highly accurate estimates, we recommend taking official practice tests as well for the most precise assessment.",
    },
    {
      question: "What accent should I practice with?",
      answer:
        "IELTS accepts all major English accents. We recommend practicing with the accent you're most comfortable with, but exposing yourself to different accents can help improve your overall comprehension.",
    },
  ];

  const guides = [
    { title: "Getting Started Guide", url: "#" },
    { title: "Understanding Your Band Score", url: "#" },
    { title: "Speaking Test Tips", url: "#" },
    { title: "Writing Task Strategies", url: "#" },
  ];

  return (
    <div className="min-h-screen">
      <Header title="Help & FAQ" subtitle="Find answers to common questions" />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-4xl mx-auto"
      >
        <button
          onClick={() => navigate("/settings")}
          className="flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground transition-colors haptic-btn"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back to Settings</span>
        </button>

        {/* Guides & Documentation */}
        <div className="glass-card rounded-[2rem] p-8 mb-6">
          <h3 className="text-xl font-semibold mb-6">Guides & Documentation</h3>
          <div className="space-y-3">
            {guides.map((guide, i) => (
              <a
                key={i}
                href={guide.url}
                className="flex items-center justify-between p-4 glass-card rounded-2xl hover:bg-white/5 transition-colors group"
              >
                <span className="font-medium">{guide.title}</span>
                <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            ))}
          </div>
        </div>

        {/* Common Questions */}
        <div className="glass-card rounded-[2rem] p-8 mb-6">
          <h3 className="text-xl font-semibold mb-6">Common Questions</h3>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="glass-card rounded-2xl px-6 border-0"
              >
                <AccordionTrigger className="text-left font-medium hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Troubleshooting */}
        <div className="glass-card rounded-[2rem] p-8 mb-6">
          <h3 className="text-xl font-semibold mb-6">Troubleshooting</h3>
          <div className="space-y-4">
            <div className="p-4 glass-card rounded-2xl">
              <h4 className="font-medium mb-2">Microphone not working?</h4>
              <p className="text-sm text-muted-foreground">
                Check your browser permissions and ensure microphone access is enabled for this website.
              </p>
            </div>
            <div className="p-4 glass-card rounded-2xl">
              <h4 className="font-medium mb-2">Audio playback issues?</h4>
              <p className="text-sm text-muted-foreground">
                Try refreshing the page or checking your device's audio settings and volume.
              </p>
            </div>
            <div className="p-4 glass-card rounded-2xl">
              <h4 className="font-medium mb-2">Test not loading?</h4>
              <p className="text-sm text-muted-foreground">
                Clear your browser cache or try using a different browser. Contact support if the issue persists.
              </p>
            </div>
          </div>
        </div>

        {/* Still Need Help */}
        <div className="glass-card rounded-[2rem] p-8 text-center">
          <h3 className="text-xl font-semibold mb-4">Still need help?</h3>
          <p className="text-muted-foreground mb-6">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <Button
            onClick={() => navigate("/settings/contact-support")}
            className="rounded-2xl haptic-btn"
          >
            Contact Support
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
