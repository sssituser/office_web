import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useOnboardingFlow from '../hooks/useOnboardingFlow';

const WorkspaceSync = () => {
  const navigate = useNavigate();
  const { completeOnboarding } = useOnboardingFlow();
  const [cliKey] = useState('df_auth_9872_x2_key_v1');
  const [copied, setCopied] = useState(false);

  const handleCopyCliKey = async () => {
    try {
      await navigator.clipboard.writeText(cliKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const handleBack = () => {
    navigate('/profile-setup');
  };

  const handleCompleteOnboarding = () => {
    completeOnboarding();
    navigate('/home');
  };

  const handleConnectGithub = () => {
    // Implement GitHub OAuth integration
    console.log('Connecting to GitHub...');
  };

  const handleGetExtension = () => {
    // Open VS Code marketplace or download extension
    window.open('https://marketplace.visualstudio.com/items?itemName=devforge.toolkit', '_blank');
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col font-['Plus_Jakarta_Sans'] antialiased tracking-tight">
      {/* SideNavBar */}
      <aside className="fixed left-0 top-0 h-full flex flex-col py-10 px-8 h-screen w-72 flex-shrink-0 bg-[#f3f4f4] dark:bg-slate-900">
        <div className="mb-12">
          <h1 className="text-lg font-bold tracking-tighter text-[#1a1c1c] dark:text-[#f9f9f9]">DevHub Onboarding</h1>
          <p className="text-xs text-on-surface-variant/70 mt-1 uppercase tracking-widest font-semibold">Technical Architect Mode</p>
        </div>

        <nav className="flex-1 space-y-1">
          {/* Environment Setup */}
          <div className="flex items-center gap-4 py-3 px-4 rounded-lg cursor-pointer transition-colors duration-200 text-[#3e494b] dark:text-slate-400 font-medium hover:text-[#1a1c1c] dark:hover:text-slate-200 hover:bg-[#eeeeee] dark:hover:bg-slate-800">
            <span className="material-symbols-outlined text-xl">settings_input_component</span>
            <span className="text-sm">Environment Setup</span>
          </div>

          {/* API Configuration */}
          <div className="flex items-center gap-4 py-3 px-4 rounded-lg cursor-pointer transition-colors duration-200 text-[#3e494b] dark:text-slate-400 font-medium hover:text-[#1a1c1c] dark:hover:text-slate-200 hover:bg-[#eeeeee] dark:hover:bg-slate-800">
            <span className="material-symbols-outlined text-xl">api</span>
            <span className="text-sm">API Configuration</span>
          </div>

          {/* Authentication (ACTIVE) */}
          <div className="flex items-center gap-4 py-3 px-4 rounded-lg cursor-pointer transition-colors duration-200 text-[#00606b] dark:text-[#a2effd] font-semibold border-r-2 border-[#00606b] dark:border-[#a2effd] pr-4 bg-[#eeeeee] dark:bg-slate-800 active:scale-[0.99]">
            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
            <span className="text-sm">Authentication</span>
          </div>

          {/* Webhook Integration */}
          <div className="flex items-center gap-4 py-3 px-4 rounded-lg cursor-pointer transition-colors duration-200 text-[#3e494b] dark:text-slate-400 font-medium hover:text-[#1a1c1c] dark:hover:text-slate-200 hover:bg-[#eeeeee] dark:hover:bg-slate-800">
            <span className="material-symbols-outlined text-xl">webhook</span>
            <span className="text-sm">Webhook Integration</span>
          </div>

          {/* Final Review */}
          <div className="flex items-center gap-4 py-3 px-4 rounded-lg cursor-pointer transition-colors duration-200 text-[#3e494b] dark:text-slate-400 font-medium hover:text-[#1a1c1c] dark:hover:text-slate-200 hover:bg-[#eeeeee] dark:hover:bg-slate-800">
            <span className="material-symbols-outlined text-xl">verified</span>
            <span className="text-sm">Final Review</span>
          </div>
        </nav>

        <div className="mt-auto pt-10">
          <div className="flex items-center gap-3 mb-6 p-3 rounded-xl bg-surface-container-lowest ghost-border">
            <img
              alt="Developer Profile"
              className="w-10 h-10 rounded-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUlg_QfGt7kSRd_hnGG-GMT79GBFTwRnGa4z2uSEMH6QuvTnaDs8KJthBMPKjKIpwnUEPTIoqZlBEPXuxywiKOXRjvGQGccaNcy9zSNf6MT16bUOjuShIG7ZWlrxlZ7xVzrA1nK6dGGSzifDdyM6jEPyT_Ag8QQPOF_01aQBD8MUuWVcDeyxkue6FD4vyDuH_L1G00lDiW9KE9u3s_cNriaydBZ3XWlpHOgKuXnb8MSTq-MN1DMIYlCx6-MfMGIzDrBJozOzm_Oeg"
            />
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-on-surface truncate">Alex Chen</p>
              <p className="text-xs text-on-surface-variant truncate">Technical Lead</p>
            </div>
          </div>
          <button className="w-full py-3 px-4 rounded-full bg-primary text-on-primary text-sm font-semibold hover:bg-primary-container transition-all active:scale-95 flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-lg">contact_support</span>
            Request Support
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="ml-72 min-h-screen flex flex-col">
        {/* TopNavBar */}
        <header className="flex items-center justify-between w-full px-10 h-16 bg-[#f9f9f9] dark:bg-slate-950 font-['Plus_Jakarta_Sans'] text-sm tracking-wide">
          <div className="flex items-center gap-8">
            <div className="text-xl font-extrabold tracking-[-0.02em] text-[#1a1c1c] dark:text-[#f9f9f9]">DevHub</div>
            <nav className="hidden md:flex items-center gap-6">
              <a className="text-[#3e494b] dark:text-slate-400 hover:text-[#00606b] transition-opacity font-bold" href="#">Documentation</a>
              <a className="text-[#3e494b] dark:text-slate-400 hover:text-[#00606b] transition-opacity" href="#">Changelog</a>
              <a className="text-[#3e494b] dark:text-slate-400 hover:text-[#00606b] transition-opacity" href="#">Status</a>
            </nav>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative hidden lg:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">search</span>
              <input
                className="bg-surface-container-low border-none rounded-full py-1.5 pl-10 pr-4 w-64 text-xs focus:ring-2 focus:ring-primary-fixed"
                placeholder="Search documentation..."
                type="text"
              />
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary transition-colors">help_outline</span>
              <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary transition-colors">notifications</span>
            </div>
          </div>
        </header>

        {/* Canvas */}
        <div className="flex-1 px-10 py-12 max-w-6xl mx-auto w-full">
          {/* Header Section */}
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-primary-fixed text-on-primary-fixed-variant text-[10px] font-bold rounded-full uppercase tracking-tighter">Step 3 of 3</span>
              <div className="h-[2px] w-12 bg-primary-fixed"></div>
              <span className="text-[10px] font-bold text-on-surface-variant/50 uppercase tracking-tighter">Onboarding Terminal</span>
            </div>
            <h1 className="text-5xl font-extrabold text-on-surface tracking-[-0.03em] mb-4">Sync Your Workspace</h1>
            <p className="text-lg text-on-surface-variant max-w-2xl leading-relaxed">Connect your local environment and external accounts to finalize your integration into the DEVFORGE ecosystem.</p>
          </section>

          {/* Sync Options Grid */}
          <div className="grid grid-cols-12 gap-6 mb-16">
            {/* GitHub Integration - Large Featured Card */}
            <div className="col-span-12 md:col-span-8 bg-surface-container-lowest rounded-xl p-8 ghost-border group hover:bg-white transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <span className="material-symbols-outlined text-9xl">terminal</span>
              </div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-surface-container-low rounded-lg flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-primary text-3xl">hub</span>
                </div>
                <h3 className="text-2xl font-bold text-on-surface mb-2">GitHub Integration</h3>
                <p className="text-on-surface-variant mb-8 max-w-sm">Sync repositories, issues, and contributions directly to your architecture workspace.</p>
                <button
                  onClick={handleConnectGithub}
                  className="px-8 py-3 bg-on-surface text-surface rounded-full text-sm font-bold flex items-center gap-3 hover:bg-primary transition-colors active:scale-95"
                >
                  Connect Account
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </button>
              </div>
            </div>

            {/* Technical Metrics Sidebar / Status */}
            <div className="col-span-12 md:col-span-4 bg-surface-container-low rounded-xl p-6 flex flex-col justify-between">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant mb-6">Connection Latency</p>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-extrabold text-primary tracking-tighter">14</span>
                  <span className="text-xs font-bold text-on-surface-variant uppercase">ms</span>
                </div>
                <div className="h-1 w-full bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-2/3"></div>
                </div>
              </div>
              <div className="mt-8">
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant mb-2">Protocol</p>
                <p className="text-sm font-mono text-primary-container font-semibold">AES-256-GCM / TLS 1.3</p>
              </div>
            </div>

            {/* VS Code Extension */}
            <div className="col-span-12 md:col-span-6 bg-surface-container-lowest rounded-xl p-8 ghost-border group hover:shadow-xl transition-all duration-500">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-secondary-container/30 rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-2xl">extension</span>
                </div>
                <span className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest">v1.2.4</span>
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-2">VS Code Extension</h3>
              <p className="text-sm text-on-surface-variant mb-6">Install the DEVFORGE toolkit for real-time architectural feedback and linting within your IDE.</p>
              <button
                onClick={handleGetExtension}
                className="text-primary font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all"
              >
                Get Extension
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </button>
            </div>

            {/* CLI Tool */}
            <div className="col-span-12 md:col-span-6 bg-surface-container-lowest rounded-xl p-8 ghost-border group hover:shadow-xl transition-all duration-500">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-secondary-container/30 rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-2xl">developer_mode</span>
                </div>
                <span className="text-[10px] font-bold text-primary-container uppercase tracking-widest bg-primary-fixed px-2 py-0.5 rounded">Security Recommended</span>
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-2">CLI Tool</h3>
              <p className="text-sm text-on-surface-variant mb-6">Authorize your local machine via our secure command-line interface for direct deployment pipes.</p>
              <div className="flex items-center gap-2 p-2 bg-surface-container-low rounded-lg">
                <code className="text-xs font-mono text-on-surface-variant flex-1 truncate px-2">{cliKey}</code>
                <button
                  onClick={handleCopyCliKey}
                  className="bg-surface-container-lowest p-2 rounded-md hover:bg-primary-fixed transition-colors flex items-center justify-center"
                  title={copied ? "Copied!" : "Copy to clipboard"}
                >
                  <span className="material-symbols-outlined text-sm">
                    {copied ? 'check' : 'content_copy'}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <footer className="flex items-center justify-between pt-10 border-t border-outline-variant/10">
            <button
              onClick={handleBack}
              className="px-6 py-3 text-on-surface-variant font-bold text-sm hover:text-on-surface transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">chevron_left</span>
              Go Back
            </button>
            <div className="flex items-center gap-4">
              <p className="text-xs text-on-surface-variant/60 font-medium italic hidden sm:block">Configuration saved automatically</p>
              <button
                onClick={handleCompleteOnboarding}
                className="px-10 py-4 bg-primary text-on-primary rounded-full text-sm font-extrabold shadow-lg hover:shadow-primary/20 hover:bg-primary-container transition-all active:scale-95"
              >
                Complete Onboarding
              </button>
            </div>
          </footer>
        </div>
      </main>

      {/* Visual Accent Elements */}
      <div className="fixed top-0 right-0 w-1 h-32 bg-primary-fixed opacity-50 z-50"></div>
      <div className="fixed bottom-0 right-0 p-10 pointer-events-none opacity-5">
        <span className="material-symbols-outlined text-[10rem] rotate-12">architecture</span>
      </div>
    </div>
  );
};

export default WorkspaceSync;
