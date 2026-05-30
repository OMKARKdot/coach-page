export default function ResultsSection({ results }: { results: any[] }) {
  if (!results || results.length === 0) return null;

  const highlightedResults = results.filter((r: any) => r.highlight);

  const stats = [
    { value: "312+", label: "NEET Qualifiers", gradient: "from-indigo-500 to-purple-600" },
    { value: "89%", label: "Selection Rate", gradient: "from-emerald-500 to-green-600" },
    { value: "50+", label: "AIR under 1000", gradient: "from-amber-500 to-orange-600" },
  ];

  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 premium-gradient" />
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-xs font-bold text-white/90 uppercase tracking-widest">Achievements</span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-[1.1] tracking-tight">
            Our Hall of Fame
          </h2>
          <p className="text-indigo-200/80 max-w-2xl mx-auto text-lg md:text-xl font-medium">
            Consistency is our middle name. Year after year, our students have secured top ranks in NEET, JEE, and MHT-CET.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${stat.gradient} p-8 text-white shadow-xl shadow-black/10 animate-fade-in`}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-8 -translate-x-8" />
              <p className="font-heading text-5xl font-black mb-1 relative">{stat.value}</p>
              <p className="text-white/80 text-sm font-bold uppercase tracking-wider relative">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlightedResults.map((result: any, i: number) => (
            <div
              key={result.id}
              className="group relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 text-center border border-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/20 animate-fade-in"
              style={{ animationDelay: `${0.3 + i * 0.1}s` }}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 premium-gradient-accent text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg shadow-amber-500/30">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {result.rank}
                </span>
              </div>

              <div className="relative w-24 h-24 mx-auto mb-5 mt-5 rounded-full overflow-hidden ring-4 ring-white/10 shadow-xl group-hover:ring-indigo-500/30 transition-all">
                <div className="w-full h-full premium-gradient-primary flex items-center justify-center">
                  <span className="font-heading text-3xl font-black text-white">
                    {result.student_name?.charAt(0)}
                  </span>
                </div>
              </div>

              <h3 className="font-heading text-lg font-bold text-white mb-1">{result.student_name}</h3>
              <p className="text-xs text-indigo-300 font-semibold uppercase tracking-wider mb-4">{result.exam}</p>

              {result.score > 0 && (
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/10 backdrop-blur-sm text-white rounded-lg border border-white/10">
                  <span className="text-sm font-bold">{result.score}</span>
                  <span className="text-[10px] text-white/70">marks</span>
                </div>
              )}

              {result.percentile > 0 && (
                <p className="text-xs text-indigo-300 font-semibold mt-2">{result.percentile}%ile</p>
              )}

              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
