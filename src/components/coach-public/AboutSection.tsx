export default function AboutSection({ profile }: { profile: any }) {
  const features = [
    { title: "IIT/NIT Faculty", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", desc: "10+ years avg. experience" },
    { title: "Proven Results", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", desc: "500+ selections yearly" },
    { title: "Smart Material", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", desc: "Curated & updated yearly" },
    { title: "Mock Tests", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", desc: "Weekly + AI analysis" },
    { title: "Doubt Sessions", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z", desc: "Daily personalized attention" },
    { title: "Easy Finance", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", desc: "Installment options" },
  ];

  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 premium-gradient-light" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              <span className="text-xs font-bold text-indigo-700 uppercase tracking-widest">About Us</span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-[1.1] tracking-tight">
              Why Choose{" "}
              <span className="premium-text-gradient">{profile?.institute_name}</span>?
            </h2>
            <p className="text-slate-600 text-lg md:text-xl mb-12 leading-relaxed">
              {profile?.about || "With over a decade of experience, we have been the lighthouse for students in Marathwada. Our methodology focuses on building strong fundamentals and then layering them with rigorous practice."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
              {profile?.achievements?.map((ach: string, idx: number) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/60 shadow-sm hover:border-indigo-200 hover:shadow-md transition-all duration-300">
                  <span className="flex-shrink-0 w-7 h-7 premium-gradient-primary rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-slate-700 text-sm font-semibold">{ach}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {features.map((f, i) => (
                <div key={i} className="group text-center p-5 premium-card premium-card-hover rounded-2xl cursor-default">
                  <div className="w-10 h-10 mx-auto mb-3 premium-gradient-primary rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/15 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={f.icon} />
                    </svg>
                  </div>
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-1">{f.title}</div>
                  <div className="text-[10px] text-slate-500 font-medium">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-12 -left-12 w-80 h-80 bg-indigo-100/60 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
            <div className="absolute -bottom-12 -right-12 w-80 h-80 bg-purple-100/60 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />

            <div className="relative bg-white rounded-3xl shadow-2xl shadow-slate-200/50 overflow-hidden border border-slate-100 premium-card-hover hover:-translate-y-2">
              <div className="aspect-[4/3] bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03]" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234f46e5' fill-opacity='0.5'%3E%3Cpath d='M20 0v40M0 20h40'/%3E%3C/g%3E%3C/svg%3E")`,
                }} />
                <div className="text-center p-10 relative z-10">
                  <div className="w-28 h-28 mx-auto mb-6 rounded-2xl premium-gradient-primary flex items-center justify-center shadow-2xl shadow-indigo-500/30 ring-4 ring-white/50">
                    <span className="font-heading text-5xl font-black text-white">
                      {profile?.institute_name?.charAt(0) || "B"}
                    </span>
                  </div>
                  <p className="font-heading text-2xl font-bold text-slate-900 mb-1">{profile?.institute_name}</p>
                  <p className="text-sm text-slate-500 font-medium">Since {profile?.established_year || "2012"}</p>
                  <div className="mt-8 flex justify-center gap-12">
                    <div className="text-center">
                      <p className="font-heading text-3xl font-black premium-text-gradient">{profile?.total_students_trained || "2400"}+</p>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Students</p>
                    </div>
                    <div className="text-center">
                      <p className="font-heading text-3xl font-black premium-text-gradient-gold">{profile?.established_year ? new Date().getFullYear() - profile.established_year : "12"}+</p>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Years</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
