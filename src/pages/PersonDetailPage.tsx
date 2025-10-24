import { Link, useParams, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import PersonHeader from "@/components/person-detail/PersonHeader";
import CairoQuranRadio from "@/components/person-detail/CairoQuranRadio";
import RadioStations from "@/components/person-detail/RadioStations";
import IslamicResources from "@/components/person-detail/IslamicResources";
import HadithSearch from "@/components/person-detail/HadithSearch";
import PrayerTimes from "@/components/person-detail/PrayerTimes";
import TasbihCounter from "@/components/person-detail/TasbihCounter";
import { getPersonById } from "@/data/persons";
import { useEffect } from "react";

const PersonDetailPage = () => {
  const { personId } = useParams<{personId: string;}>();
  const whatsappNumber = "YOUR_WHATSAPP_NUMBER";
  const whatsappMessage = "أريد صفحة تذكارية";

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Get person data by ID
  const person = personId ? getPersonById(personId) : undefined;

  // If person not found, redirect to home
  if (!person) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50" dir="rtl">
      {/* Header Navigation */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <Link to="/">
              <Button variant="ghost" className="gap-2 hover:bg-blue-50">
                <ArrowRight className="h-5 w-5" />
                العودة للرئيسية
              </Button>
            </Link>
            
            <motion.h1
              className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}>

              صدقة جارية لعائلة شقا
            </motion.h1>
            
            <div className="w-[100px]" /> {/* Spacer for centering */}
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pb-32">
        <div className="max-w-6xl mx-auto space-y-8">
          <PersonHeader person={person} />
          
          <CairoQuranRadio />
          
          <RadioStations />

          <IslamicResources />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <HadithSearch />
            <div className="space-y-8">
              <PrayerTimes />
              <TasbihCounter />
            </div>
          </div>
        </div>
      </main>

      {/* Fixed WhatsApp CTA Footer */}
  
    </div>);

};

export default PersonDetailPage;