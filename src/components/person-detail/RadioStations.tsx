import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Radio } from "lucide-react";

interface RadioStation {
  id: string;
  name: string;
  image: string;
  stream: string;
}

const radioStations: RadioStation[] = [
{
  id: "hussary",
  name: "الشيخ/ محمود خليل الحصري",
  image: "https://newoaks.s3.us-west-1.amazonaws.com/NewOaks/5500/0af9e158-94cd-4bea-b0e3-188a376395c7.jpeg",
  stream: "https://backup.qurango.net/radio/mahmoud_khalil_alhussary"
},
{
  id: "abdulbasit",
  name: "الشيخ/ عبد الباسط عبد الصمد",
  image: "/images/abdulbasit.webp",
  stream: "https://backup.qurango.net/radio/abdulbasit_abdulsamad"
},
{
  id: "minshawi",
  name: "الشيخ/ محمد صديق المنشاوي",
  image: "/images/minshawy.jpg",
  stream: "https://backup.qurango.net/radio/mohammed_siddiq_alminshawi"
},
{
  id: "quran",
  name: "اذاعة القرأن الكريم",
  image: "/images/quran.png",
  stream: "https://qurango.net/radio/tarateel"
},
{
  id: "alafasi",
  name: "الشيخ/ مشاري راشد العفاسي",
  image: "/images/mashary.jpg",
  stream: "https://backup.qurango.net/radio/mishary_alafasi"
},
{
  id: "hatem",
  name: "الشيخ/ حاتم فريد الواعر",
  image: "/images/hatem.jpg",
  stream: "https://backup.qurango.net/radio/hatem_fareed_alwaer"
},
{
  id: "sunnah",
  name: "في ظلال السنة النبويه",
  image: "/images/sunah.jpg",
  stream: "https://backup.qurango.net/radio/fi_zilal_alsiyra"
},
{
  id: "kishk",
  name: "خطب الشيخ/ كشك",
  image: "/images/kshk.jpg",
  stream: "https://stream.zeno.fm/kenbwry5ttvtv"
},
{
  id: "tafsir",
  name: "تفسير القرآن الكريم",
  image: "/images/tafsir.png",
  stream: "https://backup.qurango.net/radio/mukhtasartafsir"
},
{
  id: "shaarawy",
  name: "تفسير القرآن الكريم للشيخ/ الشعراوي",
  image: "/images/shawary.jpg",
  stream: "https://3vh.liveradiu.com:8000/el-shaarawy.mp3"
}];


const RadioStations = () => {
  const [selectedStation, setSelectedStation] = useState<RadioStation | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openStation = (station: RadioStation) => {
    setSelectedStation(station);
    setIsOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}>

      <Card className="border-slate-200 shadow-lg" style={{ background: "rgba(255, 255, 255, 0.85)" }}>
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b rounded-t-lg">
          <CardTitle className="flex items-center gap-3 text-xl sm:text-2xl text-slate-800">
            <Radio className="h-6 w-6 text-purple-600" />
            إذاعات للمشايخ
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {radioStations.map((station, index) =>
            <motion.div
              key={station.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => openStation(station)}
              className="cursor-pointer group">
                <Card className="overflow-hidden border-2 hover:border-purple-300 transition-all hover:shadow-lg">
                  <div className="aspect-square relative">
                    <img
                    src={station.image}
                    alt={station.name}
                    className="w-full h-full object-cover group-hover:opacity-90 transition-opacity" />

                  </div>
                  <div className="p-2 text-center bg-white">
                    <p className="text-xs sm:text-sm font-semibold text-slate-800 line-clamp-2">
                      {station.name}
                    </p>
                  </div>
                </Card>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">{selectedStation?.name}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 py-4">
            {selectedStation &&
            <>
                <img
                src={selectedStation.image}
                alt={selectedStation.name}
                className="w-48 h-48 rounded-lg object-cover shadow-lg" />

                <audio
                controls
                autoPlay
                className="w-full"
                src={selectedStation.stream}>

                  متصفحك لا يدعم تشغيل الصوت
                </audio>
              </>
            }
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>);

};

export default RadioStations;