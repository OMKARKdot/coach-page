'use client';

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar({ profile, slug }: { profile: any; slug: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#" },
    { name: "Batches", href: "#batches" },
    { name: "Results", href: "#results" },
    { name: "Faculty", href: "#faculty" },
    { name: "Fees", href: "#fees" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className={`fixed top-0 z-50 w-full transition-all duration-500 ${scrolled ? "bg-white/95 backdrop-blur-xl shadow-lg shadow-slate-200/50" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center gap-3">
            {profile?.logo_url && (
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-md">
                <img src={profile.logo_url} alt={profile.institute_name} className="w-full h-full object-cover" />
              </div>
            )}
            <div>
              <span className={`font-heading font-bold text-xl transition-colors ${scrolled ? "text-slate-900" : "text-white"}`}>
                {profile?.institute_name || "CoachPage"}
              </span>
              <p className={`text-[10px] font-medium tracking-wider uppercase transition-colors ${scrolled ? "text-slate-500" : "text-white/70"}`}>
                {profile?.institute_type || "Coaching Institute"}
              </p>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all hover:bg-white/10 ${scrolled ? "text-slate-700 hover:text-blue-600 hover:bg-blue-50" : "text-white/90 hover:text-white"}`}
              >
                {item.name}
              </Link>
            ))}
            <a
              href="#enquire"
              className="ml-4 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-all hover:shadow-lg hover:shadow-blue-600/25 hover:-translate-y-0.5"
            >
              Enquire Now
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled ? "text-slate-700" : "text-white"}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t shadow-xl">
          <div className="px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <a
              href="#enquire"
              onClick={() => setMobileOpen(false)}
              className="block text-center mt-4 px-6 py-3 bg-blue-600 text-white text-sm font-bold rounded-xl"
            >
              Enquire Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
