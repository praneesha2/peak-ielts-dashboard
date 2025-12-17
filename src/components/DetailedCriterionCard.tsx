import { motion } from "framer-motion";
import { CheckCircle, AlertCircle } from "lucide-react";

interface CriterionData {
  title: string;
  score: number;
  description: string;
  strengths: string[];
  improvements: string[];
  color: string;
}

export function DetailedCriterionCard({ data }: { data: CriterionData }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ backgroundColor: "#202022" }}
      className="h-full bg-[#1C1C1E] border border-[#2C2C2E] rounded-[24px] p-6 transition-colors duration-300"
    >
      {/* Header Section */}
      <div className="mb-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-white">{data.title}</h3>
          <span
            className="text-4xl font-bold tracking-tighter"
            style={{ color: data.color }}
          >
            {data.score.toFixed(1)}
          </span>
        </div>
        <p className="text-[#8E8E93] text-sm leading-relaxed">
          {data.description}
        </p>
      </div>

      {/* Feedback Body */}
      <div className="space-y-4 pt-4 border-t border-[#2C2C2E]">
        {/* Strengths */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-[#A0FF03]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#A0FF03]">
              Strengths
            </span>
          </div>
          <ul className="space-y-1.5">
            {data.strengths.map((strength, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D1D1D6]/40 mt-2 flex-shrink-0" />
                <span className="text-[#D1D1D6] text-sm">{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Needs Improvement */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-[#FF9F0A]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF9F0A]">
              Needs Improvement
            </span>
          </div>
          <ul className="space-y-1.5">
            {data.improvements.map((improvement, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D1D1D6]/40 mt-2 flex-shrink-0" />
                <span className="text-[#D1D1D6] text-sm">{improvement}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
