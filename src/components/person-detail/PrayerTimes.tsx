import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

const PrayerTimes = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}>

      <Card className="border-slate-200 shadow-lg" style={{ background: "rgba(255, 255, 255, 0.85)" }}>
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b rounded-t-lg">
          <CardTitle className="flex items-center gap-3 text-xl sm:text-2xl text-slate-800">
            <Clock className="h-6 w-6 text-indigo-600" />
            مواقيت الصلاة
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <iframe
            src="https://timesprayer.com/widgets.php?frame=1&lang=ar&name=cairo&sound=true&avachang=true&fcolor=4C6EC1&tcolor=37921D"
            style={{ border: 'none', overflow: 'hidden', width: '100%', height: '187px' }}
            title="مواقيت الصلاة - القاهرة"
            referrerPolicy="no-referrer" />

        </CardContent>
      </Card>
    </motion.div>);

};

export default PrayerTimes;