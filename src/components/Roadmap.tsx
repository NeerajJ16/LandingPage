import React, { useState } from "react";
import roadmapData from "../data/roadmap.json";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, CalendarDays, CheckCircle } from "lucide-react";
import * as Popover from "@radix-ui/react-popover";

type RoadmapType = {
  [week: string]: {
    [day: string]: string;
  };
};

const Roadmap: React.FC = () => {
  const roadmap: RoadmapType = roadmapData;
  const [expandedWeek, setExpandedWeek] = useState<string | null>(null);
  const [checked, setChecked] = useState<{ [week: string]: { [day: string]: boolean } }>({});
  const [showPopper, setShowPopper] = useState<{ [week: string]: boolean }>({});
  const [expandAll, setExpandAll] = useState<boolean>(false);

  const toggleWeek = (week: string) => {
    setExpandedWeek(expandedWeek === week ? null : week);
  };

  const toggleAllWeeks = () => {
    setExpandAll(!expandAll);
  };

  const handleCheck = (week: string, day: string) => {
    const newChecked = {
      ...checked,
      [week]: {
        ...checked[week],
        [day]: !checked[week]?.[day],
      },
    };

    setChecked(newChecked);

    // Check if all are completed
    const allDays = Object.keys(roadmap[week]);
    const allChecked = allDays.every((d) => newChecked[week]?.[d]);
    setShowPopper((prev) => ({ ...prev, [week]: allChecked }));
  };

  const calculateProgress = () => {
    let totalDays = 0;
    let completedDays = 0;

    Object.entries(roadmap).forEach(([week, days]) => {
      totalDays += Object.keys(days).length;
      completedDays += Object.values(checked[week] || {}).filter(Boolean).length;
    });

    return (completedDays / totalDays) * 100;
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-6 font-sans">
      <h1 className="text-4xl font-bold mb-8 text-center text-white drop-shadow-lg">
        📚 Course Roadmap
      </h1>

      {/* Expand All / Collapse All Button */}
      <div className="text-center mb-8">
        <button
          onClick={toggleAllWeeks}
          className="bg-blue-500 px-6 py-2 rounded-full text-white font-semibold hover:bg-blue-600 transition"
        >
          {expandAll ? "Collapse All" : "Expand All"}
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-3xl mx-auto bg-gray-600 rounded-full h-2 mb-6 relative">
        <motion.div
          className="bg-gradient-to-r from-blue-500 to-green-400 h-full rounded-full"
          style={{ width: `${calculateProgress()}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>


      <div className="max-w-3xl mx-auto space-y-4">
        {Object.entries(roadmap).map(([week, days]) => {
          const isCompleted = Object.keys(days).every((day) => checked[week]?.[day]);

          return (
            <div key={week} className="rounded-xl bg-[#1a1a1a] border border-gray-700 shadow-md">
              <button
                onClick={() => toggleWeek(week)}
                className="flex justify-between items-center w-full px-5 py-4 text-left hover:bg-[#222] transition-colors rounded-t-xl"
              >
                <div className="flex items-center gap-3 text-lg font-semibold">
                  <CalendarDays className="text-blue-400" /> {week}
                </div>
                <div className="flex items-center gap-2">
                  {isCompleted && <CheckCircle className="text-green-500" />}
                  {expandedWeek === week || expandAll ? (
                    <ChevronUp className="text-blue-400" />
                  ) : (
                    <ChevronDown className="text-blue-400" />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {(expandedWeek === week || expandAll) && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden px-6 pb-4 pt-2"
                  >
                    <ul className="space-y-3">
                      {Object.entries(days).map(([day, topic]) => (
                        <li key={day} className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            checked={!!checked[week]?.[day]}
                            onChange={() => handleCheck(week, day)}
                            className="mt-1 accent-green-400 cursor-pointer"
                          />
                          <div>
                            <span className="font-medium text-white">{day}:</span>{" "}
                            <span className="text-gray-300">{topic}</span>
                          </div>
                        </li>
                      ))}
                    </ul>

                    {/* Popper shown only when week is complete */}
                    {showPopper[week] && (
                      <Popover.Root open>
                        <Popover.Trigger asChild>
                          <div className="mt-6 flex justify-center">
                            <motion.div
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="bg-green-700 px-4 py-2 rounded-xl text-white shadow-lg"
                            >
                              🎉 Great job! You’ve completed {week}!
                            </motion.div>
                          </div>
                        </Popover.Trigger>
                      </Popover.Root>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Roadmap;
