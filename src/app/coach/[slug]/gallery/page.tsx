import Link from "next/link";
import { Image, ArrowLeft } from "lucide-react";

const images = [
  { src: "https://images.unsplash.com/photo-1523050853063-bd80e295ce7f?auto=format&fit=crop&q=80&w=600&h=400", alt: "Campus Building", label: "Main Campus" },
  { src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=600&h=400", alt: "Smart Classroom", label: "Classroom" },
  { src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600&h=400", alt: "Library", label: "Library" },
  { src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=600&h=400", alt: "Students Studying", label: "Study Hall" },
  { src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600&h=400", alt: "Lab Session", label: "Science Lab" },
  { src: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=80&w=600&h=400", alt: "Award Ceremony", label: "Award Ceremony" },
  { src: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&q=80&w=600&h=400", alt: "Computer Lab", label: "Computer Lab" },
  { src: "https://images.unsplash.com/photo-1529543544282-ea994407a271?auto=format&fit=crop&q=80&w=600&h=400", alt: "Sports Day", label: "Annual Sports" },
  { src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=600&h=400", alt: "Workshop", label: "Workshop" },
];

export default function GalleryPage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-12">
        <Link href={`/coach/${params.slug}`} className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all mb-8 text-sm shadow-md">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <Image className="w-8 h-8 text-teal-600" />
          <h1 className="text-3xl font-bold text-gray-900">Gallery</h1>
        </div>
        <p className="text-gray-600 mb-8">Glimpses of our institute and campus life</p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {images.map((img) => (
            <div key={img.alt} className="group relative overflow-hidden rounded-xl aspect-[3/2] bg-gray-100">
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <p className="text-white text-sm font-medium">{img.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
