'use client';

import { useState, useEffect } from "react";
import { useTab } from "@/lib/tab-context";

const tabs = [
  { label: "Home", id: "home" },
  { label: "Batches", id: "batches" },
  { label: "Results", id: "results" },
  { label: "Faculty", id: "faculty" },
  { label: "Fees", id: "fees" },
  { label: "Testimonials", id: "testimonials" },
  { label: "Gallery", id: "gallery" },
  { label: "Contact", id: "contact" },
];

export default function Navbar({ profile }: { profile: any; slug: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { activeTab, setActiveTab } = useTab();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-700 ${
        scrolled
          ? "premium-glass shadow-lg shadow-slate-900/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-3 shrink-0">
            {profile?.logo_url && (
              <div className="relative w-11 h-11 rounded-full overflow-hidden shadow-lg ring-2 ring-white/30">
                <img src={profile.logo_url} alt={profile.institute_name} className="w-full h-full object-cover" />
              </div>
            )}
            <div>
              <span className={`font-heading font-bold text-xl tracking-tight transition-colors ${
                scrolled ? "text-slate-900" : "text-white"
              }`}>
                {profile?.institute_name || "CoachPage"}
              </span>
              <p className={`text-[10px] font-semibold tracking-widest uppercase transition-colors ${
                scrolled ? "text-slate-400" : "text-white/60"
              }`}>
                {profile?.institute_type || "Coaching Institute"}
              </p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? scrolled
                      ? "bg-indigo-50 text-indigo-600 shadow-sm"
                      : "bg-white/15 text-white shadow-sm"
                    : scrolled
                      ? "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
            <a
              href="#enquire"
              className="ml-3 px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold rounded-xl hover:shadow-lg hover:shadow-amber-500/30 transition-all hover:-translate-y-0.5"
            >
              Enquire Now
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2.5 rounded-xl transition-all ${
              scrolled
                ? "text-slate-700 hover:bg-slate-100"
                : "text-white hover:bg-white/10"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <div className="lg:hidden premium-glass border-t border-slate-200/60 shadow-xl animate-fade-in">
          <div className="px-4 py-4">
            <div className="grid grid-cols-3 gap-2 mb-3">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setMobileOpen(false); }}
                  className={`px-2 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 text-center ${
                    activeTab === tab.id
                      ? "bg-indigo-50 text-indigo-600 shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <a
              href="#enquire"
              onClick={() => setMobileOpen(false)}
              className="block text-center px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-amber-500/20"
            >
              Enquire Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
