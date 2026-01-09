import React from 'react';
import { Check } from 'lucide-react';

const Showcase: React.FC = () => {
  return (
    <section className="bg-white flex flex-col md:flex-row min-h-[600px] border-y border-white/5">
      {/* Image Section */}
      <div className="w-full md:w-1/2 relative h-[500px] md:h-auto overflow-hidden group">
         <img 
           src="https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?q=80&w=2069&auto=format&fit=crop" 
           alt="Doctor assisting patient with prosthetic limb during rehabilitation" 
           className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale-[10%] group-hover:grayscale-0"
         />
         {/* Subtle overlay to integrate with site theme */}
         <div className="absolute inset-0 bg-rise-dark/5 mix-blend-multiply"></div>
         
         {/* Floating Badge */}
         <div className="absolute bottom-6 left-6 bg-rise-lime/90 backdrop-blur-sm px-4 py-2 rounded-sm border border-white/20 shadow-xl z-20 skew-x-[-10deg]">
            <span className="skew-x-[10deg] inline-block font-display font-bold text-rise-charcoal uppercase tracking-tighter text-sm">
                Specialized Adaptive Care
            </span>
         </div>
      </div>
      
      {/* Text Section */}
      <div className="w-full md:w-1/2 bg-rise-dark p-12 md:p-24 flex flex-col justify-center relative overflow-hidden">
          {/* Decorative Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-rise-lime rounded-full blur-[100px] opacity-5 pointer-events-none"></div>

          <h3 className="text-rise-lime font-display font-bold tracking-widest uppercase mb-4 text-sm">Case Study: Recovery</h3>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
             ADAPTIVE <br/>REHAB <span className="text-transparent bg-clip-text bg-gradient-to-r from-rise-lime to-white">PRECISION</span>
          </h2>
          <p className="text-gray-400 mb-8 leading-relaxed max-w-md">
             We specialize in complex biomechanical alignment and adaptive performance. Our doctors work 1-on-1 to restore function and push beyond perceived limitations through evidence-based correction.
          </p>
          
          <div className="space-y-5 font-display tracking-wide text-white/90">
             <div className="flex items-center space-x-4">
                 <div className="bg-rise-lime/10 p-2 rounded-full border border-rise-lime/20"><Check size={16} className="text-rise-lime" /></div>
                 <span>Prosthetic & Orthotic Integration</span>
             </div>
             <div className="flex items-center space-x-4">
                 <div className="bg-rise-lime/10 p-2 rounded-full border border-rise-lime/20"><Check size={16} className="text-rise-lime" /></div>
                 <span>Neuromuscular Re-education</span>
             </div>
             <div className="flex items-center space-x-4">
                 <div className="bg-rise-lime/10 p-2 rounded-full border border-rise-lime/20"><Check size={16} className="text-rise-lime" /></div>
                 <span>Complex Gait Analysis & Training</span>
             </div>
          </div>

          <div className="mt-12">
            <button className="text-white border-b border-rise-lime pb-1 hover:text-rise-lime transition-colors text-sm uppercase tracking-widest">
                View Specialized Programs
            </button>
          </div>
      </div>
    </section>
  );
};

export default Showcase;