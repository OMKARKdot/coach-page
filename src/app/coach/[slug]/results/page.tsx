import Link from "next/link";
import { Trophy, Medal, Award, TrendingUp, Star, ArrowLeft } from "lucide-react";

const results = [
  { name: "Ravi Deshmukh", rank: "AIR 142", exam: "NEET 2024", score: "720/720", achievement: "Gold Medalist", year: 2024 },
  { name: "Priya Sharma", rank: "AIR 285", exam: "JEE Advanced 2024", score: "98.7%", achievement: "IIT Bombay", year: 2024 },
  { name: "Amit Patil", rank: "99.8 Percentile", exam: "MHT-CET 2024", score: "199/200", achievement: "Top 100", year: 2024 },
  { name: "Sneha Joshi", rank: "AIR 450", exam: "NEET 2024", score: "695/720", achievement: "Govt Medical Seat", year: 2024 },
  { name: "Rohit Kale", rank: "AIR 189", exam: "JEE Advanced 2023", score: "99.2%", achievement: "IIT Delhi", year: 2023 },
  { name: "Kavya Deshmukh", rank: "99.6 Percentile", exam: "MHT-CET 2023", score: "195/200", achievement: "COEP Pune", year: 2023 },
];

export default function ResultsPage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 pt-24 pb-12">
        <Link href={`/coach/${params.slug}`} className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all mb-8 text-sm shadow-md">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <Trophy className="w-8 h-8 text-amber-500" />
          <h1 className="text-3xl font-bold text-gray-900">Results</h1>
        </div>
        <p className="text-gray-600 mb-8">Our students consistently achieve top ranks in competitive exams</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((r) => (
            <div key={r.name} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-amber-300 hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-3">
                <Medal className="w-7 h-7 text-amber-500" />
                <div>
                  <h3 className="font-bold text-gray-900">{r.name}</h3>
                  <p className="text-xs text-gray-500">{r.exam} · {r.year}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-amber-50 text-amber-700 font-bold text-sm px-3 py-1 rounded-full">{r.rank}</span>
                <span className="text-gray-500 text-sm">{r.score}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Star className="w-3.5 h-3.5 text-amber-500" />
                <span>{r.achievement}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
