import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, Play, ChevronRight, Trophy, Clock, Target, Zap } from 'lucide-react';
import { TrophyReveal } from '@/components/TrophyReveal';
import { Button } from '@/components/ui/button';

const practiceTopics = [
  {
    id: 1,
    title: "Describe your hometown",
    category: "Part 2 - Cue Card",
    duration: "2 mins",
    difficulty: "Medium",
    icon: Target,
  },
  {
    id: 2,
    title: "Talk about a skill you learned",
    category: "Part 2 - Cue Card",
    duration: "2 mins",
    difficulty: "Hard",
    icon: Zap,
  },
  {
    id: 3,
    title: "Discuss your favorite hobby",
    category: "Part 1 - Introduction",
    duration: "1 min",
    difficulty: "Easy",
    icon: Play,
  },
];

const Practice = () => {
  const [showTrophy, setShowTrophy] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);

  const handleViewResults = () => {
    setShowTrophy(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <h1 className="text-3xl font-bold text-foreground">Practice Speaking</h1>
          <p className="text-muted-foreground">
            Choose a topic and practice your IELTS speaking skills
          </p>
        </motion.div>

        {/* Practice Topics Grid */}
        <div className="grid gap-4">
          {practiceTopics.map((topic, index) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedTopic(topic.id)}
              className={`group cursor-pointer rounded-2xl p-6 transition-all duration-300 ${
                selectedTopic === topic.id
                  ? 'bg-primary/20 border-2 border-primary'
                  : 'bg-card hover:bg-card/80 border border-border'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      selectedTopic === topic.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
                    } transition-all`}
                  >
                    <topic.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{topic.title}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-sm text-muted-foreground">{topic.category}</span>
                      <span className="text-xs text-muted-foreground/60">•</span>
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {topic.duration}
                      </span>
                      <span className="text-xs text-muted-foreground/60">•</span>
                      <span
                        className={`text-sm font-medium ${
                          topic.difficulty === 'Easy'
                            ? 'text-neon-green'
                            : topic.difficulty === 'Medium'
                            ? 'text-neon-orange'
                            : 'text-destructive'
                        }`}
                      >
                        {topic.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
                <ChevronRight
                  className={`w-5 h-5 transition-all ${
                    selectedTopic === topic.id
                      ? 'text-primary translate-x-1'
                      : 'text-muted-foreground group-hover:translate-x-1'
                  }`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Practice Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center gap-6 py-8"
        >
          {selectedTopic && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center space-y-4"
            >
              <p className="text-muted-foreground">Topic selected! Ready to practice?</p>
              
              {/* Start Practice Button */}
              <Button
                size="lg"
                className="gap-2 rounded-xl haptic-btn"
              >
                <Mic className="w-5 h-5" />
                Start Recording
              </Button>
            </motion.div>
          )}

          {/* Divider */}
          <div className="w-full max-w-md flex items-center gap-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-muted-foreground text-sm">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* View Results Button - This triggers the trophy */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleViewResults}
            className="group relative overflow-hidden rounded-2xl px-8 py-4 font-semibold text-white transition-all haptic-btn"
            style={{
              background: 'linear-gradient(135deg, #2C5DFA 0%, #B046FA 100%)',
              boxShadow: '0 4px 20px rgba(176, 70, 250, 0.4)',
            }}
          >
            <span className="relative z-10 flex items-center gap-3">
              <Trophy className="w-5 h-5" />
              View Results
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                className="inline-block"
              >
                →
              </motion.span>
            </span>
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
          </motion.button>

          <p className="text-muted-foreground text-sm">
            See your practice results and celebrate your progress
          </p>
        </motion.div>

        {/* Stats Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-3 gap-4"
        >
          {[
            { label: 'Sessions Today', value: '3', color: 'text-neon-cyan' },
            { label: 'Current Streak', value: '7 days', color: 'text-neon-orange' },
            { label: 'Avg. Score', value: '6.5', color: 'text-neon-green' },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="bg-card rounded-2xl p-4 border border-border text-center"
            >
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Trophy Reveal Overlay */}
      <TrophyReveal
        isOpen={showTrophy}
        onClose={() => setShowTrophy(false)}
        score={7.5}
        title="Practice Complete!"
      />
    </div>
  );
};

export default Practice;
