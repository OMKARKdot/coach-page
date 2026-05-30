export default function NoticesTicker({ notices }: { notices: any[] }) {
  const activeNotices = notices?.filter(n => n.show_on_website && (n.type === 'admission' || n.urgency === 'high')) || [];

  if (activeNotices.length === 0) return null;

  return (
    <div className="relative bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-white overflow-hidden py-3 h-12 flex items-center shadow-lg shadow-amber-500/10">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-amber-500 to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-amber-500 to-transparent z-10" />

      <div className="flex items-center gap-2 px-4 py-1.5 bg-white/15 backdrop-blur-md rounded-lg mx-4 shrink-0 z-20 border border-white/10">
        <svg className="w-4 h-4 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
        </svg>
        <span className="text-xs font-bold uppercase tracking-widest">Updates</span>
      </div>

      <div className="whitespace-nowrap flex items-center animate-marquee ml-4">
        {activeNotices.map((notice, idx) => (
          <span key={notice.id || idx} className="mx-8 flex items-center gap-2 shrink-0">
            <span className="w-1.5 h-1.5 bg-white/80 rounded-full" />
            <span className="text-sm font-semibold">{notice.title}</span>
          </span>
        ))}
        {activeNotices.map((notice, idx) => (
          <span key={`dup-${notice.id || idx}`} className="mx-8 flex items-center gap-2 shrink-0">
            <span className="w-1.5 h-1.5 bg-white/80 rounded-full" />
            <span className="text-sm font-semibold">{notice.title}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
