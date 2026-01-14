
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

interface Message {
  role: 'user' | 'ai';
  text: string;
  isStreaming?: boolean;
}

const ChatWorkspace: React.FC<{ studioName: string }> = ({ studioName }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: `Welcome to ${studioName}. I am your neural creative assistant. How can we transform your imagination today?` }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const chat = ai.chats.create({
        model: 'gemini-3-pro-preview',
        config: {
          systemInstruction: `You are a world-class Artistic Director in the ${studioName} studio. Your goal is to help users develop professional-grade artistic prompts, explore visual metaphors, and refine creative concepts. Be visionary, concise, and technically knowledgeable about art history, styles, and modern AI tools. Always encourage the artist.`,
        }
      });

      const streamingMessage: Message = { role: 'ai', text: '', isStreaming: true };
      setMessages(prev => [...prev, streamingMessage]);

      const responseStream = await chat.sendMessageStream({ message: input });
      
      let fullText = '';
      for await (const chunk of responseStream) {
        const chunkText = (chunk as GenerateContentResponse).text || '';
        fullText += chunkText;
        setMessages(prev => {
          const newMessages = [...prev];
          const lastIdx = newMessages.length - 1;
          newMessages[lastIdx] = { role: 'ai', text: fullText, isStreaming: true };
          return newMessages;
        });
      }

      setMessages(prev => {
        const newMessages = [...prev];
        const lastIdx = newMessages.length - 1;
        newMessages[lastIdx] = { ...newMessages[lastIdx], isStreaming: false };
        return newMessages;
      });

    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'ai', text: "Forgive me, my neural circuits encountered an interference. Please re-state your vision." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex-grow flex flex-col h-[calc(100vh-4rem)] relative">
      {/* Visual background noise */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]"></div>
      
      <div ref={scrollRef} className="flex-grow overflow-y-auto p-8 space-y-8 scroll-smooth no-scrollbar">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
            <div className={`max-w-3xl ${msg.role === 'user' ? 'bg-indigo-600 rounded-3xl rounded-tr-none' : 'glass rounded-3xl rounded-tl-none'} p-6 shadow-2xl relative overflow-hidden`}>
              {msg.role === 'ai' && (
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-pink-500"></div>
              )}
              <div className="text-lg leading-relaxed whitespace-pre-wrap">
                {msg.text}
                {msg.isStreaming && <span className="inline-block w-2 h-5 bg-white ml-1 animate-pulse align-middle"></span>}
              </div>
              <div className="mt-4 text-[10px] font-bold uppercase tracking-widest opacity-40">
                {msg.role === 'user' ? 'Transmitted' : 'Synthesized'} • {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        {isTyping && messages[messages.length-1].role === 'user' && (
           <div className="flex justify-start animate-pulse">
              <div className="glass p-6 rounded-3xl rounded-tl-none flex space-x-2">
                 <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
                 <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                 <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
              </div>
           </div>
        )}
      </div>

      <div className="p-8 shrink-0 relative z-10">
        <div className="max-w-4xl mx-auto relative group">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Type your artistic intent here..."
            className="w-full bg-black/60 border border-white/10 rounded-[32px] p-6 pr-24 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none min-h-[80px] shadow-2xl backdrop-blur-xl"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="absolute right-4 bottom-4 w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center hover:bg-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed group-hover:scale-110 duration-300"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
        <p className="text-center text-[10px] text-gray-500 mt-4 uppercase tracking-[0.2em]">Press [Enter] to transmit to Neural Core</p>
      </div>
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default ChatWorkspace;
