export default function YouTubeSection({ youtubeVideos }: { youtubeVideos: any[] }) {
  if (!youtubeVideos || youtubeVideos.length === 0) return null;

  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 premium-gradient-light" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-100/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-100 rounded-full mb-6">
            <svg className="w-3.5 h-3.5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            <span className="text-xs font-bold text-red-700 uppercase tracking-widest">Video Gallery</span>
          </div>
          <h2 className="premium-section-title">Watch Our Lectures</h2>
          <p className="premium-section-subtitle">
            Get a glimpse of our teaching style. Watch free lectures and result celebrations from our YouTube channel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {youtubeVideos.map((video: any, i: number) => (
            <a
              key={video.youtube_id}
              href={`https://youtube.com/watch?v=${video.youtube_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group cursor-pointer block animate-fade-in"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden premium-card premium-card-hover ring-1 ring-slate-100">
                <img
                  src={`https://img.youtube.com/vi/${video.youtube_id}/maxresdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-90 transition-all" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center shadow-2xl shadow-red-600/30 transform group-hover:scale-110 transition-all duration-300 group-hover:shadow-red-600/50">
                    <svg className="w-7 h-7 fill-current ml-1" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white/90 text-xs font-medium truncate">{video.title}</p>
                </div>
              </div>
              <h3 className="font-heading font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 mt-3">{video.title}</h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
