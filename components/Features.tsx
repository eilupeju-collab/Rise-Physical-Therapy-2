import React from 'react';
import { Users, Zap, Trophy, Timer } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: <Users className="w-8 h-8 text-rise-lime" />,
      title: "1-on-1 Model",
      desc: "No assistants. No techs. Just you and your Doctor of Physical Therapy for the entire hour."
    },
    {
      icon: <Zap className="w-8 h-8 text-rise-lime" />,
      title: "Data Driven",
      desc: "We use force plates and motion capture technology to quantify your progress objectively."
    },
    {
      icon: <Trophy className="w-8 h-8 text-rise-lime" />,
      title: "Athletic Focus",
      desc: "Our facility is a gym, not a clinic. We bridge the gap between rehab and high performance."
    },
    {
      icon: <Timer className="w-8 h-8 text-rise-lime" />,
      title: "Rapid Results",
      desc: "Our patients average 50% fewer visits than the industry standard due to focused care."
    }
  ];

  return (
    <section className="bg-rise-charcoal py-24 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-rise-red rounded-full filter blur-[100px] opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-rise-lime rounded-full filter blur-[120px] opacity-10"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16 md:mb-24">
          <h3 className="text-rise-red font-display font-bold text-lg tracking-widest uppercase mb-2">Why Choose RISE</h3>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white uppercase italic">
            Redefining <span className="text-rise-lime underline decoration-4 decoration-rise-red underline-offset-8">Care Standards</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, idx) => (
            <div key={idx} className="group p-8 border border-white/10 hover:border-rise-lime/50 bg-white/5 hover:bg-white/10 transition-all duration-300">
              <div className="mb-6 bg-rise-dark w-16 h-16 flex items-center justify-center rounded-sm border border-white/10 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h4 className="text-xl font-display font-bold text-white uppercase mb-3">{item.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;