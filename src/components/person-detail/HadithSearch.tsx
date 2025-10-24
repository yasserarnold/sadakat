import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const HadithSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [searchUrl, setSearchUrl] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setSearchUrl(`https://dorar.net/hadith/search?q=${encodeURIComponent(searchQuery)}`);
      setIsOpen(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7 }}>

      <Card className="border-slate-200 shadow-lg" style={{ background: "rgba(255, 255, 255, 0.85)" }}>
        <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b rounded-t-lg">
          <CardTitle className="flex items-center gap-3 text-xl sm:text-2xl text-slate-800">
            <Search className="h-6 w-6 text-blue-600" />
            البحث عن حديث
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <p className="text-sm text-slate-600 text-center">
              ابحث في أحاديث النبي ﷺ من موقع الدرر السنية
            </p>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="ابحث عن حديث..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1"
                dir="rtl" />

              <Button
                onClick={handleSearch}
                className="gap-2 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700">
                <Search className="h-4 w-4" />
                بحث
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-center">نتائج البحث عن: {searchQuery}</DialogTitle>
          </DialogHeader>
          <iframe
            src={searchUrl}
            className="w-full h-full rounded-lg border"
            title="نتائج البحث عن الحديث" />

        </DialogContent>
      </Dialog>
    </motion.div>);

};

export default HadithSearch;