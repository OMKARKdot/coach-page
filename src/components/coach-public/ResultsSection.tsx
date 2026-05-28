export default function ResultsSection({ results }: { results: any[] }) {
  if (!results || results.length === 0) return null;

  const highlightedResults = results.filter((r: any) => r.highlight);

  const stats = [
    { value: "312+", label: "NEET Qualifiers", color: "from-blue-500 to-indigo-600" },
    { value: "89%", label: "Selection Rate", color: "from-emerald-500 to-green-600" },
    { value: "50+", label: "AIR under 1000", color: "from-amber-500 to-orange-600" },
  ];

  return (
    <section id="results" className="py-24 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-amber-50 to-orange-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
            Achievements
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-black text-slate-900 mb-4">
            Our Hall of Fame
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Consistency is our middle name. Year after year, our students have secured top ranks in NEET, JEE, and MHT-CET.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, i) => (
            <div key={i} className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${stat.color} p-8 text-white shadow-xl`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
              <p className="font-heading text-5xl font-black mb-1 relative">{stat.value}</p>
              <p className="text-white/80 text-sm font-bold uppercase tracking-wider relative">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Toppers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlightedResults.map((result: any) => (
            <div
              key={result.id}
              className="group relative bg-gradient-to-b from-slate-50 to-white rounded-2xl p-6 text-center border border-slate-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-slate-200/50"
            >
              {/* Rank Badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {result.rank}
                </span>
              </div>

              {/* Avatar */}
              <div className="relative w-28 h-28 mx-auto mb-4 mt-4 rounded-full overflow-hidden ring-4 ring-white shadow-lg group-hover:ring-blue-100 transition-all">
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                  <span className="font-heading text-3xl font-black text-blue-600">
                    {result.student_name?.charAt(0)}
                  </span>
                </div>
              </div>

              <h3 className="font-heading text-lg font-bold text-slate-900 mb-1">{result.student_name}</h3>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-3">{result.exam}</p>

              {result.score > 0 && (
                <div className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-lg mb-3">
                  <span className="text-sm font-bold">{result.score}</span>
                  <span className="text-[10px]">marks</span>
                </div>
              )}

              {result.percentile > 0 && (
                <p className="text-xs text-slate-500 font-medium">
                  {result.percentile}%ile
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
