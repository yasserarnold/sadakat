import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Radio } from "lucide-react";

const CairoQuranRadio = () => {
  const streamUrl = "https://stream.radiojar.com/8s5u5tpdtwzuv";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15 }}>

      <Card className="border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
          <CardTitle className="flex items-center gap-3 text-xl sm:text-2xl text-slate-800">
            <Radio className="h-6 w-6 text-emerald-600 animate-pulse" />
            إذاعة القرآن الكريم من القاهرة
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <audio
            controls
            className="w-full"
            preload="none">
            <source src={streamUrl} type="audio/mpeg" />
            المتصفح الخاص بك لا يدعم تشغيل الصوت
          </audio>
          <p className="text-sm text-slate-500 mt-4 text-center">
            البث المباشر من إذاعة القرآن الكريم - القاهرة
          </p>
        </CardContent>
      </Card>
    </motion.div>);

};

export default CairoQuranRadio;