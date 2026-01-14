
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatWorkspace from './components/ChatWorkspace';

const App: React.FC = () => {
  const [bootStatus, setBootStatus] = useState<'idle' | 'loading' | 'ready'>('idle');
  const [loadProgress, setLoadProgress] = useState(0);
  const [activeStudio, setActiveStudio] = useState('Nexus Prime');

  const startBoot = () => {
    setBootStatus('loading');
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => setBootStatus('ready'), 500);
      }
      setLoadProgress(Math.floor(progress));
    }, 150);
  };

  if (bootStatus !== 'ready') {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center p-6 bg-[#030014] relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-600/10 blur-[120px] rounded-full"></div>
        </div>

        <div className="relative z-10 text-center max-w-2xl">
          <div className="mb-4 inline-block px-3 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-mono text-indigo-400 tracking-[0.3em]">
            SYSTEM_VERSION: 2.0.4_BETA
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6">
            ART<span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">VOLUTION</span>
          </h1>
          
          {bootStatus === 'idle' ? (
            <>
              <p className="text-gray-400 text-lg mb-12 font-light tracking-wide">
                Bienvenido al nexo creativo definitivo. <br/>Interconecta tu mente con inteligencia artificial de vanguardia.
              </p>
              <button 
                onClick={startBoot}
                className="px-12 py-5 bg-white text-black font-black text-xl rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(255,255,255,0.15)]"
              >
                INICIALIZAR NEXO
              </button>
            </>
          ) : (
            <div className="w-64 mx-auto space-y-4">
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 transition-all duration-300" style={{ width: `${loadProgress}%` }}></div>
              </div>
              <div className="flex justify-between font-mono text-[10px] text-gray-500">
                <span>LOADING_CORE_MODULES...</span>
                <span>{loadProgress}%</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-[#030014] flex overflow-hidden animate-fade-in">
      <Sidebar activeStudio={activeStudio} setActiveStudio={setActiveStudio} />
      
      <main className="flex-grow flex flex-col relative h-full">
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-black/20 backdrop-blur-xl shrink-0">
          <div className="flex items-center space-x-4">
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
            <h2 className="font-mono text-xs font-bold uppercase text-gray-400 tracking-widest">
              NEXUS_LINK // {activeStudio}
            </h2>
          </div>
          <div className="hidden md:flex items-center space-x-6">
             <div className="flex items-center space-x-2 text-[10px] font-mono text-indigo-400">
                <span className="w-2 h-2 rounded-full border border-indigo-400"></span>
                <span>SYNC_STABLE</span>
             </div>
             <button className="px-4 py-1.5 border border-white/10 rounded-lg text-[10px] font-bold hover:bg-white/5 transition-all">TERMINATE_SESSION</button>
          </div>
        </header>
        
        <ChatWorkspace studioName={activeStudio} />
      </main>

      <style>{`
        .animate-fade-in { animation: fadeIn 0.8s ease-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
};

export default App;
