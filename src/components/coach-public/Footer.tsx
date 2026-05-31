export default function Footer({ profile }: { profile: any }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden">
      <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

      <div className="premium-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 mb-6">
                {profile?.logo_url && (
                  <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/20 shadow-lg">
                    <img src={profile.logo_url} alt={profile.institute_name} className="w-full h-full object-cover" />
                  </div>
                )}
                <div>
                  <h3 className="font-heading text-2xl font-bold">{profile?.institute_name}</h3>
                  <p className="text-indigo-300/70 text-xs uppercase tracking-widest font-semibold">{profile?.institute_type}</p>
                </div>
              </div>
              <p className="text-slate-400 mb-8 max-w-md leading-relaxed">
                {profile?.tagline}
              </p>

              <div className="flex gap-3">
                {[
                  { name: "Facebook", href: profile?.facebook_url, path: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
                  { name: "Instagram", href: profile?.instagram_url, path: "M16 4H8a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4V8a4 4 0 00-4-4zm2 12a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2h8a2 2 0 012 2v8zm-6-7a3 3 0 100 6 3 3 0 000-6zm4.5-.5a1 1 0 100-2 1 1 0 000 2z" },
                  { name: "YouTube", href: profile?.youtube_url, path: "M19.615 3.184c-3.604-.246-11.631-.245-15.234 0C.488 3.45.029 5.804 0 12c.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.234 0C23.512 20.55 23.971 18.196 24 12c-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 4-8 4z" },
                ].map((social, i) => (
                  social.href && (
                    <a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/5 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all hover:-translate-y-1 hover:shadow-lg border border-white/5 hover:border-white/20"
                      aria-label={social.name}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d={social.path} />
                      </svg>
                    </a>
                  )
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-heading text-sm font-bold uppercase tracking-widest text-slate-300 mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { name: "Home", href: "#" },
                  { name: "Batches", href: "#batches" },
                  { name: "Results", href: "#results" },
                  { name: "Faculty", href: "#faculty" },
                  { name: "Fee Structure", href: "#fees" },
                  { name: "Gallery", href: "#gallery" },
                  { name: "Contact", href: "#contact" },
                ].map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-all" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-heading text-sm font-bold uppercase tracking-widest text-slate-300 mb-6">Contact Us</h4>
              <div className="space-y-4">
                {profile?.address && (
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-slate-400 text-sm leading-relaxed">{profile.address}</p>
                  </div>
                )}
                {profile?.phone && (
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-indigo-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <p className="text-slate-400 text-sm">{profile.phone}</p>
                  </div>
                )}
                {profile?.email && (
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-indigo-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <p className="text-slate-400 text-sm">{profile.email}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              &copy; {currentYear} {profile?.institute_name}. All rights reserved.
            </p>
            <p className="text-slate-500 text-sm">
              Powered by{" "}
              <a href="https://icoded.in" className="text-indigo-400 hover:text-indigo-300 transition-colors font-semibold">
                iCoded Automation
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
