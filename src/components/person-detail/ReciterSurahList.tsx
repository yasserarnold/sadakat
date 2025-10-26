import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, BookOpen, ChevronLeft } from 'lucide-react';
import { getAllReciters, getReciterReads, Reciter, Read, parseSuras } from '@/lib/reciters';
import { useAudio } from '@/contexts/AudioContext';

const ReciterSurahList = () => {
  const [reciters, setReciters] = useState<Reciter[]>([]);
  const [selectedReciter, setSelectedReciter] = useState<Reciter | null>(null);
  const [reads, setReads] = useState<Read[]>([]);
  const [allSurahIds, setAllSurahIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const { currentlyPlayingId, setCurrentlyPlayingId } = useAudio();

  useEffect(() => {
    loadReciters();
    
    // Cleanup function when component unmounts
    return () => {
      if (audioElement) {
        audioElement.pause();
        setAudioElement(null);
      }
    };
  }, []);

  const loadReciters = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllReciters('ar');
      setReciters(data);
    } catch (err) {
      setError('فشل في تحميل قائمة القراء');
      console.error('Error loading reciters:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectReciter = async (reciter: Reciter) => {
    try {
      setSelectedReciter(reciter);
      setLoading(true);
      setError(null);
      const reciterReads = await getReciterReads(reciter.id, 'ar');
      setReads(reciterReads);
      
      // Combine all surah IDs from all reads
      const allIds: number[] = [];
      reciterReads.forEach(read => {
        const ids = parseSuras(read.suras);
        ids.forEach(id => {
          if (!allIds.includes(id)) {
            allIds.push(id);
          }
        });
      });
      
      // Sort the surah IDs
      allIds.sort((a, b) => a - b);
      setAllSurahIds(allIds);
    } catch (err) {
      setError('فشل في تحميل تلاوات القارئ');
      console.error('Error loading reciter reads:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToReciters = () => {
    setSelectedReciter(null);
    setReads([]);
    setAllSurahIds([]);
    if (audioElement) {
      audioElement.pause();
      setAudioElement(null);
    }
    setCurrentlyPlaying(null);
    setCurrentlyPlayingId(null);
  };

  const handlePlaySurah = (surahId: number) => {
    try {
      // Find the first read that contains this surah
      const readWithSurah = reads.find(read => {
        const surahIds = parseSuras(read.suras);
        return surahIds.includes(surahId);
      });
      
      if (!readWithSurah) {
        setError('لم يتم العثور على التلاوة لهذه السورة');
        return;
      }
      
      // Stop any currently playing audio
      if (audioElement) {
        audioElement.pause();
      }

      // Create new audio element
      const audioUrl = `${readWithSurah.url}${surahId.toString().padStart(3, '0')}.mp3`;
      const audio = new Audio(audioUrl);
      audio.preload = 'none';
      
      const handlePlay = () => {
        setCurrentlyPlaying(`${readWithSurah.id}-${surahId}`);
        setCurrentlyPlayingId(`surah-${readWithSurah.id}-${surahId}`);
      };
      
      const handlePause = () => {
        setCurrentlyPlaying(null);
        setCurrentlyPlayingId(null);
      };
      
      const handleEnded = () => {
        setCurrentlyPlaying(null);
        setCurrentlyPlayingId(null);
      };
      
      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);
      audio.addEventListener('ended', handleEnded);
      
      // Clean up event listeners when component unmounts or audio changes
      const cleanup = () => {
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
        audio.removeEventListener('ended', handleEnded);
      };
      
      // Set up cleanup for when a new audio is created
      setAudioElement(audio);
      
      audio.play().catch(err => {
        console.error('Error playing audio:', err);
        setError('فشل في تشغيل السورة');
        cleanup();
      });
      
    } catch (err) {
      console.error('Error creating audio:', err);
      setError('فشل في إعداد تشغيل السورة');
    }
  };

  const handlePauseSurah = () => {
    if (audioElement) {
      audioElement.pause();
      setCurrentlyPlaying(null);
      setCurrentlyPlayingId(null);
    }
  };

  if (loading && !selectedReciter) {
    return (
      <Card className="border-slate-200 shadow-lg bg-white/90 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="p-2 bg-gradient-to-br from-green-100 to-teal-100 rounded-lg">
              <BookOpen className="h-6 w-6 text-green-600" />
            </div>
            قائمة القراء
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 bg-slate-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (loading && selectedReciter) {
    return (
      <Card className="border-slate-200 shadow-lg bg-white/90 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center justify-between gap-3 text-2xl">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-green-100 to-teal-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
              مصحف {selectedReciter.name}
            </div>
            <Button 
              variant="outline" 
              onClick={handleBackToReciters}
              className="text-sm"
            >
              <ChevronLeft className="h-4 w-4 ml-1" />
              قائمة القراء
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-16 bg-slate-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-slate-200 shadow-lg bg-white/90 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="p-2 bg-gradient-to-br from-green-100 to-teal-100 rounded-lg">
              <BookOpen className="h-6 w-6 text-green-600" />
            </div>
            {selectedReciter ? `مصحف ${selectedReciter?.name || 'القارئ'}` : 'قائمة القراء'}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-center text-red-600">{error}</p>
          <div className="mt-4 text-center">
            <Button onClick={selectedReciter ? () => handleSelectReciter(selectedReciter) : loadReciters}>
              <RotateCcw className="h-4 w-4 ml-2" />
              إعادة المحاولة
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-slate-200 shadow-lg bg-white/90 backdrop-blur">
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-3 text-2xl">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-green-100 to-teal-100 rounded-lg">
              <BookOpen className="h-6 w-6 text-green-600" />
            </div>
            {selectedReciter ? `مصحف ${selectedReciter.name}` : 'قائمة القراء'}
          </div>
          {selectedReciter && (
            <Button 
              variant="outline" 
              onClick={handleBackToReciters}
              className="text-sm"
            >
              <ChevronLeft className="h-4 w-4 ml-1" />
              قائمة القراء
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!selectedReciter ? (
          // List of reciters
          <div className="space-y-2">
            {reciters && reciters.length > 0 ? (
              reciters.map((reciter) => (
                <div 
                  key={reciter.id} 
                  className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                  onClick={() => handleSelectReciter(reciter)}
                >
                  {reciter.photo ? (
                    <img 
                      src={reciter.photo} 
                      alt={reciter.name} 
                      className="w-12 h-12 rounded-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-100 to-teal-100 flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-green-600" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-slate-800">{reciter.name}</h3>
                    <p className="text-sm text-slate-600">
                      {(reciter.reads && reciter.reads.length) || 0} تلاوات متاحة
                    </p>
                  </div>
                  <div className="text-slate-400">
                    <ChevronLeft className="h-5 w-5" />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-slate-500">لا توجد قراء متاحين حالياً</p>
                <Button 
                  variant="outline" 
                  className="mt-4" 
                  onClick={loadReciters}
                >
                  <RotateCcw className="h-4 w-4 ml-2" />
                  إعادة المحاولة
                </Button>
              </div>
            )}
          </div>
        ) : (
          // Surah grid for selected reciter (mushaf view)
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {allSurahIds && allSurahIds.length > 0 ? (
              allSurahIds.map((suraId) => (
                <div 
                  key={suraId} 
                  className={`p-2 rounded text-center text-sm font-medium ${
                    currentlyPlaying?.endsWith(`-${suraId}`) 
                      ? 'bg-green-100 text-green-800 border border-green-300' 
                      : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>سورة {suraId}</span>
                    {currentlyPlaying?.endsWith(`-${suraId}`) ? (
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="p-1 h-auto"
                        onClick={handlePauseSurah}
                      >
                        <Pause className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="p-1 h-auto"
                        onClick={() => handlePlaySurah(suraId)}
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-slate-500">لا توجد سور متاحة لهذا القارئ</p>
                <Button 
                  variant="outline" 
                  className="mt-4" 
                  onClick={handleBackToReciters}
                >
                  العودة إلى قائمة القراء
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReciterSurahList;