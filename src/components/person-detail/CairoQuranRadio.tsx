import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Radio, ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { useAudio } from "@/contexts/AudioContext";

const CairoQuranRadio = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { currentlyPlayingId, setCurrentlyPlayingId } = useAudio();

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handlePlay = () => {
    // Pause any other playing audio
    setCurrentlyPlayingId('cairo');
  };

  const handlePause = () => {
    if (currentlyPlayingId === 'cairo') {
      setCurrentlyPlayingId(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Card className="border-slate-200 shadow-lg bg-white/90 backdrop-blur">
        <CardHeader className="cursor-pointer" onClick={toggleCollapse}>
          <CardTitle className="flex items-center justify-between gap-3 text-2xl">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg">
                <Radio className="h-6 w-6 text-blue-600" />
              </div>
              إذاعة القرآن الكريم - القاهرة
            </div>
            <div className="flex items-center gap-2">
              {isCollapsed ? (
                <>
                  <ChevronDown className="h-6 w-6 text-slate-600" />
                  <span className="text-slate-600 text-sm">افتح هنا</span>
                </>
              ) : (
                <>
                  <ChevronUp className="h-6 w-6 text-slate-600" />
                  <span className="text-slate-600 text-sm">اغلق من هنا</span>
                </>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        {!isCollapsed && (
          <CardContent>
            <div className="w-full rounded-lg overflow-hidden shadow-md bg-gradient-to-br from-blue-50 to-purple-50 p-6">
              <audio
                ref={audioRef}
                controls
                className="w-full"
                src="https://stream.radiojar.com/8s5u5tpdtwzuv"
                preload="none"
                onPlay={handlePlay}
                onPause={handlePause}
                onEnded={handlePause}
              >
                متصفحك لا يدعم تشغيل الصوت
              </audio>
            </div>
            <p className="mt-4 text-center text-slate-600">
              بث مباشر لإذاعة القرآن الكريم من القاهرة
            </p>
          </CardContent>
        )}
      </Card>
    </motion.div>
  );
};

export default CairoQuranRadio;