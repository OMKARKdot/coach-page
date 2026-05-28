export default function BatchesSection({ batches }: { batches: any[] }) {
  if (!batches || batches.length === 0) return null;

  const statusColors: Record<string, string> = {
    admissions_open: "from-emerald-500 to-green-600",
    ongoing: "from-blue-500 to-indigo-600",
    completed: "from-slate-400 to-slate-500",
  };

  const statusLabels: Record<string, string> = {
    admissions_open: "Admissions Open",
    ongoing: "Ongoing",
    completed: "Completed",
  };

  return (
    <section id="batches" className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
            Programmes
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-black text-slate-900 mb-4">
            Upcoming & Ongoing Batches
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Choose the batch that fits your schedule. Early bird discounts available for early admissions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {batches.map((batch, idx) => {
            const fillPercent = batch.total_seats > 0 ? Math.round((batch.seats_filled / batch.total_seats) * 100) : 0;
            const isHighDemand = fillPercent > 80;

            return (
              <div
                key={batch.id}
                className={`group relative bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-200/50 ${batch.highlight ? "ring-2 ring-blue-500 shadow-xl shadow-blue-500/10" : "shadow-lg shadow-slate-200/50 border border-slate-100"}`}
              >
                {/* Top Gradient Bar */}
                <div className={`h-1.5 bg-gradient-to-r ${batch.highlight ? "from-blue-500 via-indigo-500 to-purple-500" : "from-slate-200 to-slate-300"}`} />

                {batch.highlight && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      Featured
                    </span>
                  </div>
                )}

                <div className="p-8">
                  <h3 className="font-heading text-xl font-bold text-slate-900 mb-2 pr-20">{batch.batch_name}</h3>
                  <p className="text-sm text-slate-500 mb-6">{batch.course_type} — {batch.standard}</p>

                  <div className="space-y-3 mb-6">
                    {[
                      { icon: "📅", label: "Starts", value: batch.start_date },
                      { icon: "⏰", label: "Timing", value: batch.timing },
                      { icon: "📚", label: "Subjects", value: batch.subjects?.join(", ") },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm">
                        <span className="text-base">{item.icon}</span>
                        <span className="text-slate-500 w-16 font-medium">{item.label}</span>
                        <span className="text-slate-700 font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Seats Progress */}
                  <div className="mb-6 p-4 bg-slate-50 rounded-xl">
                    <div className="flex justify-between text-xs font-semibold text-slate-500 mb-2">
                      <span>SEATS FILLED</span>
                      <span>{batch.seats_filled}/{batch.total_seats}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${isHighDemand ? "from-red-500 to-orange-500" : "from-blue-500 to-indigo-500"} transition-all duration-1000`}
                        style={{ width: `${fillPercent}%` }}
                      />
                    </div>
                    {isHighDemand && batch.status === "admissions_open" && (
                      <p className="text-[10px] text-red-600 font-bold mt-2 uppercase flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                        Only {batch.total_seats - batch.seats_filled} seats left!
                      </p>
                    )}
                  </div>

                  <a
                    href="#enquire"
                    className="block w-full text-center py-3.5 bg-gradient-to-r from-slate-900 to-slate-800 text-white font-bold rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-lg shadow-slate-900/10 hover:shadow-blue-600/25"
                  >
                    Book Your Seat →
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
