
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

interface Message {
  role: 'user' | 'ai';
  text: string;
  timestamp: string;
}

const ChatWorkspace: React.FC<{ studioName: string }> = ({ studioName }) => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'ai', 
      text: `Canal establecido. Studio: ${studioName}. Soy tu copiloto creativo. ¿Qué visión vamos a materializar hoy?`,
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isStreaming]);

  const handleSend = async () => {
    if (!input.trim() || isStreaming) return;

    const userText = input;
    const time = new Date().toLocaleTimeString();
    setMessages(prev => [...prev, { role: 'user', text: userText, timestamp: time }]);
    setInput('');
    setIsStreaming(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const chat = ai.chats.create({
        model: 'gemini-3-pro-preview',
        config: {
          systemInstruction: `Actúa como un Director de Arte Cibernético en el estudio ${studioName}. Tu tono es profesional, futurista e inspirador. Ayuda al usuario a refinar prompts de IA, técnicas de dibujo y conceptos estéticos. Sé conciso pero profundo.`,
        }
      });

      const result = await chat.sendMessageStream({ message: userText });
      
      let aiText = '';
      setMessages(prev => [...prev, { role: 'ai', text: '', timestamp: new Date().toLocaleTimeString() }]);

      for await (const chunk of result) {
        const chunkText = (chunk as GenerateContentResponse).text || '';
        aiText += chunkText;
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1].text = aiText;
          return updated;
        });
      }
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'ai', text: "ERROR_CATASTROPHIC: Se perdió la conexión con el núcleo neural.", timestamp: new Date().toLocaleTimeString() }]);
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <div className="flex-grow flex flex-col h-full bg-[#030014] relative">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

      <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 md:p-12 space-y-10 relative">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
            <div className={`max-w-[85%] md:max-w-2xl group`}>
              <div className="flex items-center space-x-3 mb-2 px-1">
                <span className={`text-[9px] font-mono tracking-widest uppercase ${msg.role === 'user' ? 'text-indigo-400' : 'text-pink-500'}`}>
                  {msg.role === 'user' ? 'VOYAGER_INPUT' : 'NEURAL_OUTPUT'}
                </span>
                <span className="text-[9px] font-mono text-gray-600">{msg.timestamp}</span>
              </div>
              <div className={`p-6 rounded-2xl text-lg font-light leading-relaxed shadow-2xl transition-all duration-500
                ${msg.role === 'user' 
                  ? 'bg-indigo-600/10 border border-indigo-500/30 text-white rounded-tr-none' 
                  : 'bg-white/[0.03] border border-white/5 text-gray-200 rounded-tl-none backdrop-blur-md hover:bg-white/[0.05]'
                }`}>
                {msg.text}
                {isStreaming && i === messages.length - 1 && (
                  <span className="inline-block w-1.5 h-5 bg-indigo-500 ml-1 animate-pulse align-middle"></span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 border-t border-white/5 bg-black/20 backdrop-blur-2xl">
        <div className="max-w-4xl mx-auto relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Introduce tu intención creativa..."
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-5 pr-16 text-white focus:outline-none focus:border-indigo-500 transition-all resize-none h-20 shadow-inner placeholder:text-gray-600"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isStreaming}
            className="absolute right-4 bottom-4 p-3 bg-indigo-600 rounded-xl hover:bg-indigo-500 disabled:opacity-30 disabled:grayscale transition-all shadow-lg shadow-indigo-500/20"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
        <p className="text-center text-[9px] text-gray-500 mt-4 font-mono uppercase tracking-[0.3em]">
          Safe Mode Active // Ready for Neural Transmission
        </p>
      </div>
    </div>
  );
};

export default ChatWorkspace;
