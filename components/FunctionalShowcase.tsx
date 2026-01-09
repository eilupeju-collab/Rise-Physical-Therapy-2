import React, { useState } from 'react';
import { Check, Target, Zap, Activity, X, Loader2, Sparkles, MoveRight, ShieldCheck, Dumbbell } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const FunctionalShowcase: React.FC = () => {
  const [activeOverlay, setActiveOverlay] = useState<'none' | 'method' | 'exercises'>('none');
  const [exercises, setExercises] = useState<{name: string, cues: string}[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchExercises = async () => {
    setLoading(true);
    setActiveOverlay('exercises');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Generate 3 advanced physical therapy exercises for functional core stability. Focus on 'Bird-Dog' variations or similar kinetic chain movements. Format as JSON: Array of {name: string, cues: string}.",
        config: {
          responseMimeType: "application/json"
        }
      });
      const data = JSON.parse(response.text || "[]");
      setExercises(data);
    } catch (error) {
      console.error("Failed to fetch exercises:", error);
      setExercises([
        { name: "Bird-Dog Rows", cues: "Maintain flat back while pulling weight to hip." },
        { name: "Dead Bug Iso-Press", cues: "Press hand into opposite knee to engage deep core." },
        { name: "Plank Pallof Press", cues: "Resist lateral rotation while extending arms." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-rise-charcoal flex flex-col md:flex-row-reverse min-h-[600px] border-b border-white/5 relative">
      {/* Image Section */}
      <div className="w-full md:w-1/2 relative h-[500px] md:h-auto overflow-hidden group">
         <img 
           src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop" 
           alt="Therapist guiding patient through functional core stability exercises" 
           className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale-[20%] group-hover:grayscale-0"
         />
         <div className="absolute inset-0 bg-rise-dark/10 mix-blend-multiply"></div>
         
         <div className="absolute top-6 right-6 bg-rise-red/90 backdrop-blur-sm px-4 py-2 rounded-sm border border-white/20 shadow-xl z-20 skew-x-[10deg]">
            <span className="skew-x-[-10deg] inline-block font-display font-bold text-white uppercase tracking-tighter text-sm">
                Movement Optimization
            </span>
         </div>
      </div>
      
      {/* Text Section */}
      <div className="w-full md:w-1/2 bg-rise-charcoal p-12 md:p-24 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-rise-red rounded-full blur-[100px] opacity-5 pointer-events-none"></div>

          <h3 className="text-rise-red font-display font-bold tracking-widest uppercase mb-4 text-sm flex items-center gap-2">
            <Target size={16} /> Performance Pillar
          </h3>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight uppercase italic">
             FUNCTIONAL <br/>CORE <span className="text-transparent bg-clip-text bg-gradient-to-r from-rise-red to-gray-500">STABILITY</span>
          </h2>
          <p className="text-gray-400 mb-8 leading-relaxed max-w-md">
             We don't just fix pain; we optimize movement patterns. By focusing on core stability and neuromuscular control, we build a foundation that prevents future injury and maximizes athletic output.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-display tracking-wide text-white/90">
             <div className="flex items-center space-x-3 group">
                 <div className="bg-rise-red/10 p-2 rounded-sm border border-rise-red/20 group-hover:bg-rise-red/20 transition-colors">
                    <Activity size={16} className="text-rise-red" />
                 </div>
                 <span className="text-sm uppercase tracking-wider">Dynamic Control</span>
             </div>
             <div className="flex items-center space-x-3 group">
                 <div className="bg-rise-red/10 p-2 rounded-sm border border-rise-red/20 group-hover:bg-rise-red/20 transition-colors">
                    <Zap size={16} className="text-rise-red" />
                 </div>
                 <span className="text-sm uppercase tracking-wider">Kinetic Linkage</span>
             </div>
             <div className="flex items-center space-x-3 group">
                 <div className="bg-rise-red/10 p-2 rounded-sm border border-rise-red/20 group-hover:bg-rise-red/20 transition-colors">
                    <Check size={16} className="text-rise-red" />
                 </div>
                 <span className="text-sm uppercase tracking-wider">Motor Learning</span>
             </div>
             <div className="flex items-center space-x-3 group">
                 <div className="bg-rise-red/10 p-2 rounded-sm border border-rise-red/20 group-hover:bg-rise-red/20 transition-colors">
                    <Target size={16} className="text-rise-red" />
                 </div>
                 <span className="text-sm uppercase tracking-wider">Form Correction</span>
             </div>
          </div>

          <div className="mt-12 flex space-x-6">
            <button 
              onClick={() => setActiveOverlay('method')}
              className="bg-white text-rise-charcoal px-6 py-3 font-display font-bold uppercase tracking-widest text-xs hover:bg-rise-red hover:text-white transition-all skew-x-[-10deg]"
            >
                <span className="skew-x-[10deg] inline-block">Our Method</span>
            </button>
            <button 
              onClick={fetchExercises}
              className="text-white/50 border-b border-white/10 pb-1 hover:text-white hover:border-rise-red transition-all text-xs uppercase tracking-widest flex items-center gap-2"
            >
                See Exercises <MoveRight size={14} />
            </button>
          </div>
      </div>

      {/* OVERLAYS */}
      
      {/* Our Method Overlay */}
      {activeOverlay === 'method' && (
        <div className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-2xl p-8 md:p-24 animate-in fade-in duration-300 flex flex-col items-center justify-center overflow-y-auto">
            <button 
                onClick={() => setActiveOverlay('none')}
                className="absolute top-10 right-10 text-white/50 hover:text-white transition-colors"
            >
                <X size={40} strokeWidth={1} />
            </button>
            
            <div className="max-w-4xl w-full">
                <h3 className="text-rise-red font-display font-bold tracking-[0.4em] uppercase mb-6 text-center text-sm italic">The RISE Framework</h3>
                <h2 className="text-6xl md:text-8xl font-display font-bold text-white uppercase italic text-center mb-20 tracking-tighter leading-[0.85]">
                    CLINICAL <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-rise-red to-gray-500">EXCELLENCE</span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-4 group">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-rise-red/20 rounded-full flex items-center justify-center border border-rise-red/30 group-hover:bg-rise-red transition-all">
                                <span className="text-white font-display font-bold">01</span>
                            </div>
                            <h4 className="text-2xl text-white font-display font-bold uppercase italic tracking-wide">Quantified Assessment</h4>
                        </div>
                        <p className="text-gray-500 pl-16 text-sm leading-relaxed">We use infrared motion capture and dual force plates to identify asymmetries the human eye misses.</p>
                    </div>

                    <div className="space-y-4 group">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-rise-red/20 rounded-full flex items-center justify-center border border-rise-red/30 group-hover:bg-rise-red transition-all">
                                <span className="text-white font-display font-bold">02</span>
                            </div>
                            <h4 className="text-2xl text-white font-display font-bold uppercase italic tracking-wide">1-on-1 Doctorate Care</h4>
                        </div>
                        <p className="text-gray-500 pl-16 text-sm leading-relaxed">No techs. No assistants. Your entire hour is spent with a Doctor of Physical Therapy.</p>
                    </div>

                    <div className="space-y-4 group">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-rise-red/20 rounded-full flex items-center justify-center border border-rise-red/30 group-hover:bg-rise-red transition-all">
                                <span className="text-white font-display font-bold">03</span>
                            </div>
                            <h4 className="text-2xl text-white font-display font-bold uppercase italic tracking-wide">Load Progression</h4>
                        </div>
                        <p className="text-gray-500 pl-16 text-sm leading-relaxed">We bridge the gap between rehab and performance by introducing calculated, athletic loads.</p>
                    </div>

                    <div className="space-y-4 group">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-rise-red/20 rounded-full flex items-center justify-center border border-rise-red/30 group-hover:bg-rise-red transition-all">
                                <span className="text-white font-display font-bold">04</span>
                            </div>
                            <h4 className="text-2xl text-white font-display font-bold uppercase italic tracking-wide">Home Autonomy</h4>
                        </div>
                        <p className="text-gray-500 pl-16 text-sm leading-relaxed">Our digital platform tracks your home performance, ensuring consistency between visits.</p>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Exercises AI Overlay */}
      {activeOverlay === 'exercises' && (
        <div className="fixed inset-0 z-[60] bg-rise-dark/95 backdrop-blur-3xl p-8 flex items-center justify-center animate-in zoom-in-95 duration-300">
            <div className="max-w-xl w-full bg-rise-charcoal border border-white/10 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
                {/* Decorative Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-rise-red rounded-full blur-[80px] opacity-20"></div>
                
                <button 
                    onClick={() => setActiveOverlay('none')}
                    className="absolute top-4 right-4 text-white/30 hover:text-white"
                >
                    <X size={24} />
                </button>

                <div className="flex items-center space-x-3 mb-8">
                    <Sparkles className="text-rise-red animate-pulse" size={24} />
                    <h3 className="text-white font-display font-bold uppercase tracking-widest text-lg italic">Stability Protocol</h3>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 space-y-6">
                        <div className="relative">
                            <Loader2 className="text-rise-red animate-spin w-16 h-16" strokeWidth={1} />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Dumbbell className="text-white w-5 h-5 animate-bounce" />
                            </div>
                        </div>
                        <div className="text-center">
                            <p className="text-white font-display uppercase tracking-widest text-sm">Consulting RISE Systems</p>
                            <p className="text-gray-500 text-[10px] uppercase tracking-tighter mt-1">Generating Optimized Movement Flow...</p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {exercises.map((ex, idx) => (
                            <div key={idx} className="bg-white/5 border border-white/5 p-4 rounded-lg hover:border-rise-red/30 transition-all group">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="text-rise-red font-display font-bold uppercase tracking-wide group-hover:text-white transition-colors">{ex.name}</h4>
                                    <span className="text-[10px] text-gray-600 bg-black/40 px-2 py-0.5 rounded border border-white/5 uppercase">Level: Advanced</span>
                                </div>
                                <p className="text-gray-400 text-xs leading-relaxed italic">
                                    <span className="text-white/40 not-italic mr-2 font-bold uppercase tracking-tighter">Cue:</span>
                                    {ex.cues}
                                </p>
                            </div>
                        ))}
                        
                        <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                            <div className="flex items-center space-x-2 text-[10px] text-gray-600 uppercase">
                                <ShieldCheck size={14} className="text-rise-red" />
                                <span>Clinical Verification Required</span>
                            </div>
                            <button className="bg-white text-rise-charcoal px-4 py-2 font-display font-bold uppercase tracking-widest text-[10px] hover:bg-rise-red hover:text-white transition-all skew-x-[-10deg]">
                                <span className="skew-x-[10deg] inline-block">Save to Profile</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
      )}
    </section>
  );
};

export default FunctionalShowcase;