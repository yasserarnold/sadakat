import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Calendar } from "lucide-react";
import { Person } from "@/lib/persons";

interface PersonHeaderProps {
  person: Person;
}

const PersonHeader = ({ person }: PersonHeaderProps) => {
  const getInitials = (name: string) => {
    const words = name.split(' ');
    if (words.length >= 2) {
      return words[0][0] + words[1][0];
    }
    return name.substring(0, 2);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="overflow-hidden border-slate-200 shadow-xl bg-white/90 backdrop-blur">
        <CardContent className="p-6 sm:p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            {/* Avatar */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-blue-100 shadow-lg">
                <AvatarImage
                  src={person.image_url || ""}
                  alt={person.name}
                  className="object-cover"
                />
                <AvatarFallback className="text-4xl font-bold bg-gradient-to-br from-blue-100 to-purple-100 text-blue-700">
                  {getInitials(person.name)}
                </AvatarFallback>
              </Avatar>
            </motion.div>

            {/* Info */}
            <div className="flex-1 text-center md:text-right space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800">
                {person.name}
              </h1>
              
              {person.description && (
                <p className="text-lg text-slate-600 leading-relaxed">
                  {person.description}
                </p>
              )}

              {(person.birth_date || person.death_date) && (
                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-slate-600">
                  {person.birth_date && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <span>الميلاد: {person.birth_date}</span>
                    </div>
                  )}
                  {person.death_date && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-purple-600" />
                      <span>الوفاة: {person.death_date}</span>
                    </div>
                  )}
                </div>
              )}

              <div className="pt-4">
                <p className="text-xl font-semibold text-blue-600">
                  رحمه الله وأسكنه فسيح جناته
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PersonHeader;