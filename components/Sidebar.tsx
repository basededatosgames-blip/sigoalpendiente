
import React from 'react';

interface SidebarProps {
  activeStudio: string;
  setActiveStudio: (name: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeStudio, setActiveStudio }) => {
  const studios = [
    { name: 'Nexus Prime', icon: '🧠', desc: 'General Creative Direction' },
    { name: 'Vivid Lab', icon: '🌈', desc: 'Color & Lighting Theory' },
    { name: 'Blueprint', icon: '📐', desc: 'Composition & Layout' },
    { name: 'Dark Matter', icon: '🌑', desc: 'Atmospheric & Gothic' },
  ];

  return (
    <aside className="w-80 h-full border-r border-white/5 bg-black/40 flex flex-col shrink-0">
      <div className="p-8">
        <div className="flex items-center space-x-3 mb-12">
          <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-pink-500 rounded-xl flex items-center justify-center font-bold">A</div>
          <span className="text-xl font-bold tracking-tighter">ART<span className="text-indigo-500">VOLUTION</span></span>
        </div>

        <nav className="space-y-2">
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em] mb-4 px-2">Workspace Studios</p>
          {studios.map(studio => (
            <button
              key={studio.name}
              onClick={() => setActiveStudio(studio.name)}
              className={`w-full group p-4 rounded-2xl flex items-start space-x-4 transition-all duration-300 text-left ${activeStudio === studio.name ? 'glass border-indigo-500/30' : 'hover:bg-white/5'}`}
            >
              <span className="text-2xl">{studio.icon}</span>
              <div>
                <h4 className={`font-bold text-sm ${activeStudio === studio.name ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>{studio.name}</h4>
                <p className="text-[10px] text-gray-500 mt-1">{studio.desc}</p>
              </div>
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-8">
        <div className="glass p-6 rounded-2xl border-indigo-500/20">
          <div className="text-xs font-bold text-indigo-400 mb-2 uppercase tracking-widest">Neural Quota</div>
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-3">
             <div className="h-full bg-indigo-500 w-[65%]"></div>
          </div>
          <p className="text-[10px] text-gray-400">650 / 1000 credits remaining</p>
          <button className="w-full mt-4 py-2 bg-white text-black text-xs font-black rounded-lg hover:bg-gray-200 transition-colors">UPGRADE_CORE</button>
        </div>
        
        <div className="mt-8 flex items-center space-x-3 px-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-b from-gray-700 to-gray-900 border border-white/10"></div>
          <div>
            <div className="text-sm font-bold">CyberArtisan_X</div>
            <div className="text-[10px] text-green-500 uppercase font-mono">Verified Voyager</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
