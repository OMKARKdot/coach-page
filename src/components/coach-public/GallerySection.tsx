export default function GallerySection({ images }: { images: any[] }) {
  if (!images || images.length === 0) return null;

  return (
    <section id="gallery" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
            Campus Life
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-black text-slate-900 mb-4">
            Life at Our Institute
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            A sneak peek into our classrooms, labs, and the vibrant environment where students learn and grow.
          </p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((image: any) => (
            <div key={image.id} className="relative group overflow-hidden rounded-2xl shadow-lg shadow-slate-200/50 break-inside-avoid ring-1 ring-slate-100">
              <img
                src={image.image_url}
                alt={image.caption}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end">
                <div className="p-6 w-full">
                  <p className="text-white text-sm font-medium mb-1">{image.caption}</p>
                  <span className="inline-block px-2 py-0.5 bg-white/20 backdrop-blur-sm text-white/80 text-[10px] font-bold uppercase tracking-wider rounded">
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
