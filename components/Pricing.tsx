
import React from 'react';

const PricingCard = ({ title, price, features, highlighted = false }: { title: string, price: string, features: string[], highlighted?: boolean }) => (
  <div className={`p-10 rounded-[40px] flex flex-col transition-all duration-300 ${highlighted ? 'bg-indigo-600 scale-105 shadow-2xl z-10' : 'glass hover:border-white/20'}`}>
    <h3 className="text-2xl font-bold mb-2">{title}</h3>
    <div className="flex items-baseline mb-8">
      <span className="text-5xl font-black">${price}</span>
      <span className="text-sm opacity-60 ml-2">/mo</span>
    </div>
    <ul className="space-y-4 mb-12 flex-grow">
      {features.map((f, i) => (
        <li key={i} className="flex items-center space-x-3">
          <span className="text-green-400">✓</span>
          <span className="text-sm font-medium">{f}</span>
        </li>
      ))}
    </ul>
    <button className={`w-full py-4 rounded-2xl font-bold transition-all ${highlighted ? 'bg-white text-indigo-600 hover:bg-gray-100' : 'bg-white/10 text-white hover:bg-white/20'}`}>
      Choose Plan
    </button>
  </div>
);

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-black mb-4">Simple, Fair <span className="text-indigo-400">Tiers</span></h2>
          <p className="text-gray-400">No hidden fees. Scale your creativity as you grow.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <PricingCard 
            title="Artist"
            price="0"
            features={["100 AI Generations", "Standard Models", "Personal Gallery", "Community Access"]}
          />
          <PricingCard 
            title="Visionary"
            price="29"
            highlighted={true}
            features={["Unlimited Generations", "Custom Style Training", "4K Ultra-Export", "Early Model Access", "Collaboration Tools"]}
          />
          <PricingCard 
            title="Studio"
            price="99"
            features={["Team Accounts", "Private Hosting", "API Integration", "Dedicated Support", "Priority Queue"]}
          />
        </div>
      </div>
    </section>
  );
};

export default Pricing;
