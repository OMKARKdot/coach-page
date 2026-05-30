import Link from "next/link";
import { MessageSquare, Star, Quote, ArrowLeft } from "lucide-react";

const testimonials = [
  { name: "Rajesh Pawar", exam: "NEET 2024", text: "The coaching here transformed my preparation. The faculty is incredibly supportive and the study material is top-notch. I secured AIR 142 in NEET 2024!", rating: 5 },
  { name: "Ananya Gupta", exam: "JEE Advanced 2024", text: "Best decision I ever made! The structured batch system and regular mock tests helped me crack JEE Advanced with a good rank. Now at IIT Bombay.", rating: 5 },
  { name: "Soham Kulkarni", exam: "MHT-CET 2024", text: "Excellent coaching institute with experienced teachers. The doubt sessions and personalized attention helped me improve my weak areas significantly.", rating: 5 },
  { name: "Neha Jadhav", exam: "NEET 2024", text: "I joined the crash course and was amazed by the quality of teaching. The daily practice tests were extremely helpful for my preparation.", rating: 5 },
  { name: "Aditya More", exam: "JEE Advanced 2023", text: "The faculty here genuinely cares about each student. They went above and beyond to help me understand complex concepts. Grateful for this institute.", rating: 5 },
  { name: "Pooja Deshmukh", exam: "MHT-CET 2023", text: "A fantastic learning environment with great infrastructure. The weekend batch was perfect for my schedule and the results speak for themselves.", rating: 4 },
];

export default function TestimonialsPage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 pt-24 pb-12">
        <Link href={`/coach/${params.slug}`} className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all mb-8 text-sm shadow-md">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <MessageSquare className="w-8 h-8 text-pink-600" />
          <h1 className="text-3xl font-bold text-gray-900">Testimonials</h1>
        </div>
        <p className="text-gray-600 mb-8">What our students say about us</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white border border-gray-200 rounded-xl p-6 hover:border-pink-300 hover:shadow-md transition-all relative">
              <Quote className="w-6 h-6 text-pink-200 absolute top-4 right-4" />
              <p className="text-gray-700 text-sm leading-relaxed mb-4 italic">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-0.5 mb-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
              <p className="text-xs text-gray-500">{t.exam}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
