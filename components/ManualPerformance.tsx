import React from 'react';
import { Fingerprint, Waves, Zap, RefreshCcw } from 'lucide-react';

const ManualPerformance: React.FC = () => {
  return (
    <section className="bg-black flex flex-col md:flex-row min-h-[600px] border-b border-white/5">
      {/* Image Section */}
      <div className="w-full md:w-1/2 relative h-[500px] md:h-auto overflow-hidden group">
         <img 
           src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop" 
           alt="Therapist in red performing specialized manual soft tissue mobilization" 
           className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 filter sepia-[0.2] contrast-[1.1]"
         />
         {/* Red Duotone Gradient Overlay */}
         <div className="absolute inset-0 bg-gradient-to-tr from-rise-red/40 to-transparent mix-blend-color"></div>
         <div className="absolute inset-0 bg-black/20"></div>
         
         {/* Floating Badge */}
         <div className="absolute bottom-10 right-10 bg-white/10 backdrop-blur-xl px-6 py-3 rounded-sm border border-white/20 shadow-2xl z-20">
            <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-rise-red rounded-full animate-pulse"></div>
                <span className="font-display font-bold text-white uppercase tracking-[0.2em] text-xs">
                    Soft Tissue Systems
                </span>
            </div>
         </div>
      </div>
      
      {/* Text Section */}
      <div className="w-full md:w-1/2 bg-rise-dark p-12 md:p-24 flex flex-col justify-center relative">
          <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-rise-red to-transparent opacity-30"></div>

          <h3 className="text-rise-red font-display font-bold tracking-[0.3em] uppercase mb-4 text-xs">Recovery Architecture</h3>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8 leading-[0.85] uppercase italic tracking-tighter">
             MANUAL <br/>
             <span className="text-rise-red">RECOVERY</span> <br/>
             OPTIMIZATION
          </h2>
          
          <p className="text-gray-500 mb-10 leading-relaxed max-w-md text-sm">
             We utilize advanced manual techniques to release fascial restrictions and optimize tissue density. This isn't just a massage—it's mechanical engineering for the human body.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12">
             <div className="space-y-2">
                <div className="flex items-center space-x-2 text-white font-display uppercase tracking-widest text-xs font-bold">
                    <Fingerprint size={14} className="text-rise-red" />
                    <span>Myofascial Release</span>
                </div>
                <p className="text-gray-600 text-xs leading-normal">Deep structural work to reset chronic tension patterns.</p>
             </div>
             
             <div className="space-y-2">
                <div className="flex items-center space-x-2 text-white font-display uppercase tracking-widest text-xs font-bold">
                    <Waves size={14} className="text-rise-red" />
                    <span>Lymphatic Flow</span>
                </div>
                <p className="text-gray-600 text-xs leading-normal">Accelerated waste removal for faster athletic turnaround.</p>
             </div>

             <div className="space-y-2">
                <div className="flex items-center space-x-2 text-white font-display uppercase tracking-widest text-xs font-bold">
                    <Zap size={14} className="text-rise-red" />
                    <span>Trigger Point</span>
                </div>
                <p className="text-gray-600 text-xs leading-normal">Precision deactivation of hyper-irritable tissue spots.</p>
             </div>

             <div className="space-y-2">
                <div className="flex items-center space-x-2 text-white font-display uppercase tracking-widest text-xs font-bold">
                    <RefreshCcw size={14} className="text-rise-red" />
                    <span>Joint Mobilization</span>
                </div>
                <p className="text-gray-600 text-xs leading-normal">Restoring fluid motion to restricted articular surfaces.</p>
             </div>
          </div>

          <div className="mt-16">
            <button className="group relative overflow-hidden border border-white/10 px-10 py-4 font-display font-bold uppercase tracking-[0.2em] text-[10px] text-white transition-all hover:border-rise-red">
                <span className="relative z-10">Schedule Session</span>
                <div className="absolute inset-0 bg-rise-red translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </div>
      </div>
    </section>
  );
};

export default ManualPerformance;