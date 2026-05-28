export default function FacultySection({ faculty }: { faculty: any[] }) {
  if (!faculty || faculty.length === 0) return null;

  return (
    <section id="faculty" className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
            Expert Team
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-black text-slate-900 mb-4">
            Meet Our Expert Faculty
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Our teachers are not just educators, but mentors who have years of experience in cracking competitive exams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {faculty.map((member: any) => (
            <div
              key={member.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg shadow-slate-200/50 border border-slate-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-200/70"
            >
              {/* Photo */}
              <div className="aspect-[4/5] relative overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-heading text-6xl font-black text-blue-200 group-hover:scale-110 transition-transform duration-500">
                    {member.name?.charAt(0)}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {member.experience && (
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0">
                    <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold rounded-lg">
                      {member.experience}+ Years Experience
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="font-heading text-lg font-bold text-slate-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-semibold text-sm mb-3">{member.subject}</p>
                {member.qualification && (
                  <p className="text-slate-500 text-xs mb-4 font-medium leading-relaxed">{member.qualification}</p>
                )}
                {member.specialties && (
                  <div className="flex flex-wrap gap-1.5">
                    {member.specialties.map((spec: string, i: number) => (
                      <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider rounded">
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
