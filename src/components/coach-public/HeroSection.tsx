"use client";

import { useTab } from "@/lib/tab-context";

function Star({ size, top, left, delay, duration }: { size: string; top: string; left: string; delay: string; duration: string }) {
  return (
    <div
      className="absolute rounded-full bg-white animate-pulse"
      style={{
        width: size,
        height: size,
        top,
        left,
        animationDelay: delay,
        animationDuration: duration,
        boxShadow: `0 0 ${parseInt(size) * 2}px ${size} rgba(255,255,255,0.3)`,
      }}
    />
  );
}

function ShootingStar({ top, left, delay }: { top: string; left: string; delay: string }) {
  return (
    <div
      className="absolute w-1 h-1 bg-white rounded-full"
      style={{
        top,
        left,
        animationDelay: delay,
        animation: `shootingStar 3s linear ${delay} infinite`,
        boxShadow: "0 0 6px 2px rgba(255,255,255,0.6)",
      }}
    >
      <div
        className="absolute w-16 h-[1px] bg-gradient-to-l from-transparent to-white/80"
        style={{ transform: "rotate(-45deg) translateX(-100%)", transformOrigin: "right center", top: 0, right: 0 }}
      />
    </div>
  );
}

export default function HeroSection({ profile }: { profile: any }) {
  const { setActiveTab } = useTab();

  const handleViewBatches = () => {
    setActiveTab("batches");
    setTimeout(() => {
      document.getElementById("batches")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1920&q=100"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/50" />
      </div>

      <Star size="4px" top="15%" left="10%" delay="0s" duration="3s" />
      <Star size="3px" top="25%" left="85%" delay="0.5s" duration="2.5s" />
      <Star size="5px" top="40%" left="5%" delay="1s" duration="4s" />
      <Star size="3px" top="55%" left="92%" delay="0.2s" duration="3.5s" />
      <Star size="4px" top="70%" left="8%" delay="1.5s" duration="2.8s" />
      <Star size="2px" top="20%" left="50%" delay="0.8s" duration="2s" />
      <Star size="5px" top="80%" left="80%" delay="2s" duration="4s" />
      <Star size="3px" top="60%" left="15%" delay="0.3s" duration="3s" />
      <Star size="4px" top="35%" left="75%" delay="1.2s" duration="2.5s" />
      <Star size="2px" top="88%" left="40%" delay="0.7s" duration="3.2s" />

      <ShootingStar top="18%" left="60%" delay="0s" />
      <ShootingStar top="30%" left="20%" delay="4s" />
      <ShootingStar top="50%" left="70%" delay="8s" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-indigo-50/90 backdrop-blur-xl rounded-full border border-indigo-100 mb-8 animate-fade-in shadow-lg shadow-indigo-500/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-sm font-semibold text-indigo-700 tracking-wide">Admissions Open for 2026-27</span>
          </div>

          <div className="relative inline-block">
            <div className="absolute -inset-2 bg-gradient-to-r from-yellow-500/20 via-white/30 to-yellow-500/20 rounded-3xl blur-3xl" />
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/10 via-white/20 to-yellow-400/10 rounded-2xl blur-2xl animate-pulse" style={{ animationDuration: "4s" }} />
            <h1 className="relative font-heading text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-[0.95] tracking-tight animate-slide-up text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-white to-yellow-200">
              {profile?.institute_name}
            </h1>
          </div>

          <p className="text-xl md:text-2xl mb-12 text-white/80 font-medium leading-relaxed max-w-3xl animate-slide-up" style={{ animationDelay: "0.15s" }}>
            {profile?.tagline}
          </p>

          <div className="flex flex-wrap gap-4 mb-20 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <a
              href="#enquire"
              className="group relative overflow-hidden inline-flex items-center gap-3 px-9 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold rounded-2xl shadow-2xl shadow-yellow-500/30 hover:shadow-yellow-500/50 transition-all duration-500 hover:-translate-y-1"
            >
              <span className="relative z-10">Enquire Now</span>
              <svg className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m0 0H3" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </a>
            <button
              onClick={handleViewBatches}
              className="inline-flex items-center gap-2 px-9 py-4 border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white/10 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-white/50"
            >
              View Batches
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-white/20 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            {[
              { value: `${profile?.total_students_trained || "2400"}+`, label: "Students Trained" },
              { value: "89%", label: "Selection Rate" },
              { value: `${profile?.established_year || "2012"}`, label: "Established" },
              { value: "50+", label: "Faculty Members" },
            ].map((stat, i) => (
              <div key={i} className="group">
                <p className="font-heading text-3xl md:text-4xl font-black text-white">{stat.value}</p>
                <p className="text-white/60 text-sm font-semibold mt-1 tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2 animate-bounce">
          <div className="w-1 h-3 bg-white/40 rounded-full" />
        </div>
      </div>

      <style>{`
        @keyframes shootingStar {
          0% { transform: translate(0, 0) rotate(-45deg); opacity: 1; }
          70% { opacity: 1; }
          100% { transform: translate(-300px, 300px) rotate(-45deg); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
