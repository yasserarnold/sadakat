import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BookOpen, Mic, ScrollText } from "lucide-react";

const IslamicResources = () => {
  return (
    <div className="space-y-8">
      {/* Hisn Al-Muslim - حصن المسلم */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}>
        <Card className="border-amber-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-amber-50 via-amber-100 to-orange-50 border-b rounded-t-lg">
            <CardTitle className="flex items-center gap-3 text-xl sm:text-2xl text-slate-800">
              <BookOpen className="h-6 w-6 text-amber-600" />
              حصن المسلم - الأذكار والأدعية
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="w-full h-[500px] sm:h-[600px]">
              <iframe
                src="https://sadkoon.gitlab.io/hisn"
                className="w-full h-full border-0"
                title="حصن المسلم"
                loading="eager"
                referrerPolicy="no-referrer" />

            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Al-Muqri - المقرئ */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}>
        <Card className="border-blue-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-blue-50 via-blue-100 to-cyan-50 border-b rounded-t-lg">
            <CardTitle className="flex items-center gap-3 text-xl sm:text-2xl text-slate-800">
              <Mic className="h-6 w-6 text-blue-600" />
              المقرئ - القرآن الكريم
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="w-full h-[500px] sm:h-[600px]">
              <iframe
                src="https://tafsir.app/"
                className="w-full h-full border-0"
                title="المقرئ"
                loading="lazy"
                referrerPolicy="no-referrer" />

            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Al-Tafsir Al-Muyassar - التفسير الميسر */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}>
        <Card className="border-green-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-green-50 via-green-100 to-emerald-50 border-b rounded-t-lg">
            <CardTitle className="flex items-center gap-3 text-xl sm:text-2xl text-slate-800">
              <ScrollText className="h-6 w-6 text-green-600" />
              التفسير الميسر - تفسير القرآن
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="w-full h-[500px] sm:h-[600px]">
              <iframe
                id="tafsir-frame"
                src="https://read.tafsir.one/almuyassar#pg_1"
                className="w-full h-full border-0"
                style={{ borderRadius: "5%" }}
                title="التفسير الميسر"
                loading="lazy"
                referrerPolicy="no-referrer" />

            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>);

};

export default IslamicResources;