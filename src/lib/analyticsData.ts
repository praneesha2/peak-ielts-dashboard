export const mockChartData = [
  { day: "MON", score: 6.0 },
  { day: "TUE", score: 6.5 },
  { day: "WED", score: 6.0 },
  { day: "THU", score: 6.8 },
  { day: "FRI", score: 6.5 },
  { day: "SAT", score: 7.0 },
];

export const mockSkillTrends = [
  {
    skill: "Fluency",
    icon: "Zap",
    color: "#007AFF",
    currentScore: 7.0,
    trendData: [6.0, 6.5, 6.5, 7.0, 7.0],
    change: "+0.5"
  },
  {
    skill: "Lexical",
    icon: "BookOpen",
    color: "#AF52DE",
    currentScore: 6.5,
    trendData: [6.0, 6.0, 6.5, 6.5, 6.5],
    change: "+0.5"
  },
  {
    skill: "Grammar",
    icon: "Check",
    color: "#FF9500",
    currentScore: 6.0,
    trendData: [5.5, 5.5, 6.0, 6.0, 6.0],
    change: "+0.5"
  },
  {
    skill: "Pronunciation",
    icon: "Mic",
    color: "#34C759",
    currentScore: 6.5,
    trendData: [6.0, 6.0, 6.5, 6.5, 6.5],
    change: "+0.5"
  }
];

export const mockKeyMetrics = [
  {
    label: "TOTAL TIME",
    value: "4h 20m",
    subtitle: "Speaking practice",
    icon: "Clock",
    color: "#007AFF"
  },
  {
    label: "TESTS",
    value: "14",
    subtitle: "Completed sessions",
    icon: "FileText",
    color: "#FF9500"
  },
  {
    label: "CONSISTENCY",
    value: "85%",
    subtitle: "Daily streak",
    icon: "Activity",
    color: "#AF52DE"
  }
];

export const mockRecentSessions = [
  { title: "Full Test", date: "Today", score: 7.0 },
  { title: "Part 2 Practice", date: "Yesterday", score: 6.5 },
  { title: "Vocabulary", date: "Nov 22", score: 6.0 },
  { title: "Full Test", date: "Nov 20", score: 6.5 },
];
