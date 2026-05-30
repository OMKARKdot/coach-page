export default function FacultySection({ faculty }: { faculty: any[] }) {
  if (!faculty || faculty.length === 0) return null;

  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 premium-gradient-light" />
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234f46e5' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            <span className="text-xs font-bold text-indigo-700 uppercase tracking-widest">Expert Team</span>
          </div>
          <h2 className="premium-section-title">Meet Our Expert Faculty</h2>
          <p className="premium-section-subtitle">
            Our teachers are not just educators, but mentors who have years of experience in cracking competitive exams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {faculty.map((member: any, i: number) => (
            <div
              key={member.id}
              className="group premium-card premium-card-hover rounded-2xl overflow-hidden animate-fade-in"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="aspect-[4/5] relative overflow-hidden premium-gradient-primary">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-heading text-7xl font-black text-white/20 group-hover:scale-125 transition-transform duration-700">
                    {member.name?.charAt(0)}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {member.experience && (
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-slate-900 text-[10px] font-bold rounded-lg shadow-lg">
                      <svg className="w-3 h-3 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {member.experience}+ Years
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="font-heading text-lg font-bold text-slate-900 mb-1">{member.name}</h3>
                <p className="text-indigo-600 font-semibold text-sm mb-3">{member.subject}</p>
                {member.qualification && (
                  <p className="text-slate-500 text-xs mb-4 font-medium leading-relaxed">{member.qualification}</p>
                )}
                {member.specialties && (
                  <div className="flex flex-wrap gap-1.5">
                    {member.specialties.map((spec: string, idx: number) => (
                      <span key={idx} className="px-2.5 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-wider rounded-lg">
                        {spec}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
