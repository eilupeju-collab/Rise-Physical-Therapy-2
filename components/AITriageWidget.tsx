import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Cpu, Loader2, Sparkles } from 'lucide-react';
import { createTriageChat, sendMessageToGemini } from '../services/geminiService';
import { Chat } from '@google/genai';
import { Message } from '../types';

const AITriageWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Chat Session only once
  useEffect(() => {
    if (!chatSession && isOpen) {
        const session = createTriageChat();
        setChatSession(session);
        // Initial greeting handled by user interacting or could be auto-triggered
        // Let's auto-trigger a welcome greeting in the UI state without API call to save latency,
        // or call the API. Let's call the API to stay true to the "Agent" persona.
        const initChat = async () => {
            setIsLoading(true);
            try {
                // Send a hidden system prompt to kickstart the persona greeting
                const iterator = await sendMessageToGemini(session, "Hello! I am a new potential patient.");
                let fullResponse = "";
                for await (const chunk of iterator) {
                    fullResponse += chunk;
                    // Note: In a real streaming set up we would update state per chunk
                    // For simplicity in the initial greeting, we wait for full response or update rapidly.
                }
                setMessages([{ role: 'model', text: fullResponse }]);
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };
        initChat();
    }
  }, [isOpen, chatSession]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !chatSession) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
        const iterator = await sendMessageToGemini(chatSession, userMsg);
        
        let modelMsg = "";
        setMessages(prev => [...prev, { role: 'model', text: "" }]); // Placeholder

        for await (const chunk of iterator) {
            modelMsg += chunk;
            setMessages(prev => {
                const newArr = [...prev];
                newArr[newArr.length - 1] = { role: 'model', text: modelMsg };
                return newArr;
            });
        }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm having trouble connecting to the network. Please try again or call our front desk." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
        {/* Toggle Button */}
        {!isOpen && (
             <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-rise-lime to-rise-red rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                <button 
                    onClick={() => setIsOpen(true)}
                    aria-label="Try HAL"
                    className="relative flex items-center justify-center w-16 h-16 bg-rise-charcoal rounded-full border border-white/20 shadow-2xl hover:scale-105 transition-transform duration-300"
                >
                    <div className="absolute -top-2 -right-2 bg-rise-red text-white text-[10px] font-bold px-2 py-1 rounded-full animate-bounce">
                        TRY HAL 🤖
                    </div>
                    <Cpu className="w-8 h-8 text-rise-lime" />
                </button>
            </div>
        )}

        {/* Chat Interface */}
        {isOpen && (
            <div className="glass-panel w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] rounded-2xl flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
                {/* Header */}
                <div className="bg-rise-red/90 p-4 flex justify-between items-center border-b border-white/10 backdrop-blur-md">
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-rise-charcoal flex items-center justify-center border border-rise-lime/50">
                                <Cpu className="w-6 h-6 text-rise-lime" />
                            </div>
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-rise-charcoal animate-pulse"></div>
                        </div>
                        <div>
                            <h3 className="font-display font-bold text-white text-lg tracking-wide">HAL</h3>
                            <p className="text-xs text-white/70 uppercase tracking-wider">Triage Agent</p>
                        </div>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide bg-gradient-to-b from-rise-dark/50 to-rise-dark/80">
                    <div className="text-center py-4">
                        <span className="bg-white/5 text-white/40 text-xs py-1 px-3 rounded-full border border-white/5">
                            Powered by Gemini 3 Flash
                        </span>
                    </div>
                    
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                                msg.role === 'user' 
                                    ? 'bg-rise-lime text-rise-charcoal font-medium rounded-tr-none' 
                                    : 'bg-white/10 text-white border border-white/10 rounded-tl-none backdrop-blur-sm'
                            }`}>
                                {/* Use basic Markdown-like rendering for bold text if needed, stripping asterisks for cleaner look if simple */}
                                {msg.text.split('**').map((part, i) => 
                                    i % 2 === 1 ? <strong key={i} className="text-rise-lime font-bold">{part}</strong> : part
                                )}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                             <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none border border-white/5 flex items-center space-x-2">
                                <Loader2 className="w-4 h-4 text-rise-lime animate-spin" />
                                <span className="text-xs text-gray-400">HAL is thinking...</span>
                             </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-rise-charcoal border-t border-white/10">
                    <div className="relative">
                        <input 
                            type="text" 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="Tell me about your injury..."
                            disabled={isLoading}
                            className="w-full bg-rise-dark/50 text-white placeholder-gray-500 rounded-xl pl-4 pr-12 py-4 border border-white/10 focus:border-rise-lime focus:ring-1 focus:ring-rise-lime outline-none transition-all disabled:opacity-50"
                        />
                        <button 
                            onClick={handleSend}
                            disabled={!input.trim() || isLoading}
                            className="absolute right-2 top-2 p-2 bg-rise-lime text-rise-charcoal rounded-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send size={18} className={input.trim() ? "translate-x-0.5" : ""} />
                        </button>
                    </div>
                    <div className="mt-2 text-center">
                         <p className="text-[10px] text-gray-500 flex items-center justify-center gap-1">
                            <Sparkles size={10} /> AI can make mistakes. Consult a doctor for medical advice.
                         </p>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default AITriageWidget;