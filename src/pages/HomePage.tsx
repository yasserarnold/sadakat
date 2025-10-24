import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { getAllPersons } from "@/data/persons";


const HomePage = () => {
  const whatsappNumber = "YOUR_WHATSAPP_NUMBER";
  const whatsappMessage = "أريد صفحة تذكارية";

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
            <motion.h1
              className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}>

              صدقة جارية
            </motion.h1>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>

              <Button
                variant="outline"
                className="gap-2 text-sm sm:text-base hover:bg-blue-50 hover:border-blue-300 transition-all"
                onClick={() => window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, '_blank')}>

                <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden sm:inline">إحصل علي صفحة مماثلة</span>
                <span className="sm:hidden">صفحة مماثلة</span>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 pb-32">
        {/* Heading Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4 leading-relaxed">
            جميع الصدقات
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed">
            (أدعوا لهم ولنا, وجزاكم الله عنا وعنهم خيرا)
          </p>
        </motion.section>

        {/* Memorial Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {getAllPersons().map((person, index) =>
          <motion.div
            key={person.id}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{
              scale: 1.05,
              y: -8,
              transition: { duration: 0.3 }
            }}>

              <Card className="overflow-hidden border-slate-200 hover:shadow-2xl hover:border-blue-300 transition-all duration-300 bg-white/90 backdrop-blur">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex flex-col items-center text-center space-y-4 sm:space-y-6">
                    {/* Avatar */}
                    <motion.div
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}>

                      <Avatar className="h-28 w-28 sm:h-32 sm:w-32 md:h-36 md:w-36 border-4 border-blue-100 shadow-lg">
                        <AvatarImage
                        src={person.image}
                        alt={person.name}
                        className="object-cover" />

                        <AvatarFallback className="text-2xl sm:text-3xl font-bold bg-gradient-to-br from-blue-100 to-purple-100 text-blue-700">
                          {person.fallback}
                        </AvatarFallback>
                      </Avatar>
                    </motion.div>
                    
                    {/* Name */}
                    <h3 className="text-lg sm:text-xl font-bold text-slate-800 leading-relaxed min-h-[3rem] flex items-center justify-center">
                      {person.name}
                    </h3>
                    
                    {/* Visit Button */}
                    <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full">

                      <Link to={`/person/${person.id}`} className="block w-full">
                        <Button
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold shadow-md hover:shadow-lg transition-all"
                        size="lg">

                          زيارة
                        </Button>
                      </Link>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </main>

    
        
    </div>);

};

export default HomePage;