
import React, { useState } from 'react';
import { optimizeArtPrompt } from '../services/geminiService';
import { PromptResult } from '../types';

const AiNexus: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PromptResult | null>(null);

  const handleOptimize = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const data = await optimizeArtPrompt(input);
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Something went wrong optimizing your prompt.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-demo" className="py-32 bg-[#05001a]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-6">Creative <span className="gradient-text">Nexus</span></h2>
          <p className="text-gray-400 text-lg">Test our prompt engine. Turn a simple idea into a professional artistic blueprint.</p>
        </div>

        <div className="glass rounded-[40px] p-8 md:p-12 shadow-inner border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <svg width="200" height="200" viewBox="0 0 100 100">
               <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5,5" />
            </svg>
          </div>

          <div className="flex flex-col space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-indigo-400 uppercase tracking-widest">Base Concept</label>
              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your idea (e.g., 'a cat in space')"
                className="w-full bg-black/40 border border-white/10 rounded-2xl p-6 text-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all min-h-[120px]"
              />
            </div>

            <button 
              onClick={handleOptimize}
              disabled={loading}
              className={`w-full py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center space-x-3 ${loading ? 'bg-indigo-900/50 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-500/20'}`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Synthesizing Vision...</span>
                </>
              ) : (
                <>
                  <span>Optimize for High-Fidelity</span>
                  <span>✨</span>
                </>
              )}
            </button>

            {result && (
              <div className="mt-8 p-8 bg-black/60 rounded-3xl border border-indigo-500/20 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-indigo-400 text-xs font-bold uppercase mb-2">Refined Prompt</h4>
                      <p className="text-lg leading-relaxed">{result.refinedPrompt}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {result.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300">#{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-6 border-l border-white/5 pl-8 hidden md:block">
                    <div>
                      <h4 className="text-gray-500 text-xs font-bold uppercase mb-1">Recommended Style</h4>
                      <p className="text-xl font-medium">{result.artisticStyle}</p>
                    </div>
                    <div>
                      <h4 className="text-gray-500 text-xs font-bold uppercase mb-1">Suggested Medium</h4>
                      <p className="text-xl font-medium">{result.suggestedMedium}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiNexus;
