import React from 'react';

const DiscoverProjects = () => {
  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col">
      {/* TopNavBar */}
      <nav className="w-full top-0 bg-[#f9f9f9] flex justify-between items-center px-8 py-4 transition-opacity duration-200 active:opacity-70">
        <div className="text-xl font-bold text-[#1a1c1c] tracking-tight">
          Clinical Architect
        </div>
        <div className="flex items-center gap-4">
          <button className="material-symbols-outlined text-[#00606b] p-2 hover:bg-[#eeeeee] rounded-full transition-colors">
            help_outline
          </button>
        </div>
      </nav>

      {/* Main Content: Onboarding Step 3 */}
      <main className="flex-grow flex items-center justify-center p-6 md:p-12 lg:p-24">
        <div className="max-w-6xl w-full flex flex-col gap-10">
          {/* Header Section */}
          <div className="flex flex-col gap-2 border-l-4 border-primary-fixed pl-6">
            <span className="text-on-surface-variant font-label text-sm font-bold tracking-[0.05em] uppercase">Step 3 of 3</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface tracking-tighter">Discover Your First Project</h1>
            <p className="text-on-surface-variant text-lg max-w-2xl leading-relaxed">Select a technical framework to begin your architectural journey. These curated blueprints represent the pinnacle of high-precision clinical data systems.</p>
          </div>

          {/* Bento-style Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Project Card 1 */}
            <div className="group relative flex flex-col bg-surface-container-lowest ghost-border p-8 rounded-lg transition-all duration-300 hover:shadow-[0_12px_40px_-8px_rgba(0,31,36,0.08)]">
              <div className="absolute top-0 left-0 w-1 h-0 bg-primary group-hover:h-full transition-all duration-300"></div>
              <div className="flex justify-between items-start mb-12">
                <div className="w-12 h-12 bg-surface-container-low flex items-center justify-center rounded-full">
                  <span className="material-symbols-outlined text-primary">biotech</span>
                </div>
                <span className="text-[10px] font-bold tracking-widest text-on-surface-variant uppercase bg-surface-container px-2 py-1">v2.4.0</span>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-xl font-bold text-on-surface">Neural Diagnostics Hub</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-4">High-throughput synchronization for clinical EEG metadata and real-time visual mapping.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-[10px] font-bold px-2 py-1 bg-primary-fixed/20 text-primary uppercase">HL7-FHIR</span>
                  <span className="text-[10px] font-bold px-2 py-1 bg-primary-fixed/20 text-primary uppercase">WebSockets</span>
                </div>
              </div>
              <button className="mt-8 flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-surface-container-high text-on-surface font-bold text-sm hover:bg-primary hover:text-on-primary transition-all duration-200">
                Follow Project
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>

            {/* Project Card 2 (Featured - Tonal Shift) */}
            <div className="group relative flex flex-col bg-surface-container text-on-surface p-8 rounded-lg transition-all duration-300 border-2 border-primary-fixed/30">
              <div className="absolute -top-3 left-8 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Recommended</div>
              <div className="flex justify-between items-start mb-12">
                <div className="w-12 h-12 bg-primary flex items-center justify-center rounded-full">
                  <span className="material-symbols-outlined text-white" style={{fontVariationSettings: "'FILL' 1"}}>genetics</span>
                </div>
                <span className="text-[10px] font-bold tracking-widest text-primary uppercase">Active Build</span>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-xl font-bold">Genomic Pipeline Alpha</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-4">Architectural template for sequencing large-scale phenotypic data across distributed clinical clusters.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-[10px] font-bold px-2 py-1 bg-white/50 text-primary uppercase">Python</span>
                  <span className="text-[10px] font-bold px-2 py-1 bg-white/50 text-primary uppercase">Kubernetes</span>
                </div>
              </div>
              <button className="mt-8 flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-primary text-on-primary font-bold text-sm shadow-lg hover:opacity-90 transition-all duration-200">
                Explore Blueprint
                <span className="material-symbols-outlined text-sm">visibility</span>
              </button>
            </div>

            {/* Project Card 3 */}
            <div className="group relative flex flex-col bg-surface-container-lowest ghost-border p-8 rounded-lg transition-all duration-300 hover:shadow-[0_12px_40px_-8px_rgba(0,31,36,0.08)]">
              <div className="absolute top-0 left-0 w-1 h-0 bg-primary group-hover:h-full transition-all duration-300"></div>
              <div className="flex justify-between items-start mb-12">
                <div className="w-12 h-12 bg-surface-container-low flex items-center justify-center rounded-full">
                  <span className="material-symbols-outlined text-primary">monitor_heart</span>
                </div>
                <span className="text-[10px] font-bold tracking-widest text-on-surface-variant uppercase bg-surface-container px-2 py-1">Beta</span>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-xl font-bold text-on-surface">Cardio Analytics API</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-4">A unified endpoint for real-time telemetry from wearable medical devices and IoT telemetry.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-[10px] font-bold px-2 py-1 bg-primary-fixed/20 text-primary uppercase">REST</span>
                  <span className="text-[10px] font-bold px-2 py-1 bg-primary-fixed/20 text-primary uppercase">MQTT</span>
                </div>
              </div>
              <button className="mt-8 flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-surface-container-high text-on-surface font-bold text-sm hover:bg-primary hover:text-on-primary transition-all duration-200">
                Follow Project
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Footer Action */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-10 border-t border-outline-variant/10">
            <div className="flex items-center gap-4 mb-6 md:mb-0">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-primary-fixed-dim"></div>
                <div className="w-2 h-2 rounded-full bg-primary-fixed-dim"></div>
                <div className="w-10 h-2 rounded-full bg-primary"></div>
              </div>
              <span className="text-xs font-bold text-on-surface-variant tracking-widest uppercase">Almost there</span>
            </div>
            <div className="flex gap-4">
              <button className="px-8 py-4 text-on-surface-variant font-bold text-sm hover:text-primary transition-colors">
                Skip for now
              </button>
              <button className="px-10 py-4 bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-full font-bold text-sm shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all">
                Finish Tour
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* BottomNavBar (Mobile only) */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 bg-[#ffffff] flex justify-around items-center px-4 py-3 shadow-[0_-4px_20px_-2px_rgba(0,31,36,0.04)] border-t border-[#bdc8cb]/20">
        <a className="flex flex-col items-center justify-center bg-[#a2effd]/30 text-[#00606b] rounded-full px-6 py-1 transition-transform duration-150 scale-95" href="#">
          <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>start</span>
          <span className="font-['Plus_Jakarta_Sans'] text-[12px] uppercase tracking-wider font-bold">Welcome</span>
        </a>
        <a className="flex flex-col items-center justify-center text-[#3e494b] hover:text-[#00606b] transition-transform duration-150 scale-95" href="#">
          <span className="material-symbols-outlined">person_add</span>
          <span className="font-['Plus_Jakarta_Sans'] text-[12px] uppercase tracking-wider font-bold">Profile</span>
        </a>
        <a className="flex flex-col items-center justify-center text-[#3e494b] hover:text-[#00606b] transition-transform duration-150 scale-95" href="#">
          <span className="material-symbols-outlined">search</span>
          <span className="font-['Plus_Jakarta_Sans'] text-[12px] uppercase tracking-wider font-bold">Discover</span>
        </a>
      </nav>

      {/* Visual Decorative Element */}
      <div className="fixed top-1/2 -right-64 -z-10 opacity-10">
        <img 
          alt="abstract technical schematic" 
          className="w-[800px] h-auto rotate-12" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVbXnBfLTIvnoa3yh-b5yJMujLBO2N-WkNvuItUJdc_nOxTIHVD3eYci3kpsXqYVXtYlzVQhLt2TRR4SETKmMfGz9AlVxjg48bZJrlbHqpeoZsjVnFsISW0N--YJ47NIQx7KBE2y0h9Wl9mUJ5ZZhVXJzyeEH6TZJLyDEpX0Yg5t30Y9PmOmzmX9UDNDpjEQKJVik6nZcyWv6YBcABfVrjFMTb7vFm4XjhHizWR-LWoXycP0W1PCZCY7KCcENA-4Z6xlQSHx1jy5Q"
        />
      </div>
    </div>
  );
};

export default DiscoverProjects;
