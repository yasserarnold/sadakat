import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PersonDetailPage from "@/pages/PersonDetailPage";
import { getAllPersons } from "@/data/persons";

const PersonDetailPageWrapper = () => {
  const navigate = useNavigate();
  const [firstPersonId, setFirstPersonId] = useState<string | null>(null);

  useEffect(() => {
    // Get the first person from the list
    const persons = getAllPersons();
    if (persons.length > 0) {
      setFirstPersonId(persons[0].id);
    } else {
      // If no persons found, redirect to home
      navigate("/home");
    }
  }, [navigate]);

  // If we have the first person ID, render the PersonDetailPage with it
  if (firstPersonId) {
    return <PersonDetailPage personId={firstPersonId} />;
  }

  // Show loading while determining the first person
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center" dir="rtl">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-lg text-slate-600">جاري التحميل...</p>
      </div>
    </div>
  );
};

export default PersonDetailPageWrapper;