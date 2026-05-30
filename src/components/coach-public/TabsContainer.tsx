"use client";

import { useState, type ReactNode } from "react";
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

interface TabsContainerProps {
  home: ReactNode;
  batches: ReactNode;
  results: ReactNode;
  faculty: ReactNode;
  fees: ReactNode;
  testimonials: ReactNode;
  gallery: ReactNode;
  contact: ReactNode;
}

export default function TabsContainer({
  home,
  batches,
  results,
  faculty,
  fees,
  testimonials,
  gallery,
  contact,
}: TabsContainerProps) {
  const { activeTab, setActiveTab } = useTab();
  const [open, setOpen] = useState(false);

  const sections: Record<string, ReactNode> = {
    home, batches, results, faculty, fees, testimonials, gallery, contact,
  };

  const handleSelect = (id: string) => {
    setActiveTab(id);
    setOpen(false);
  };

  return (
    <div>
      <div className="lg:hidden">
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setOpen(!open)}
            className={`flex items-center justify-center w-14 h-14 rounded-2xl shadow-2xl transition-all duration-300 ${
              open
                ? "bg-slate-900 rotate-90 shadow-slate-900/30"
                : "bg-gradient-to-r from-indigo-500 to-purple-600 shadow-indigo-500/30"
            }`}
            aria-label="Toggle tabs"
          >
            {open ? (
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {open && (
          <>
            <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <div className="fixed bottom-24 right-6 z-50 min-w-[220px] animate-scale-in origin-bottom-right">
              <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/80 p-3">
                <div className="grid grid-cols-3 gap-1.5">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => handleSelect(tab.id)}
                      className={`px-3 py-3 rounded-xl text-xs font-semibold transition-all duration-200 ${
                        activeTab === tab.id
                          ? "bg-indigo-50 text-indigo-600 shadow-sm ring-1 ring-indigo-200"
                          : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div>
        {sections[activeTab]}
      </div>
    </div>
  );
}
