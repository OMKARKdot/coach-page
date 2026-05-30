import Link from "next/link";
import { IndianRupee, CheckCircle, Clock, BookOpen, CreditCard, ArrowLeft } from "lucide-react";

const plans = [
  { name: "NEET Comprehensive", duration: "2 Years", fee: "₹1,25,000", installment: "₹7,500/month", popular: true,
    features: ["All subjects included", "Weekly mock tests", "Doubt sessions", "Study material", "Personal mentoring"] },
  { name: "JEE Advanced", duration: "2 Years", fee: "₹1,10,000", installment: "₹6,500/month", popular: false,
    features: ["Physics, Chemistry, Maths", "Weekly mock tests", "Doubt sessions", "Study material"] },
  { name: "MHT-CET Crash", duration: "6 Months", fee: "₹45,000", installment: "₹8,500/month", popular: false,
    features: ["Intensive revision", "Daily practice tests", "Topic-wise quizzes", "Study material"] },
  { name: "NEET Dropper", duration: "1 Year", fee: "₹85,000", installment: "₹8,000/month", popular: false,
    features: ["Complete syllabus", "Daily tests", "Personal mentoring", "Study material"] },
  { name: "Foundation (9-10)", duration: "1 Year", fee: "₹35,000", installment: "₹3,500/month", popular: false,
    features: ["Maths & Science", "Concept building", "Weekly assessments", "Study material"] },
  { name: "JEE Dropper", duration: "1 Year", fee: "₹75,000", installment: "₹7,000/month", popular: false,
    features: ["Full syllabus", "Mock test series", "Doubt sessions", "Study material"] },
];

export default function FeesPage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-12">
        <Link href={`/coach/${params.slug}`} className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all mb-8 text-sm shadow-md">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <IndianRupee className="w-8 h-8 text-green-600" />
          <h1 className="text-3xl font-bold text-gray-900">Fees</h1>
        </div>
        <p className="text-gray-600 mb-8">Affordable fee plans with flexible installment options</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {plans.map((p) => (
            <div key={p.name} className={`relative bg-white border rounded-xl p-6 transition-all ${
              p.popular ? "border-primary-500 shadow-lg ring-2 ring-primary-500/20" : "border-gray-200 hover:border-green-300 hover:shadow-md"
            }`}>
              {p.popular && <span className="absolute -top-3 left-4 bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full">Most Popular</span>}
              <div className="flex items-center gap-2 mb-3"><BookOpen className="w-5 h-5 text-green-600" /><h3 className="font-bold text-gray-900">{p.name}</h3></div>
              <div className="flex items-center gap-1 mb-1"><Clock className="w-4 h-4 text-gray-400" /><span className="text-sm text-gray-500">{p.duration}</span></div>
              <p className="text-3xl font-black text-gray-900 mb-1">{p.fee}</p>
              <p className="text-sm text-gray-500 mb-4">Starting at {p.installment}</p>
              <ul className="space-y-2">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0" /><span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
