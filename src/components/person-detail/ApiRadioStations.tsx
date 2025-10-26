import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Radio, ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useAudio } from "@/contexts/AudioContext";

interface RadioStation {
  id: number;
  name: string;
  url: string;
}

const ApiRadioStations = () => {
  const [stations, setStations] = useState<RadioStation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const audioRefs = useRef<HTMLAudioElement[]>([]);
  const { currentlyPlayingId, setCurrentlyPlayingId } = useAudio();

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch('https://mp3quran.net/api/v3/radios?language=ar');
        const data = await response.json();
        setStations(data.radios || []);
      } catch (err) {
        setError('فشل في تحميل محطات الراديو');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStations();
  }, []);

  const handlePlay = (id: number) => {
    // Pause all other audios
    audioRefs.current.forEach((audio, index) => {
      if (audio && index !== id) {
        audio.pause();
      }
    });
    
    // Set the currently playing station
    setCurrentlyPlayingId(`api-${id}`);
  };

  const handlePause = (id: number) => {
    if (currentlyPlayingId === `api-${id}`) {
      setCurrentlyPlayingId(null);
    }
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  if (loading) {
    return (
      <Card className="border-slate-200 shadow-lg bg-white/90 backdrop-blur">
        <CardHeader className="cursor-pointer" onClick={toggleCollapse}>
          <CardTitle className="flex items-center justify-between gap-3 text-2xl">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-green-100 to-teal-100 rounded-lg">
                <Radio className="h-6 w-6 text-green-600" />
              </div>
              اذاعات المقرئين
            </div>
            {isCollapsed ? (
              <ChevronDown className="h-6 w-6 text-slate-600" />
            ) : (
              <ChevronUp className="h-6 w-6 text-slate-600" />
            )}
          </CardTitle>
        </CardHeader>
        {!isCollapsed && (
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-32" />
              ))}
            </div>
          </CardContent>
        )}
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-slate-200 shadow-lg bg-white/90 backdrop-blur">
        <CardHeader className="cursor-pointer" onClick={toggleCollapse}>
          <CardTitle className="flex items-center justify-between gap-3 text-2xl">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-green-100 to-teal-100 rounded-lg">
                <Radio className="h-6 w-6 text-green-600" />
              </div>
              اذاعات المقرئين
            </div>
            {isCollapsed ? (
              <ChevronDown className="h-6 w-6 text-slate-600" />
            ) : (
              <ChevronUp className="h-6 w-6 text-slate-600" />
            )}
          </CardTitle>
        </CardHeader>
        {!isCollapsed && (
          <CardContent className="p-6">
            <p className="text-center text-red-600">{error}</p>
          </CardContent>
        )}
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <Card className="border-slate-200 shadow-lg bg-white/90 backdrop-blur">
        <CardHeader className="cursor-pointer" onClick={toggleCollapse}>
          <CardTitle className="flex items-center justify-between gap-3 text-2xl">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-green-100 to-teal-100 rounded-lg">
                <Radio className="h-6 w-6 text-green-600" />
              </div>
              اذاعات المقرئين
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stations.map((station, index) => (
                <motion.div
                  key={station.id}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="h-full border-slate-200 hover:border-green-300 hover:shadow-md transition-all">
                    <CardContent className="p-4 space-y-3">
                      <h3 className="font-bold text-lg text-slate-800 mb-3">{station.name}</h3>
                      <div className="w-full">
                        <audio
                          ref={(el) => (audioRefs.current[index] = el as HTMLAudioElement)}
                          controls
                          className="w-full"
                          src={station.url}
                          preload="none"
                          onPlay={() => handlePlay(index)}
                          onPause={() => handlePause(index)}
                          onEnded={() => handlePause(index)}
                        >
                          متصفحك لا يدعم تشغيل الصوت
                        </audio>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>
    </motion.div>
  );
};

export default ApiRadioStations;