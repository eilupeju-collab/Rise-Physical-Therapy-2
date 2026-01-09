import React from 'react';
import { Building2, Smartphone, MessageSquareText, ExternalLink, Bot, Activity } from 'lucide-react';

const IndustryLandscape: React.FC = () => {
  const categories = [
    {
      title: "Large Clinic Networks",
      subtitle: "Administrative & Scheduling AI",
      icon: <Building2 className="w-6 h-6 text-rise-lime" />,
      description: "Clinics using AI as a 'digital front door' for booking and routing.",
      examples: [
        {
          name: "Ivy Rehab",
          agent: "Ivy.ai",
          details: "Acts as a virtual receptionist to answer FAQs and automate scheduling before human contact.",
          website: "ivyrehab.com"
        },
        {
          name: "ATI Physical Therapy",
          agent: "CONNECT Platform",
          details: "Digital assessments to triage patients and route them to virtual or in-person care pathways.",
          website: "atipt.com"
        }
      ]
    },
    {
      title: "Virtual-First Platforms",
      subtitle: "Clinical 'Digital Therapist' AI",
      icon: <Smartphone className="w-6 h-6 text-rise-lime" />,
      description: "Digital clinics where AI guides exercises and provides real-time feedback.",
      examples: [
        {
          name: "Sword Health",
          agent: "Phoenix",
          details: "Conversational AI that guides sessions and adjusts difficulty based on performance.",
          website: "swordhealth.com"
        },
        {
          name: "Hinge Health",
          agent: "Enso",
          details: "Uses computer vision for real-time corrective feedback on movement form.",
          website: "hingehealth.com"
        },
        {
          name: "Luna Physical Therapy",
          agent: "Luna Labs",
          details: "Voice-enabled AI for auto-charting and automated concierge services.",
          website: "getluna.com"
        }
      ]
    },
    {
      title: "Private Practices",
      subtitle: "Intake & Conversion Bots",
      icon: <MessageSquareText className="w-6 h-6 text-rise-lime" />,
      description: "Smaller clinics utilizing widget chatbots for lead capture and booking.",
      examples: [
        {
          name: "21st Century Rehab",
          agent: "Text-to-Schedule Bot",
          details: "Captures mobile numbers to start SMS conversations for booking.",
          website: "21stcenturyrehab.com"
        },
        {
          name: "Kinesioworks PT",
          agent: "Triage Bot",
          details: "Handles initial inquiries and helps patients find specific services like gait analysis.",
          website: "kinesioworkspt.com"
        }
      ]
    }
  ];

  return (
    <section className="bg-rise-charcoal py-24 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <div className="flex items-center space-x-2 mb-2">
            <Activity className="w-5 h-5 text-rise-lime" />
            <h3 className="text-rise-lime font-display font-bold tracking-widest uppercase text-sm">Industry Landscape</h3>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            AI in <span className="text-gray-500">Physical Therapy</span>
          </h2>
          <p className="text-gray-400 max-w-2xl leading-relaxed">
            The industry is evolving. From large networks to digital-first platforms, Artificial Intelligence is reshaping how care is delivered, scheduled, and monitored.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-rise-lime/30 transition-colors duration-300 flex flex-col h-full">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-black/50 rounded-lg border border-white/10">
                  {cat.icon}
                </div>
                <div>
                  <h3 className="text-white font-display font-bold text-lg leading-tight">{cat.title}</h3>
                  <p className="text-rise-lime text-xs font-medium uppercase tracking-wider">{cat.subtitle}</p>
                </div>
              </div>
              
              <p className="text-gray-400 text-sm mb-6 pb-6 border-b border-white/5">
                {cat.description}
              </p>

              <div className="space-y-6 flex-1">
                {cat.examples.map((ex, i) => (
                  <div key={i} className="group">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-white font-medium flex items-center">
                        {ex.name}
                        <ExternalLink size={12} className="ml-2 text-gray-600 group-hover:text-rise-lime transition-colors opacity-0 group-hover:opacity-100" />
                      </h4>
                      <span className="text-xs bg-rise-lime/10 text-rise-lime px-2 py-0.5 rounded border border-rise-lime/20 font-display tracking-wide">
                        {ex.agent}
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      {ex.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Connection to RISE HAL */}
        <div className="mt-16 bg-gradient-to-r from-rise-lime/10 to-transparent border border-rise-lime/20 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-start space-x-4 mb-6 md:mb-0">
                <div className="bg-rise-lime text-rise-charcoal p-3 rounded-full animate-pulse">
                    <Bot size={24} />
                </div>
                <div>
                    <h4 className="text-white font-display font-bold text-xl uppercase mb-1">Experience RISE HAL</h4>
                    <p className="text-gray-400 text-sm max-w-lg">
                        Our own custom AI agent, HAL, combines the best of these worlds: instant triage, smart scheduling, and preliminary athletic assessment.
                    </p>
                </div>
            </div>
            <button 
                onClick={() => {
                  const btn = document.querySelector('button[aria-label="Try HAL"]') as HTMLElement | null;
                  if (btn) {
                    btn.click();
                  } else {
                    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                  }
                }}
                className="bg-rise-lime text-rise-charcoal px-6 py-3 font-bold font-display uppercase tracking-wider hover:bg-white transition-colors rounded-sm"
            >
                Start Triage
            </button>
        </div>
      </div>
    </section>
  );
};

export default IndustryLandscape;