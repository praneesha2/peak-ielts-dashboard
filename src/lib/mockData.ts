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
      { icon: "User", label: "Personal Information", link: "/settings/personal-information" },
      { icon: "Globe", label: "Language & Region", value: "English (US)", link: "/settings/language-preferences" },
      { icon: "Bell", label: "Notifications", value: "On", link: "/settings/notifications" },
    ],
  },
  {
    title: "SECURITY",
    items: [
      { icon: "Shield", label: "Login & Security", link: "/settings/login-security" },
      { icon: "Lock", label: "Privacy Settings", link: "/settings/privacy-settings" },
    ],
  },
  {
    title: "BILLING",
    items: [
      { icon: "CreditCard", label: "Payment Methods", link: "/settings/manage-billing" },
      { icon: "Zap", label: "Subscription Management", link: "/settings/manage-billing" },
    ],
  },
  {
    title: "SUPPORT",
    items: [
      { icon: "HelpCircle", label: "Help & FAQ", link: "/settings/help-faq" },
      { icon: "MessageCircle", label: "Contact Support", link: "/settings/contact-support" },
    ],
  },
];
