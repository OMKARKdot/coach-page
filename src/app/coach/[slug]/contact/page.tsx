import Link from "next/link";
import { Phone, Mail, MapPin, MessageSquare, Clock, ArrowLeft } from "lucide-react";

export default function ContactPage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 pt-24 pb-12">
        <Link href={`/coach/${params.slug}`} className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all mb-8 text-sm shadow-md">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <Phone className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Contact</h1>
        </div>
        <p className="text-gray-600 mb-8">Get in touch with Bright Star Academy</p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4 hover:border-blue-300 transition-colors">
              <div className="bg-blue-100 p-3 rounded-full"><Phone className="w-5 h-5 text-blue-600" /></div>
              <div><p className="text-xs text-gray-500">Phone</p><p className="font-semibold text-gray-900">+91 240 234 0000</p></div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4 hover:border-blue-300 transition-colors">
              <div className="bg-blue-100 p-3 rounded-full"><MessageSquare className="w-5 h-5 text-blue-600" /></div>
              <div><p className="text-xs text-gray-500">WhatsApp</p><p className="font-semibold text-gray-900">+91 93700 00000</p></div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4 hover:border-blue-300 transition-colors">
              <div className="bg-blue-100 p-3 rounded-full"><Mail className="w-5 h-5 text-blue-600" /></div>
              <div><p className="text-xs text-gray-500">Email</p><p className="font-semibold text-gray-900">info@brightstaracademy.in</p></div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4 hover:border-blue-300 transition-colors">
              <div className="bg-blue-100 p-3 rounded-full"><MapPin className="w-5 h-5 text-blue-600" /></div>
              <div><p className="text-xs text-gray-500">Address</p><p className="font-semibold text-gray-900">N-6 CIDCO, Chh. Sambhaji Nagar</p></div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4 hover:border-blue-300 transition-colors">
              <div className="bg-blue-100 p-3 rounded-full"><Clock className="w-5 h-5 text-blue-600" /></div>
              <div><p className="text-xs text-gray-500">Office Hours</p><p className="font-semibold text-gray-900">Mon-Sat: 7:00 AM — 8:00 PM</p></div>
            </div>
          </div>
          <div className="bg-gray-100 border border-gray-200 rounded-xl overflow-hidden min-h-[400px]">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15007.472718105574!2d75.361994!3d19.880496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdb986f32e29329%3A0x6b801a2d6a782a93!2sCIDCO%2C%20Aurangabad%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1716890000000!5m2!1sen!2sin" width="100%" height="100%" style={{ border: 0, minHeight: "400px" }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Location" />
          </div>
        </div>
      </div>
    </div>
  );
}
