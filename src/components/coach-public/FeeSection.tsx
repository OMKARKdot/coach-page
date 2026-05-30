export default function FeeSection({ fees }: { fees: any[] }) {
  const visibleFees = fees?.filter((f: any) => f.show_on_website) || [];

  if (visibleFees.length === 0) return null;

  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 premium-gradient-light" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-100/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Pricing</span>
          </div>
          <h2 className="premium-section-title">Transparent Fee Structure</h2>
          <p className="premium-section-subtitle">
            We believe in transparency. No hidden charges. All our programmes include comprehensive study material.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleFees.map((fee: any, idx: number) => (
            <div
              key={fee.id}
              className={`group relative premium-card rounded-2xl overflow-hidden premium-card-hover ${
                idx === 0 ? "ring-2 ring-indigo-500/30 shadow-xl shadow-indigo-500/10" : ""
              } animate-fade-in`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {idx === 0 && (
                <div className="premium-gradient-primary text-white text-center py-2.5">
                  <span className="text-xs font-bold uppercase tracking-widest">Most Popular</span>
                </div>
              )}

              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    idx === 0 ? "premium-gradient-primary" : "bg-slate-100"
                  }`}>
                    <svg className={`w-5 h-5 ${idx === 0 ? "text-white" : "text-slate-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-slate-900">{fee.course_name}</h3>
                </div>

                <div className="flex items-baseline mb-8">
                  <span className="text-slate-400 text-lg font-semibold">₹</span>
                  <span className="font-heading text-5xl font-black text-slate-900 mx-1">{fee.amount?.toLocaleString()}</span>
                  <span className="text-slate-500 font-medium text-sm">/{fee.fee_type === "year" ? "year" : "one-time"}</span>
                </div>

                {fee.includes?.length > 0 && (
                  <ul className="space-y-3 mb-8">
                    {fee.includes.map((item: string, i: number) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-slate-600">
                        <span className="flex-shrink-0 w-5 h-5 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {fee.excludes?.length > 0 && (
                  <div className="mb-6 pt-4 border-t border-slate-100">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">Not Included</p>
                    <div className="flex flex-wrap gap-1.5">
                      {fee.excludes.map((item: string, i: number) => (
                        <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-medium rounded">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {fee.scholarship_available && (
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl border border-amber-100 mb-6">
                    <p className="text-xs text-amber-800 font-bold mb-1 flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0z" />
                      </svg>
                      Scholarship Available
                    </p>
                    <p className="text-[11px] text-amber-700 font-medium">{fee.scholarship_note}</p>
                  </div>
                )}

                <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                  <p className="text-xs text-slate-400">
                    Total: <span className="font-bold text-slate-600">₹{fee.total_programme_fee?.toLocaleString()}</span>
                  </p>
                </div>

                <a
                  href="#enquire"
                  className={`mt-6 block w-full text-center py-3.5 font-bold rounded-xl transition-all duration-300 ${
                    idx === 0
                      ? "premium-gradient-primary text-white shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30"
                      : "bg-slate-900 text-white hover:bg-slate-800 shadow-lg"
                  }`}
                >
                  Get Started
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
