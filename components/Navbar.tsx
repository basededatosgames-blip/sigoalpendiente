
import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass py-4 shadow-2xl' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-pink-500 rounded-lg flex items-center justify-center font-bold text-xl">A</div>
          <span className="text-2xl font-bold tracking-tighter">ART<span className="text-indigo-400">VOLUTION</span></span>
        </div>
        
        <div className="hidden md:flex space-x-8 text-sm font-medium tracking-wide">
          <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
          <a href="#ai-demo" className="hover:text-indigo-400 transition-colors">AI Nexus</a>
          <a href="#community" className="hover:text-indigo-400 transition-colors">Community</a>
          <a href="#pricing" className="hover:text-indigo-400 transition-colors">Pricing</a>
        </div>

        <button className="px-6 py-2 rounded-full bg-white text-black font-bold text-sm hover:bg-indigo-500 hover:text-white transition-all duration-300">
          Join Beta
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
