import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Showcase from './components/Showcase';
import FunctionalShowcase from './components/FunctionalShowcase';
import ManualPerformance from './components/ManualPerformance';
import IndustryLandscape from './components/IndustryLandscape';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import AITriageWidget from './components/AITriageWidget';
import VoiceCall from './components/VoiceCall';

const App: React.FC = () => {
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);

  return (
    <div className="min-h-screen bg-rise-dark relative">
      <Navbar />
      <Hero onStartVoice={() => setIsVoiceOpen(true)} />
      <Features />
      <Showcase />
      <FunctionalShowcase />
      <ManualPerformance />
      <IndustryLandscape />
      <Pricing />
      <Contact />
      
      {/* Footer Area */}
      <footer className="bg-black py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <div className="mb-4 md:mb-0 font-display uppercase tracking-widest">
            &copy; 2025 RISE Physical Therapy.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-rise-lime transition-colors">Privacy</a>
            <a href="#" className="hover:text-rise-lime transition-colors">Terms</a>
            <a href="#" className="hover:text-rise-lime transition-colors">Instagram</a>
          </div>
        </div>
      </footer>

      <AITriageWidget />
      <VoiceCall isOpen={isVoiceOpen} onClose={() => setIsVoiceOpen(false)} />
    </div>
  );
};

export default App;