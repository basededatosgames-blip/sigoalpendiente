
import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ChatWorkspace from './components/ChatWorkspace';

const App: React.FC = () => {
  const [isAppStarted, setIsAppStarted] = useState(false);
  const [activeStudio, setActiveStudio] = useState('Nexus Prime');

  if (!isAppStarted) {
    return (
      <div className="min-h-screen bg-[#030014] overflow-hidden flex flex-col">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center relative px-6 text-center">
          {/* Background FX */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/20 rounded-full blur-[150px] animate-pulse"></div>
          
          <div className="relative z-10 max-w-4xl">
            <h1 className="text-7xl md:text-9xl font-black mb-8 leading-tight tracking-tighter">
              ART<span className="gradient-text">VOLUTION</span>
            </h1>
            <p className="text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
              Enter the world's most advanced neural workspace for digital visionaries.
            </p>
            <button 
              onClick={() => setIsAppStarted(true)}
              className="group relative px-12 py-6 bg-white text-black font-black text-2xl rounded-2xl hover:scale-105 transition-all duration-500 shadow-[0_0_50px_rgba(255,255,255,0.2)]"
            >
              <span className="relative z-10">INITIALIZE NEXUS</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl -z-0"></div>
            </button>
          </div>

          <div className="mt-20 grid grid-cols-3 gap-12 opacity-40">
            <div className="text-center">
              <div className="text-3xl font-bold">120+</div>
              <div className="text-xs uppercase tracking-widest text-gray-500">Neural Models</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">450ms</div>
              <div className="text-xs uppercase tracking-widest text-gray-500">Latency</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">8K</div>
              <div className="text-xs uppercase tracking-widest text-gray-500">Synthesis</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#030014] flex text-white overflow-hidden selection:bg-indigo-500/40">
      <Sidebar activeStudio={activeStudio} setActiveStudio={setActiveStudio} />
      <main className="flex-grow flex flex-col relative h-full">
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 glass shrink-0">
          <div className="flex items-center space-x-4">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <h2 className="font-bold text-sm tracking-widest uppercase text-gray-400">{activeStudio}</h2>
          </div>
          <div className="flex items-center space-x-6">
             <div className="text-xs font-mono text-indigo-400">GPU_STATUS: OPTIMAL</div>
             <button className="px-4 py-1.5 glass rounded-lg text-xs font-bold hover:bg-white/10 transition-colors">EXPORT_SESSION</button>
          </div>
        </header>
        
        <ChatWorkspace studioName={activeStudio} />
      </main>
    </div>
  );
};

export default App;
