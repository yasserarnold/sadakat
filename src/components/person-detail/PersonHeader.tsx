import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { Person } from "@/data/persons";

interface PersonHeaderProps {
  person: Person;
}

const PersonHeader = ({ person }: PersonHeaderProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}>

      <Card className="border-slate-200 shadow-lg" style={{ background: "rgba(255, 255, 255, 0.95)" }}>
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="shrink-0">
              <Avatar className="h-32 w-32 sm:h-40 sm:w-40 border-4 border-white shadow-xl">
                <AvatarImage
                  src={person.image}
                  alt={person.name}
                  className="object-cover" />
                <AvatarFallback className="text-4xl font-bold bg-gradient-to-br from-blue-100 to-purple-100 text-blue-700">
                  {person.fallback}
                </AvatarFallback>
              </Avatar>
            </motion.div>
            
            <div className="flex-1 text-center md:text-right space-y-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 leading-relaxed">
                المغفور له بإذن الله
                <br />
                {person.name}
              </h1>
              
              <div className="flex items-center justify-center md:justify-start gap-3">
                {person.prayerAudio &&
                <>
                    <Button
                    onClick={toggleAudio}
                    size="lg"
                    className="gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                      {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                      دعاء للفقيد
                    </Button>
                    <audio
                    ref={audioRef}
                    src={person.prayerAudio}
                    onEnded={() => setIsPlaying(false)} />
                  </>
                }
              </div>
              
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                اللهم اغفر له وارحمه، وعافه واعف عنه، وأكرم نزله، ووسع مدخله،
                واغسله بالماء والثلج والبرد، ونقه من الخطايا كما ينقى الثوب الأبيض من الدنس
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>);

};

export default PersonHeader;