import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Music } from "lucide-react";

const AudioPlayer = () => {
  const audioUrl = "https://server11.mp3quran.net/a_jbr/Rewayat-Hafs-A-n-Assem/032.mp3";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}>

      <Card className="border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
          <CardTitle className="flex items-center gap-3 text-xl sm:text-2xl text-slate-800">
            <Music className="h-6 w-6 text-green-600" />
            دعاء للمتوفي
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <audio controls className="w-full" preload="metadata">
            <source src={audioUrl} type="audio/mpeg" />
            المتصفح الخاص بك لا يدعم تشغيل الصوت
          </audio>
          <p className="text-sm text-slate-500 mt-4 text-center">
            سورة السجدة - عبد الباسط عبد الصمد
          </p>
        </CardContent>
      </Card>
    </motion.div>);

};

export default AudioPlayer;