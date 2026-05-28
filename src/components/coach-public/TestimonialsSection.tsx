export default function TestimonialsSection({ testimonials }: { testimonials: any[] }) {
  const publishedTestimonials = testimonials?.filter((t: any) => t.published) || [];
  
  if (publishedTestimonials.length < 1) return null;

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-white/10 text-white/90 text-xs font-bold uppercase tracking-wider rounded-full mb-4 backdrop-blur-sm border border-white/20">
            Testimonials
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-black text-white mb-4">
            What Our Students Say
          </h2>
          <p className="text-blue-200/80 max-w-2xl mx-auto text-lg">
            The success stories of our students are our biggest rewards. Hear directly from them about their experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publishedTestimonials.map((t: any) => (
            <div key={t.id} className="group glass-dark rounded-2xl p-8 hover:bg-white/15 transition-all duration-500 hover:-translate-y-1">
              {/* Quote Mark */}
              <div className="text-6xl font-serif text-white/20 leading-none mb-4">&ldquo;</div>
              
              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-4 h-4 ${i < t.rating ? "text-amber-400" : "text-white/20"}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-white/90 text-base italic mb-6 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
              
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center font-heading font-bold text-white text-lg shadow-lg">
                  {t.student_name?.[0]}
                </div>
                <div>
                  <p className="font-bold text-white">{t.student_name}</p>
                  <p className="text-sm text-blue-300/80">{t.standard}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
