export const mockUser = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  location: "San Francisco, US",
  bandScore: 6.0,
  testsTaken: 12,
  attendance: 85,
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
};

export const mockSkills = [
  { label: "Grammar", value: 5.5, max: 9, color: "orange" as const },
  { label: "Fluency", value: 6, max: 9, color: "blue" as const },
  { label: "Pronunciation", value: 6, max: 9, color: "purple" as const },
  { label: "Vocabulary", value: 5.5, max: 9, color: "pink" as const },
];

export const mockLatestSession = {
  date: "Nov 19, 2025",
  duration: "7m",
  type: "IELTS Speaking",
  scores: [
    { label: "TASK RESPONSE", value: "6.0" },
    { label: "COHERENCE", value: "5.5" },
    { label: "LEXICAL", value: "5.5" },
    { label: "GRAMMAR", value: "6.0" },
  ],
};

export const mockTips = [
  { text: "Speak Continuously", description: "Avoid long pauses.", color: "blue" },
  { text: "Varied Vocabulary", description: "Use synonyms.", color: "purple" },
  { text: "Structure", description: "Intro, points, conclusion.", color: "orange" },
];

export const mockPlanFeatures = [
  { text: "2 Practice Tests / Week", included: true },
  { text: "Basic Analytics", included: true },
  { text: "AI Speaking Partner", included: false },
];

export const mockSettingsSections = [
  {
    title: "GENERAL",
    items: [
      { label: "Personal Information", icon: "User", url: "/settings/personal" },
      { label: "Language & Region", icon: "Globe", url: "/settings/language", value: "English (US)" },
      { label: "Notifications", icon: "Bell", url: "/settings/notifications", value: "On" },
    ],
  },
  {
    title: "SECURITY",
    items: [
      { label: "Login & Security", icon: "Shield", url: "/settings/security" },
      { label: "Privacy Settings", icon: "Lock", url: "/settings/privacy" },
    ],
  },
  {
    title: "BILLING",
    items: [
      { label: "Payment Methods", icon: "CreditCard", url: "/settings/payment" },
      { label: "Subscription Management", icon: "Key", url: "/settings/subscription" },
    ],
  },
  {
    title: "SUPPORT",
    items: [
      { label: "Help & FAQ", icon: "HelpCircle", url: "/settings/help" },
      { label: "Contact Support", icon: "MessageCircle", url: "/settings/contact" },
    ],
  },
];
