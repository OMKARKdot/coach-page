export default function YouTubeSection({ youtubeVideos }: { youtubeVideos: any[] }) {
  if (!youtubeVideos || youtubeVideos.length === 0) return null;

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
            Video Gallery
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-black text-slate-900 mb-4">
            Watch Our Lectures
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Get a glimpse of our teaching style. Watch free lectures and result celebrations from our YouTube channel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {youtubeVideos.map((video: any) => (
            <a
              key={video.youtube_id}
              href={`https://youtube.com/watch?v=${video.youtube_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group cursor-pointer block"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg shadow-slate-200/50 mb-4 ring-1 ring-slate-100">
                <img
                  src={`https://img.youtube.com/vi/${video.youtube_id}/maxresdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-all" />
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
              <h3 className="font-heading font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">{video.title}</h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
