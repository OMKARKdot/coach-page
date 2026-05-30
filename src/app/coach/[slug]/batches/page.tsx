import Link from "next/link";
import { Calendar, Clock, Users, BookOpen, GraduationCap, ArrowLeft } from "lucide-react";

const batches = [
  {
    name: "NEET 2026 — Morning Batch",
    course: "NEET",
    standard: "11th + 12th Combined",
    subjects: ["Physics", "Chemistry", "Biology"],
    start: "June 15, 2026",
    timing: "6:30 AM — 9:00 AM",
    seats: "28/40 filled",
    status: "Admissions Open",
    statusColor: "bg-green-100 text-green-700",
  },
  {
    name: "JEE Advanced 2026 — Evening Batch",
    course: "JEE",
    standard: "11th + 12th Combined",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    start: "June 20, 2026",
    timing: "4:00 PM — 7:00 PM",
    seats: "20/35 filled",
    status: "Admissions Open",
    statusColor: "bg-green-100 text-green-700",
  },
  {
    name: "MHT-CET 2026 — Weekend Batch",
    course: "MHT-CET",
    standard: "12th",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    start: "July 1, 2026",
    timing: "8:00 AM — 2:00 PM",
    seats: "15/50 filled",
    status: "Admissions Open",
    statusColor: "bg-green-100 text-green-700",
  },
  {
    name: "NEET Dropper 2026 — Intensive",
    course: "NEET",
    standard: "Dropper",
    subjects: ["Physics", "Chemistry", "Biology"],
    start: "August 1, 2026",
    timing: "7:00 AM — 12:00 PM",
    seats: "22/30 filled",
    status: "Closing Soon",
    statusColor: "bg-amber-100 text-amber-700",
  },
];

export default function BatchesPage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 pt-24 pb-12">
        <Link href={`/coach/${params.slug}`} className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all mb-8 text-sm shadow-md">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="w-8 h-8 text-primary-600" />
          <h1 className="text-3xl font-bold text-gray-900">Batches</h1>
        </div>
        <p className="text-gray-600 mb-8">Available batches for the academic year 2026-27</p>

        <div className="space-y-4">
          {batches.map((b) => (
            <div key={b.name} className="bg-white border border-gray-200 rounded-xl p-6 hover:border-primary-300 hover:shadow-md transition-all">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{b.name}</h2>
                  <span className="inline-block bg-primary-50 text-primary-700 text-sm font-medium px-3 py-0.5 rounded-full mt-1">{b.course}</span>
                </div>
                <span className={`text-sm font-medium px-3 py-1 rounded-full ${b.statusColor}`}>{b.status}</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-primary-600" /><span>{b.start}</span></div>
                <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary-600" /><span>{b.timing}</span></div>
                <div className="flex items-center gap-2"><Users className="w-4 h-4 text-primary-600" /><span>{b.seats}</span></div>
                <div className="flex items-center gap-2"><GraduationCap className="w-4 h-4 text-primary-600" /><span>{b.standard}</span></div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {b.subjects.map((s) => (
                  <span key={s} className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
