import React from 'react';
import { Check } from 'lucide-react';

const Pricing: React.FC = () => {
  const plans = [
    {
      name: "Day Pass",
      price: "$35",
      period: "/ visit",
      desc: "Perfect for travelers or commitment-free assessment.",
      features: [
        "Full Gym Access",
        "Normatec Recovery Boots",
        "Ice Bath Access",
        "Digital Workout Log"
      ],
      highlight: false
    },
    {
      name: "Standard",
      price: "$199",
      period: "/ month",
      desc: "The foundation for consistent progress and maintenance.",
      features: [
        "Unlimited Gym Access",
        "2 Group Classes / Week",
        "Monthly PT Screen (15 min)",
        "Recovery Lounge Access"
      ],
      highlight: false
    },
    {
      name: "Iron Pro",
      price: "$349",
      period: "/ month",
      desc: "For elite athletes demanding maximum performance.",
      features: [
        "Unlimited Gym Access",
        "Unlimited Group Classes",
        "1-on-1 PT Session (60 min) / Month",
        "Personalized Programming",
        "Priority Booking"
      ],
      highlight: true
    }
  ];

  return (
    <section className="bg-rise-dark py-24 relative overflow-hidden" id="pricing">
        {/* Background Gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-rise-lime/5 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rise-red/5 rounded-full blur-[100px]"></div>
        </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h3 className="text-rise-lime font-display font-bold tracking-widest uppercase text-sm mb-2">Membership</h3>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white uppercase italic">
            Invest In <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Your Potential</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {plans.map((plan, idx) => (
            <div 
              key={idx} 
              className={`relative p-8 rounded-2xl border transition-all duration-300 group ${
                plan.highlight 
                  ? 'bg-white/10 border-rise-lime scale-105 shadow-[0_0_30px_rgba(204,255,0,0.1)]' 
                  : 'bg-white/5 border-white/10 hover:border-white/30'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-rise-lime text-rise-charcoal px-4 py-1 font-display font-bold uppercase text-xs tracking-widest rounded-full">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-xl font-display font-bold text-white uppercase mb-2">{plan.name}</h3>
              <div className="flex items-baseline mb-4">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                <span className="text-gray-400 text-sm ml-2">{plan.period}</span>
              </div>
              <p className="text-gray-400 text-sm mb-8 min-h-[40px]">{plan.desc}</p>

              <div className="space-y-4 mb-8">
                {plan.features.map((feat, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <Check size={16} className={`mt-1 ${plan.highlight ? 'text-rise-lime' : 'text-gray-500'}`} />
                    <span className="text-gray-300 text-sm">{feat}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-4 font-display font-bold uppercase tracking-widest transition-colors clip-path-slant ${
                plan.highlight 
                  ? 'bg-rise-lime text-rise-charcoal hover:bg-white' 
                  : 'bg-transparent border border-white/20 text-white hover:border-white hover:bg-white/5'
              }`}>
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;