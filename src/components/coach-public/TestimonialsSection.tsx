export default function TestimonialsSection({ testimonials }: { testimonials: any[] }) {
  const publishedTestimonials = testimonials?.filter((t: any) => t.published) || [];

  if (publishedTestimonials.length < 1) return null;

  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 premium-gradient" />
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/15 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-xs font-bold text-white/90 uppercase tracking-widest">Testimonials</span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-[1.1] tracking-tight">
            What Our Students Say
          </h2>
          <p className="text-indigo-200/80 max-w-2xl mx-auto text-lg md:text-xl font-medium">
            The success stories of our students are our biggest rewards. Hear directly from them about their experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publishedTestimonials.map((t: any, i: number) => (
            <div
              key={t.id}
              className="group premium-glass-dark rounded-2xl p-8 transition-all duration-500 hover:-translate-y-1 hover:bg-white/10 animate-fade-in"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="text-6xl font-serif text-white/10 leading-none mb-4">&ldquo;</div>

              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, idx) => (
                  <svg key={idx} className={`w-4 h-4 ${idx < t.rating ? "text-amber-400" : "text-white/20"}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-white/90 text-base italic mb-6 leading-relaxed">&ldquo;{t.text}&rdquo;</p>

              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="w-12 h-12 premium-gradient-primary rounded-full flex items-center justify-center font-heading font-bold text-white text-lg shadow-lg shadow-indigo-500/20">
                  {t.student_name?.[0]}
                </div>
                <div>
                  <p className="font-bold text-white">{t.student_name}</p>
                  <p className="text-sm text-indigo-300/80 font-medium">{t.standard}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
