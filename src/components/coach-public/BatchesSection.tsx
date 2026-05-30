export default function BatchesSection({ batches }: { batches: any[] }) {
  if (!batches || batches.length === 0) return null;

  const statusColors: Record<string, string> = {
    admissions_open: "from-emerald-500 to-green-600",
    ongoing: "from-indigo-500 to-purple-600",
    completed: "from-slate-400 to-slate-500",
    closing_soon: "from-amber-500 to-orange-600",
  };

  const statusLabels: Record<string, string> = {
    admissions_open: "Admissions Open",
    ongoing: "Ongoing",
    completed: "Completed",
    closing_soon: "Closing Soon",
  };

  return (
    <section id="batches" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 premium-gradient-light" />
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234f46e5' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            <span className="text-xs font-bold text-indigo-700 uppercase tracking-widest">Programmes</span>
          </div>
          <h2 className="premium-section-title">Upcoming &amp; Ongoing Batches</h2>
          <p className="premium-section-subtitle">
            Choose the batch that fits your schedule. Early bird discounts available for early admissions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {batches.map((batch) => {
            const fillPercent = batch.total_seats > 0 ? Math.round((batch.seats_filled / batch.total_seats) * 100) : 0;
            const isHighDemand = fillPercent > 80;

            return (
              <div
                key={batch.id}
                className={`group relative premium-card premium-card-hover rounded-2xl overflow-hidden ${
                  batch.highlight ? "ring-2 ring-indigo-500/30 shadow-xl shadow-indigo-500/5" : ""
                }`}
              >
                <div className={`h-1.5 bg-gradient-to-r ${
                  batch.highlight ? "from-indigo-500 via-purple-500 to-pink-500" : "from-slate-200 to-slate-300"
                }`} />

                <div className="p-8">
                  <div className="flex items-start justify-between gap-3 mb-7">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-heading text-xl font-bold text-slate-900">{batch.batch_name}</h3>
                        {batch.highlight && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 premium-gradient-accent text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg shadow-amber-500/30 shrink-0">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-500 font-medium mt-1">{batch.course_type} — {batch.standard}</p>
                    </div>
                    <span className={`shrink-0 inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r ${
                      statusColors[batch.status] || "from-slate-400 to-slate-500"
                    } text-white shadow-sm`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        batch.status === "admissions_open" ? "bg-white animate-pulse" : "bg-white/60"
                      }`} />
                      {statusLabels[batch.status] || batch.status}
                    </span>
                  </div>

                  <div className="space-y-3.5 mb-6">
                    {[
                      { icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", label: "Starts", value: batch.start_date },
                      { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", label: "Timing", value: batch.timing },
                      { icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", label: "Subjects", value: batch.subjects?.join(", ") },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                          <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                          </svg>
                        </div>
                        <span className="text-slate-400 font-medium min-w-[3.5rem] text-xs uppercase tracking-wider">{item.label}</span>
                        <span className="text-slate-700 font-semibold">{item.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mb-6 p-5 bg-slate-50/80 rounded-xl border border-slate-100">
                    <div className="flex justify-between text-xs font-bold text-slate-500 mb-2.5">
                      <span>Seats Filled</span>
                      <span className={isHighDemand ? "text-amber-600" : ""}>{batch.seats_filled}/{batch.total_seats}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${
                          isHighDemand ? "from-amber-500 to-red-500" : "from-indigo-500 to-purple-500"
                        } transition-all duration-1000 ease-out`}
                        style={{ width: `${fillPercent}%` }}
                      />
                    </div>
                    {isHighDemand && batch.status === "admissions_open" && (
                      <p className="text-[10px] text-red-600 font-bold mt-2.5 uppercase flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                        Only {batch.total_seats - batch.seats_filled} seats left!
                      </p>
                    )}
                  </div>

                  <a
                    href="#enquire"
                    className="block w-full text-center py-3.5 premium-gradient-primary text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5"
                  >
                    Book Your Seat
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
