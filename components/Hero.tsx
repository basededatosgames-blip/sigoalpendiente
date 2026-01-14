
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background Elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-pink-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="inline-block px-4 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6 animate-fade-in">
          The Future of Digital Expression
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight">
          Where <span className="gradient-text">Human Soul</span> <br /> 
          Meets <span className="italic font-serif">Machine Intellect</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          The ultimate workspace for AI artists. Collaborate with the world's most advanced creative models and connect with a global network of visionaries.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <button className="w-full sm:w-auto px-10 py-4 bg-indigo-600 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-[0_0_30px_rgba(79,70,229,0.3)] glow-hover">
            Get Started Free
          </button>
          <button className="w-full sm:w-auto px-10 py-4 glass rounded-xl font-bold text-lg hover:bg-white/10 transition-all">
            Watch Showreel
          </button>
        </div>

        {/* Floating preview elements */}
        <div className="mt-24 relative hidden lg:block">
          <div className="flex justify-center space-x-6">
             <img src="https://picsum.photos/seed/art1/300/400" className="w-48 h-64 object-cover rounded-2xl transform -rotate-6 animate-float shadow-2xl border border-white/10" alt="Art 1" />
             <img src="https://picsum.photos/seed/art2/300/400" className="w-56 h-72 object-cover rounded-2xl transform rotate-3 -translate-y-12 shadow-2xl border border-white/20" alt="Art 2" />
             <img src="https://picsum.photos/seed/art3/300/400" className="w-48 h-64 object-cover rounded-2xl transform rotate-12 animate-float shadow-2xl border border-white/10" style={{ animationDelay: '1s' }} alt="Art 3" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
