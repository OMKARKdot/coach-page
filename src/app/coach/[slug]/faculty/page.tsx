import Link from "next/link";
import { Users, GraduationCap, Star, Award, BookOpen, ArrowLeft } from "lucide-react";

const faculty = [
  { name: "Dr. Suresh Kulkarni", subject: "Physics", qualification: "Ph.D. (Physics), IIT Bombay", experience: "18 years", speciality: "Electrodynamics & Mechanics" },
  { name: "Prof. Meera Joshi", subject: "Chemistry", qualification: "M.Sc. (Chemistry), Gold Medalist", experience: "12 years", speciality: "Organic & Physical Chemistry" },
  { name: "Mr. Aniket Deshmukh", subject: "Mathematics", qualification: "B.Tech (IIT Delhi)", experience: "8 years", speciality: "Calculus & Algebra" },
  { name: "Dr. Pallavi Patil", subject: "Biology", qualification: "MBBS, M.D.", experience: "10 years", speciality: "Human Physiology & Genetics" },
  { name: "Mr. Vikram Jadhav", subject: "Physics", qualification: "M.Sc. (Physics), University Topper", experience: "6 years", speciality: "Optics & Modern Physics" },
  { name: "Mrs. Sunita Gupta", subject: "Chemistry", qualification: "Ph.D. (Chemistry), NCL Pune", experience: "15 years", speciality: "Inorganic Chemistry" },
];

export default function FacultyPage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 pt-24 pb-12">
        <Link href={`/coach/${params.slug}`} className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all mb-8 text-sm shadow-md">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <GraduationCap className="w-8 h-8 text-purple-600" />
          <h1 className="text-3xl font-bold text-gray-900">Faculty</h1>
        </div>
        <p className="text-gray-600 mb-8">Experienced educators dedicated to student success</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {faculty.map((f) => (
            <div key={f.name} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-purple-300 hover:shadow-md transition-all">
              <div className="bg-purple-50 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900">{f.name}</h3>
              <p className="text-purple-600 font-medium text-sm mb-3">{f.subject}</p>
              <div className="space-y-1.5 text-sm text-gray-600">
                <div className="flex items-center gap-2"><Award className="w-4 h-4 text-amber-500" /><span>{f.qualification}</span></div>
                <div className="flex items-center gap-2"><Star className="w-4 h-4 text-amber-500" /><span>{f.experience} experience</span></div>
                <div className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-amber-500" /><span>{f.speciality}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
