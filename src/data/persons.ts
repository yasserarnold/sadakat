export interface Person {
  id: string;
  name: string;
  image: string;
  fallback: string;
  prayerAudio?: string;
}

export const persons: Person[] = [
{
  id: "khaled-ibrahim",
  name: "خالد ابراهيم شقا",
  image: "/images/khalledd.png",
  fallback: "أ",
  prayerAudio: "/audio/doaa.mp3"
},
{
  id: "zaky-shaqa",
  name: "زكي ابراهيم شقا",
  image: "https://newoaks.s3.us-west-1.amazonaws.com/AutoDev/77020/3db4255c-464e-451f-a702-f7d8eb7fb1a5.png",
  fallback: "زكي",
prayerAudio: "/audio/doaa.mp3"
},
{
  id: "khadr-zaky",
  name: "خضر زكي شقا",
  image: "https://newoaks.s3.us-west-1.amazonaws.com/AutoDev/77020/3db4255c-464e-451f-a702-f7d8eb7fb1a5.png",
  fallback: "خضر",
prayerAudio: "/audio/doaa.mp3"
},
{
  id: "mohamed-shaqa",
  name: "محمد شقا",
  image: "https://newoaks.s3.us-west-1.amazonaws.com/AutoDev/77020/3db4255c-464e-451f-a702-f7d8eb7fb1a5.png",
  fallback: "محمد",
prayerAudio: "/audio/doaa.mp3"
},
{
  id: "aly-shaqa",
  name: "علي شقا",
  image: "https://newoaks.s3.us-west-1.amazonaws.com/AutoDev/77020/3db4255c-464e-451f-a702-f7d8eb7fb1a5.png",
  fallback: " علي",
prayerAudio: "/audio/doaa.mp3"
},
{
  id: "ahmed-shaqa",
  name: "احمد شقا",
  image: "https://newoaks.s3.us-west-1.amazonaws.com/AutoDev/77020/3db4255c-464e-451f-a702-f7d8eb7fb1a5.png",
  fallback: "احمد",
prayerAudio: "/audio/doaa.mp3"
},
{
  id: "saed-abdelazeem",
  name: "الشيخ/ سعيد عبد العظيم",
  image: "https://newoaks.s3.us-west-1.amazonaws.com/AutoDev/77020/3db4255c-464e-451f-a702-f7d8eb7fb1a5.png",
  fallback: "س"
},
{
  id: "mahmoud-khalil-alhussary",
  name: "الشيخ/ محمود خليل الحصري",
  image: "https://newoaks.s3.us-west-1.amazonaws.com/NewOaks/5500/9bbfa26c-6270-40c4-a1ae-3ad8aca63d66.jpeg",
  fallback: "م"
}];


// Get all persons including custom ones from localStorage
export const getAllPersons = (): Person[] => {
  try {
    const customData = localStorage.getItem('custom_persons');
    const customPersons: Person[] = customData ? JSON.parse(customData) : [];
    return [...persons, ...customPersons];
  } catch {
    return persons;
  }
};

export const getPersonById = (id: string): Person | undefined => {
  const allPersons = getAllPersons();
  return allPersons.find((p) => p.id === id);
};