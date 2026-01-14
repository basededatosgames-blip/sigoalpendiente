
import React from 'react';

const FeatureCard = ({ title, desc, icon }: { title: string, desc: string, icon: string }) => (
  <div className="glass p-8 rounded-3xl group hover:border-indigo-500/50 transition-all duration-500">
    <div className="w-14 h-14 bg-indigo-500/20 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-4">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{desc}</p>
  </div>
);

const Features: React.FC = () => {
  return (
    <section id="features" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Built for the <span className="text-indigo-400">Next Gen</span> Artist</h2>
          <p className="text-xl text-gray-500 max-w-xl">We provide the tools, you provide the vision. Our ecosystem is designed to amplify your creative workflow.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon="⚡" 
            title="Real-time Synthesis" 
            desc="Experience zero-latency feedback as our AI interprets your strokes and guides your composition in real-time."
          />
          <FeatureCard 
            icon="🧠" 
            title="Semantic Prompting" 
            desc="Move beyond keywords. Use natural language to describe complex feelings, atmospheres, and abstract concepts."
          />
          <FeatureCard 
            icon="🌐" 
            title="Global Art Net" 
            desc="Collaborate instantly with artists across the globe in persistent digital studios with shared AI context."
          />
          <FeatureCard 
            icon="🎭" 
            title="Style DNA" 
            desc="Train your own mini-models on your personal style to maintain consistency across entire collections."
          />
          <FeatureCard 
            icon="⛓️" 
            title="Chain of Thought" 
            desc="Track every iteration of your work. Our branching history allows you to revert or merge creative paths."
          />
          <FeatureCard 
            icon="💎" 
            title="NFT 2.0 Integration" 
            desc="One-click minting on sustainable chains with built-in attribution for both human and AI contributions."
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
