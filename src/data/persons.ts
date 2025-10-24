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
  image: "/images/khakhalledd.png",
  fallback: "أ",
  prayerAudio: "/audio/doaa.mp3"
},
{
  id: "abdelhadi-ashiri",
  name: "الحاج/ عبد الهادي عشيرى محمد",
  image: "https://newoaks.s3.us-west-1.amazonaws.com/AutoDev/77020/3db4255c-464e-451f-a702-f7d8eb7fb1a5.png",
  fallback: "ع"
},
{
  id: "mohammed-mamdouh",
  name: "الحاج/ محمد ممدوح مصطفي أمين صالح عرفة",
  image: "https://newoaks.s3.us-west-1.amazonaws.com/AutoDev/77020/3db4255c-464e-451f-a702-f7d8eb7fb1a5.png",
  fallback: "م"
},
{
  id: "ferdaws",
  name: "الحاجة/ فردوس الشيخ الطيب",
  image: "https://newoaks.s3.us-west-1.amazonaws.com/AutoDev/77020/3db4255c-464e-451f-a702-f7d8eb7fb1a5.png",
  fallback: "ف"
},
{
  id: "hasan-abdelmoneim",
  name: "الحسن عبد المنعم رجب",
  image: "https://newoaks.s3.us-west-1.amazonaws.com/AutoDev/77020/3db4255c-464e-451f-a702-f7d8eb7fb1a5.png",
  fallback: "ح"
},
{
  id: "ismail-haniyeh",
  name: "الشهيد بإذن الله/ إسماعيل هنية",
  image: "https://newoaks.s3.us-west-1.amazonaws.com/AutoDev/77020/3db4255c-464e-451f-a702-f7d8eb7fb1a5.png",
  fallback: "إ"
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