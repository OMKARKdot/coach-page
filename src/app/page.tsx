"use client";

import Link from "next/link";
import { useState } from "react";
import { X, Building2, Monitor, Bot, Search, Share2, Globe, Smartphone, BarChart3, Phone } from "lucide-react";

export default function Home() {
  const [showNotice, setShowNotice] = useState(true);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-900 text-white p-10 text-center relative">
      {showNotice && (
        <>
          <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={() => setShowNotice(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div className="w-full max-w-2xl relative bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-amber-500/20 backdrop-blur-xl border border-white/30 rounded-2xl p-6 text-left pointer-events-auto animate-fade-in shadow-2xl" onClick={() => setShowNotice(false)}>
              <button
                onClick={(e) => { e.stopPropagation(); setShowNotice(false); }}
                className="absolute -top-2.5 -right-2.5 w-7 h-7 bg-amber-500 hover:bg-amber-600 rounded-full flex items-center justify-center transition-colors shadow-lg"
                aria-label="Close notice"
              >
                <X className="w-4 h-4 text-white" />
              </button>

              <div className="flex items-start gap-3">
                <div className="bg-white/10 rounded-xl p-2.5 shrink-0 mt-0.5">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-base mb-2">
                    <span className="text-amber-400">iCoded Automation Pvt. Ltd.</span> — Chh. Sambhaji Nagar
                  </p>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm text-blue-100">
                    <div className="flex items-center gap-2"><Monitor className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Web Development</div>
                    <div className="flex items-center gap-2"><Bot className="w-3.5 h-3.5 text-amber-400 shrink-0" /> AI &amp; Automation</div>
                    <div className="flex items-center gap-2"><Smartphone className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Mobile Apps</div>
                    <div className="flex items-center gap-2"><Globe className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Digital Marketing</div>
                    <div className="flex items-center gap-2"><Search className="w-3.5 h-3.5 text-amber-400 shrink-0" /> SEO &amp; Analytics</div>
                    <div className="flex items-center gap-2"><Share2 className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Social Media Mgmt</div>
                    <div className="flex items-center gap-2"><BarChart3 className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Brand Strategy</div>
                    <div className="flex items-center gap-2"><Bot className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Chatbots &amp; CRM</div>
                  </div>
                  <div className="flex items-center gap-2 mt-2.5 border-t border-white/10 pt-2 text-sm text-blue-100">
                    <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" /> <span className="font-medium">+91 93703 29233</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <h1 className="text-5xl font-black italic mb-6">CoachPage</h1>
      <p className="text-xl mb-12 max-w-lg">
        The complete SaaS platform for coaching institutes, private tuitions, and skill courses.
      </p>
      <div className="flex gap-4">
        <Link 
          href="/coach-admin" 
          className="bg-white text-blue-900 px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors"
        >
          Admin Login
        </Link>
        <Link 
          href="/coach/demo-institute" 
          className="border-2 border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white/10 transition-colors"
        >
          View Demo
        </Link>
      </div>
      <p className="mt-20 text-blue-300 text-sm">
        Built by iCoded Automation Pvt. Ltd., Chh. Sambhaji Nagar
      </p>
    </div>
  );
}
