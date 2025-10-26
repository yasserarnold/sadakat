// API service for fetching reciters and surahs data
export interface Reciter {
  id: number;
  name: string;
  photo?: string;
  profile?: string;
  reads?: Read[];
}

export interface Read {
  id: number;
  name: string;
  url: string;
  rewaya: string;
  suras: string;
  letter?: string;
}

// Fetch all reciters
export const getAllReciters = async (language: string = 'ar'): Promise<Reciter[]> => {
  try {
    const response = await fetch(`https://mp3quran.net/api/v3/reciters?language=${language}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.reciters || [];
  } catch (error) {
    console.error('Error fetching reciters:', error);
    return [];
  }
};

// Fetch specific reciter's reads
export const getReciterReads = async (reciterId: number, language: string = 'ar'): Promise<Read[]> => {
  try {
    const response = await fetch(`https://mp3quran.net/api/v3/reciters?language=${language}&reciter=${reciterId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.reciters?.[0]?.reads || [];
  } catch (error) {
    console.error('Error fetching reciter reads:', error);
    return [];
  }
};

// Parse surahs from a read's suras string
export const parseSuras = (surasString: string): number[] => {
  if (!surasString) return [];
  
  try {
    // Handle different formats like "1,2,3" or "1-5" or "1,2-5,7"
    const ranges = surasString.split(',');
    const surahIds: number[] = [];
    
    ranges.forEach(range => {
      const trimmedRange = range.trim();
      if (trimmedRange.includes('-')) {
        const [start, end] = trimmedRange.split('-').map(Number);
        if (!isNaN(start) && !isNaN(end) && start <= end) {
          for (let i = start; i <= end; i++) {
            surahIds.push(i);
          }
        }
      } else {
        const num = Number(trimmedRange);
        if (!isNaN(num)) {
          surahIds.push(num);
        }
      }
    });
    
    return surahIds;
  } catch (error) {
    console.error('Error parsing suras:', error);
    return [];
  }
};