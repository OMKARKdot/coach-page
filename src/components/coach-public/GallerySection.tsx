export default function GallerySection({ images }: { images: any[] }) {
  if (!images || images.length === 0) return null;

  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 premium-gradient-light" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 border border-purple-100 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-purple-500" />
            <span className="text-xs font-bold text-purple-700 uppercase tracking-widest">Campus Life</span>
          </div>
          <h2 className="premium-section-title">Life at Our Institute</h2>
          <p className="premium-section-subtitle">
            A sneak peek into our classrooms, labs, and the vibrant environment where students learn and grow.
          </p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((image: any, i: number) => (
            <div
              key={image.id}
              className="relative group overflow-hidden rounded-2xl premium-card premium-card-hover break-inside-avoid animate-fade-in"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <img
                src={image.image_url}
                alt={image.caption}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end">
                <div className="p-6 w-full">
                  <p className="text-white text-base font-bold mb-1.5">{image.caption}</p>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 backdrop-blur-md text-white/90 text-[10px] font-bold uppercase tracking-wider rounded-full border border-white/10">
                    {image.category?.replace('_', ' ')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
