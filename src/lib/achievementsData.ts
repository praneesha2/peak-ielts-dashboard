export const mockAchievements = {
  milestones: [
    {
      id: "first-steps",
      title: "First Steps",
      description: "Complete your first speaking test simulation.",
      icon: "Download",
      iconBg: "from-blue-400 to-blue-600",
      points: 50,
      progress: 100,
      unlocked: true
    },
    {
      id: "band-7-club",
      title: "Band 7.0 Club",
      description: "Achieve a Band Score of 7.0 or higher in any test.",
      icon: "Star",
      iconBg: "from-orange-400 to-orange-600",
      points: 0,
      progress: 85,
      unlocked: false
    },
    {
      id: "practice-marathon",
      title: "Practice Marathon",
      description: "Complete 10 hours of total speaking practice.",
      icon: "Clock",
      iconBg: "from-green-400 to-green-600",
      points: 0,
      progress: 42,
      unlocked: false
    }
  ],
  streaksAndSocial: [
    {
      id: "on-fire",
      title: "On Fire",
      description: "Maintain a 3-day practice streak.",
      icon: "Flame",
      iconBg: "from-red-500 to-orange-500",
      points: 100,
      progress: 100,
      unlocked: true
    },
    {
      id: "social-butterfly",
      title: "Social Butterfly",
      description: "Share your test results with friends 5 times.",
      icon: "Share2",
      iconBg: "from-purple-400 to-purple-600",
      points: 0,
      progress: 20,
      unlocked: false
    },
    {
      id: "vocabulary-master",
      title: "Vocabulary Master",
      description: "Use 50 unique advanced vocabulary words.",
      icon: "BookOpen",
      iconBg: "from-indigo-400 to-indigo-600",
      points: 150,
      progress: 100,
      unlocked: true
    }
  ]
};

export const mockProgress = {
  percentage: 33,
  level: "Scholar Level",
  badges: 8,
  totalBadges: 24,
  points: 1250,
  rank: 42
};
