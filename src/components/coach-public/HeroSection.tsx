export default function HeroSection({ profile }: { profile: any }) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Solid Gradient Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900" />

      {/* Decorative Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-white w-full">
        <div className="max-w-3xl animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-white/90">Admissions Open for 2026-27</span>
          </div>

          <h1 className="font-heading text-5xl md:text-7xl font-black mb-6 leading-[1.1] tracking-tight">
            {profile?.institute_name}
          </h1>

          <p className="text-xl md:text-2xl mb-10 text-blue-100/90 font-medium leading-relaxed max-w-2xl">
            {profile?.tagline}
          </p>

          <div className="flex flex-wrap gap-4 mb-16">
            <a
              href="#enquire"
              className="group px-8 py-4 bg-white text-slate-900 font-bold rounded-xl shadow-2xl shadow-black/20 hover:shadow-white/25 transition-all transform hover:-translate-y-1 flex items-center gap-2"
            >
              <span>Enquire Now</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m0 0H3" />
              </svg>
            </a>
            <a
              href="#batches"
              className="px-8 py-4 border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all transform hover:-translate-y-1"
            >
              View Batches
            </a>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10">
            {[
              { value: `${profile?.total_students_trained || "2400"}+`, label: "Students Trained" },
              { value: "85%", label: "Selection Rate" },
              { value: `${profile?.established_year || "2012"}`, label: "Established" },
              { value: "12+", label: "Years Experience" },
            ].map((stat, i) => (
              <div key={i} className="group">
                <p className="font-heading text-3xl md:text-4xl font-black text-white">{stat.value}</p>
                <p className="text-blue-200/70 text-sm font-medium mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}
