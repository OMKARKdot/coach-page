export default function AboutSection({ profile }: { profile: any }) {
  const features = [
    { title: "Experienced Faculty", icon: "🎓", desc: "IIT/NIT alumni with 10+ years" },
    { title: "Proven Results", icon: "🏆", desc: "500+ selections every year" },
    { title: "Study Material", icon: "📚", desc: "Comprehensive & updated" },
    { title: "Mock Tests", icon: "📝", desc: "Weekly tests & analysis" },
    { title: "Doubt Sessions", icon: "❓", desc: "Personal attention daily" },
    { title: "Affordable Fees", icon: "💰", desc: "Easy installment options" },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden relative">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-slate-50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-full mb-6">
              About Us
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
              Why Choose{" "}
              <span className="text-gradient">{profile?.institute_name}</span>?
            </h2>
            <p className="text-slate-600 text-lg mb-10 leading-relaxed">
              {profile?.about || "With over a decade of experience, we have been the lighthouse for students in Marathwada. Our methodology focuses on building strong fundamentals and then layering them with rigorous practice."}
            </p>

            {/* Achievements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {profile?.achievements?.map((ach: string, idx: number) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                  <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-slate-700 text-sm font-medium">{ach}</span>
                </div>
              ))}
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {features.map((f, i) => (
                <div key={i} className="text-center p-4 rounded-xl bg-gradient-to-b from-slate-50 to-white border border-slate-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all duration-300 group">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{f.icon}</div>
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-1">{f.title}</div>
                  <div className="text-[10px] text-slate-500">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Side */}
          <div className="relative">
            <div className="absolute -top-8 -left-8 w-72 h-72 bg-blue-100/50 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
            <div className="absolute -bottom-8 -right-8 w-72 h-72 bg-indigo-100/50 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-100/50 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />

            <div className="relative bg-white rounded-3xl shadow-2xl shadow-slate-200/50 overflow-hidden border border-slate-100">
              <div className="aspect-[4/3] bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-xl shadow-blue-500/25">
                    <span className="font-heading text-4xl font-black text-white">
                      {profile?.institute_name?.charAt(0) || "B"}
                    </span>
                  </div>
                  <p className="font-heading text-xl font-bold text-slate-900 mb-1">{profile?.institute_name}</p>
                  <p className="text-sm text-slate-500">Since {profile?.established_year || "2012"}</p>
                  <div className="mt-6 flex justify-center gap-8">
                    <div className="text-center">
                      <p className="font-heading text-2xl font-black text-blue-600">{profile?.total_students_trained || "2400"}+</p>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Students</p>
                    </div>
                    <div className="text-center">
                      <p className="font-heading text-2xl font-black text-indigo-600">{profile?.established_year ? new Date().getFullYear() - profile.established_year : "12"}+</p>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Years</p>
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
