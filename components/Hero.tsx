import React from 'react';
import { ChevronDown, PhoneCall } from 'lucide-react';

interface HeroProps {
  onStartVoice: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartVoice }) => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" 
          alt="Sprinter in starting blocks - High Performance Training" 
          className="w-full h-full object-cover object-center"
        />
        {/* Red Duotone Gradient Overlay */}
        <div className="absolute inset-0 bg-duotone-gradient mix-blend-multiply opacity-90"></div>
        {/* Gradient for text readability at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-rise-dark via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20 flex flex-col items-end">
        <div className="max-w-4xl text-right">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold text-white italic leading-[0.9] tracking-tight mb-8 drop-shadow-lg">
            EMPOWERING<br />
            YOU TO LIVE<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-white to-gray-400">YOUR BEST</span>
          </h1>
          
          <div className="flex flex-col md:flex-row items-end md:items-center gap-6 mt-12 md:justify-end">
            <p className="text-gray-300 max-w-xs text-sm leading-relaxed border-r-2 border-rise-lime pr-4 text-right order-2 md:order-1">
              Speak directly with our AI Triage Agent for instant assessment and scheduling.
            </p>
            
            <button 
              onClick={onStartVoice}
              className="bg-rise-lime text-rise-charcoal px-8 py-4 font-display font-bold text-lg uppercase tracking-wider hover:bg-white transition-all duration-300 flex items-center group skew-x-[-10deg] shadow-[0_0_20px_rgba(204,255,0,0.3)] animate-pulse order-1 md:order-2"
            >
              <span className="skew-x-[10deg] flex items-center">
                <PhoneCall className="mr-3 w-6 h-6" />
                Call HAL (Voice AI)
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white/50">
        <ChevronDown size={32} />
      </div>
    </section>
  );
};

export default Hero;