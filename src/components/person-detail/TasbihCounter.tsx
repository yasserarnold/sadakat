import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Hand, RotateCcw } from "lucide-react";

const dhikrList = [
"سبحان الله",
"الحمد لله",
"الله أكبر"];


const TasbihCounter = () => {
  const [count, setCount] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [currentDhikrIndex, setCurrentDhikrIndex] = useState(0);

  const increment = () => {
    setCount((prev) => {
      const newCount = prev + 1;
      setTotalCount((total) => total + 1);

      if (newCount >= 33) {
        // Move to next dhikr
        setCurrentDhikrIndex((idx) => (idx + 1) % dhikrList.length);
        return 1;
      }

      return newCount;
    });
  };

  const reset = () => {
    setCount(1);
    setTotalCount(0);
    setCurrentDhikrIndex(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.9 }}>

      <Card className="border-slate-200 shadow-lg" style={{ background: "rgba(255, 255, 255, 0.85)" }}>
        <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b rounded-t-lg">
          <CardTitle className="flex items-center gap-3 text-xl sm:text-2xl text-slate-800">
            <Hand className="h-6 w-6 text-emerald-600" />
            مُسبح
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 sm:p-8 space-y-6">
          {/* Circular Counter Display */}
          <div className="flex justify-center">
            <motion.div
              key={count}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="relative">
              <svg className="w-48 h-48 sm:w-56 sm:h-56 transform -rotate-90">
                {/* Background circle */}
                <circle
                  cx="112"
                  cy="112"
                  r="100"
                  stroke="rgba(16, 185, 129, 0.2)"
                  strokeWidth="12"
                  fill="none" />

                {/* Progress circle */}
                <motion.circle
                  cx="112"
                  cy="112"
                  r="100"
                  stroke="url(#gradient)"
                  strokeWidth="12"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={628}
                  initial={{ strokeDashoffset: 628 }}
                  animate={{ strokeDashoffset: 628 - count / 33 * 628 }}
                  transition={{ duration: 0.3 }} />

                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#14b8a6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-5xl sm:text-6xl font-bold text-transparent bg-gradient-to-br from-emerald-600 to-teal-600 bg-clip-text">
                  {count}
                </div>
                <div className="text-sm text-slate-500 mt-1">/ 33</div>
              </div>
            </motion.div>
          </div>

          {/* Current Dhikr */}
          <motion.div
            key={currentDhikrIndex}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-slate-800">
              {dhikrList[currentDhikrIndex]}
            </p>
          </motion.div>

          {/* Total Count */}
          <div className="text-center text-slate-600">
            <p className="text-lg">إجمالي الذكر: {totalCount}</p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={increment}
              size="lg"
              className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-lg py-6 sm:py-8">
              تسبيح
            </Button>
            
            <Button
              onClick={reset}
              size="lg"
              variant="outline"
              className="px-6 sm:px-8 py-6 sm:py-8">
              <RotateCcw className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>);

};

export default TasbihCounter;