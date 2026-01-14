
import React from 'react';

interface SidebarProps {
  activeStudio: string;
  setActiveStudio: (name: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeStudio, setActiveStudio }) => {
  const studios = [
    { id: 'nexus', name: 'Nexus Prime', icon: '◈', desc: 'Dirección Creativa General' },
    { id: 'vivid', name: 'Vivid Lab', icon: '◇', desc: 'Teoría del Color & Luz' },
    { id: 'blueprint', name: 'Blueprint', icon: '▣', desc: 'Estructura & Composición' },
    { id: 'void', name: 'Deep Void', icon: '▽', desc: 'Conceptualización Oscura' },
  ];

  return (
    <aside className="w-72 h-full bg-black/40 border-r border-white/5 flex flex-col shrink-0 relative z-20">
      <div className="p-8">
        <div className="flex items-center space-x-3 mb-16">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center font-black text-sm">A</div>
          <h1 className="text-lg font-bold tracking-tighter">ART<span className="text-indigo-500">VOLUTION</span></h1>
        </div>

        <nav className="space-y-4">
          <div className="text-[9px] font-mono text-gray-500 uppercase tracking-[0.3em] mb-4">Neural_Gateways</div>
          {studios.map(studio => (
            <button
              key={studio.id}
              onClick={() => setActiveStudio(studio.name)}
              className={`w-full text-left group transition-all duration-300 ${activeStudio === studio.name ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}
            >
              <div className="flex items-start space-x-4">
                <span className={`text-xl ${activeStudio === studio.name ? 'text-indigo-400' : ''}`}>{studio.icon}</span>
                <div>
                  <h4 className="text-sm font-bold tracking-wide">{studio.name}</h4>
                  <p className="text-[10px] text-gray-500 font-mono mt-1">{studio.desc}</p>
                </div>
              </div>
              {activeStudio === studio.name && (
                <div className="h-0.5 w-full bg-gradient-to-r from-indigo-500 to-transparent mt-4"></div>
              )}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 space-y-6">
        <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[9px] font-mono text-indigo-400">MEMORY_ALLOC</span>
            <span className="text-[9px] font-mono text-gray-500">72%</span>
          </div>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
             <div className="h-full bg-indigo-500 w-[72%]"></div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 p-2">
          <div className="w-10 h-10 rounded-full border border-indigo-500/30 p-0.5">
            <img src="https://api.dicebear.com/7.x/pixel-art/svg?seed=Artisan" className="rounded-full bg-indigo-950" alt="Avatar" />
          </div>
          <div>
            <div className="text-xs font-bold">ALPHA_USER_01</div>
            <div className="text-[9px] font-mono text-green-500">CONNECTED_CORE</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
