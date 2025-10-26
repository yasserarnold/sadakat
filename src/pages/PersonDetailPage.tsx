import { Link, useParams, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PersonHeader from "@/components/person-detail/PersonHeader";
import CairoQuranRadio from "@/components/person-detail/CairoQuranRadio";
import ApiRadioStations from "@/components/person-detail/ApiRadioStations";
import ReciterSurahList from "@/components/person-detail/ReciterSurahList";
import { getPersonById, Person } from "@/lib/persons";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const PersonDetailPage = () => {
  const { personId } = useParams<{ personId: string }>();
  const [person, setPerson] = useState<Person | null | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (personId) {
      loadPerson(personId);
    }
  }, [personId]);

  const loadPerson = async (id: string) => {
    setLoading(true);
    const data = await getPersonById(id);
    setPerson(data);
    setLoading(false);
  };

  // If person not found, redirect to home
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50" dir="rtl">
        <div className="container mx-auto px-4 py-16">
          <Skeleton className="h-64 w-full max-w-4xl mx-auto" />
        </div>
      </div>
    );
  }

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
        className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm"
      >
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
              transition={{ type: "spring", stiffness: 300 }}
            >
              صدقة جارية لعائلة شقا
            </motion.h1>
            
            <div className="w-[100px]" /> {/* Spacer for centering */}
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <PersonHeader person={person} />
          
          <CairoQuranRadio />
          
          <ApiRadioStations />
          
          <ReciterSurahList />
        </div>
      </main>
    </div>
  );
};

export default PersonDetailPage;