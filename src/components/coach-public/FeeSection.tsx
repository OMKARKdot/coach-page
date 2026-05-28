export default function FeeSection({ fees }: { fees: any[] }) {
  const visibleFees = fees?.filter((f: any) => f.show_on_website) || [];
  
  if (visibleFees.length === 0) return null;

  return (
    <section id="fees" className="py-24 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
            Pricing
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-black text-slate-900 mb-4">
            Transparent Fee Structure
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            We believe in transparency. No hidden charges. All our programmes include comprehensive study material.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleFees.map((fee: any, idx: number) => (
            <div
              key={fee.id}
              className={`group relative bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-200/50 ${
                idx === 0 ? "ring-2 ring-blue-500 shadow-xl shadow-blue-500/10" : "shadow-lg shadow-slate-200/50 border border-slate-100"
              }`}
            >
              {idx === 0 && (
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center py-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Most Popular</span>
                </div>
              )}

              <div className="p-8">
                <h3 className="font-heading text-xl font-bold text-slate-900 mb-4">{fee.course_name}</h3>
                
                <div className="flex items-baseline mb-8">
                  <span className="text-slate-400 text-lg">₹</span>
                  <span className="font-heading text-5xl font-black text-slate-900 mx-1">{fee.amount?.toLocaleString()}</span>
                  <span className="text-slate-500 font-medium">/{fee.fee_type}</span>
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
                    <p className="text-xs text-amber-800 font-bold mb-1 flex items-center gap-1">
                      <span>🎓</span> SCHOLARSHIP AVAILABLE
                    </p>
                    <p className="text-[11px] text-amber-700">{fee.scholarship_note}</p>
                  </div>
                )}

                <div className="pt-4 border-t border-slate-100">
                  <p className="text-xs text-slate-400">
                    Total: <span className="font-bold text-slate-600">₹{fee.total_programme_fee?.toLocaleString()}</span>
                  </p>
                </div>

                <a
                  href="#enquire"
                  className={`mt-6 block w-full text-center py-3.5 font-bold rounded-xl transition-all duration-300 ${
                    idx === 0
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40"
                      : "bg-slate-900 text-white hover:bg-slate-800"
                  }`}
                >
                  Get Started →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
