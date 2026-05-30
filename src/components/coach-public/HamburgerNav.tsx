"use client";

import { useState } from "react";
import Link from "next/link";

interface Tab {
  label: string;
  slug: string;
}

export default function HamburgerNav({ tabs, slug }: { tabs: Tab[]; slug: string }) {
  const [open, setOpen] = useState(false);

  const handleNav = () => setOpen(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 right-4 z-[60] bg-white/90 backdrop-blur-md border border-gray-200 shadow-lg rounded-xl p-3 hover:bg-gray-50 transition-colors"
        aria-label="Toggle navigation"
      >
        <div className="w-5 h-4 flex flex-col justify-between">
          <span className={`block h-0.5 w-5 bg-gray-700 rounded transition-all ${open ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block h-0.5 w-5 bg-gray-700 rounded transition-all ${open ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-5 bg-gray-700 rounded transition-all ${open ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </div>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-[55]" onClick={handleNav} />
          <div className="fixed top-20 right-4 z-[60] bg-white/95 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-2xl p-3 min-w-[200px]">
            {tabs.map((tab) => (
              <Link
                key={tab.label}
                href={`/coach/${slug}${tab.slug ? `/${tab.slug}` : ""}`}
                onClick={handleNav}
                className="block px-4 py-3 rounded-xl text-gray-700 font-medium hover:bg-primary-50 hover:text-primary-700 transition-colors"
              >
                {tab.label}
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
}
