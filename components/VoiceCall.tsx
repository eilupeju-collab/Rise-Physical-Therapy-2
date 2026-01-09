import React, { useEffect, useRef, useState } from 'react';
import { X, Mic, MicOff, PhoneOff, Activity, Loader2, MapPin, Calendar, CheckCircle, Clock } from 'lucide-react';
import { GoogleGenAI, LiveServerMessage, Modality, Type, FunctionDeclaration, Tool } from '@google/genai';

interface VoiceCallProps {
  isOpen: boolean;
  onClose: () => void;
}

type ToolDisplay = 
  | { type: 'map'; address: string }
  | { type: 'calendar'; date: string; slots: string[] }
  | { type: 'confirmation'; date: string; time: string; ref: string; goal?: string }
  | null;

const VoiceCall: React.FC<VoiceCallProps> = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState<'connecting' | 'connected' | 'error' | 'closed'>('connecting');
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0); 
  const [toolDisplay, setToolDisplay] = useState<ToolDisplay>(null);

  // Refs for audio handling
  const sessionRef = useRef<any>(null);
  const inputContextRef = useRef<AudioContext | null>(null);
  const outputContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (isOpen) {
      startSession();
    } else {
      stopSession();
    }
    return () => {
        stopSession();
    };
  }, [isOpen]);

  const startSession = async () => {
    stopSession();
    setStatus('connecting');
    setToolDisplay(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      inputContextRef.current = inputCtx;
      
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      outputContextRef.current = outputCtx;
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // --- Tool Definitions ---
      const tools: Tool[] = [
        {
          functionDeclarations: [
            {
              name: "get_clinic_location",
              description: "Get the address and location of the RISE clinic. Use this when the user asks for directions, location, or where we are.",
              parameters: {
                type: Type.OBJECT,
                properties: {},
              }
            },
            {
              name: "check_availability",
              description: "Check available appointment slots for a specific date.",
              parameters: {
                type: Type.OBJECT,
                properties: {
                  date: { type: Type.STRING, description: "The date to check (e.g., 'tomorrow', 'next Monday', '2025-10-25')" }
                },
                required: ["date"]
              }
            },
            {
              name: "book_appointment",
              description: "Book a specific appointment slot after collecting user details.",
              parameters: {
                type: Type.OBJECT,
                properties: {
                  date: { type: Type.STRING, description: "Date of appointment" },
                  time: { type: Type.STRING, description: "Time of appointment" },
                  name: { type: Type.STRING, description: "Patient name" },
                  goal: { type: Type.STRING, description: "Patient's primary rehabilitation or performance goal" },
                  activity_level: { type: Type.STRING, description: "Patient's activity level (Low, Moderate, Athlete)" }
                },
                required: ["date", "time", "name", "goal", "activity_level"]
              }
            }
          ]
        }
      ];

      const config = {
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            console.log("Voice Session Opened");
            setStatus('connected');
            
            if (!inputContextRef.current) return;
            const source = inputContextRef.current.createMediaStreamSource(stream);
            const processor = inputContextRef.current.createScriptProcessor(4096, 1, 1);
            processorRef.current = processor;

            processor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              
              let sum = 0;
              for(let i=0; i<inputData.length; i++) sum += inputData[i] * inputData[i];
              const rms = Math.sqrt(sum / inputData.length);
              setVolume(Math.min(rms * 5, 1)); 

              if (isMuted) return; 

              const pcmBlob = createBlob(inputData);
              sessionPromise.then(session => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };

            const silence = inputContextRef.current.createGain();
            silence.gain.value = 0;
            source.connect(processor);
            processor.connect(silence);
            silence.connect(inputContextRef.current.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            // --- Tool Calling Logic ---
            if (message.toolCall) {
                console.log("Tool Call:", message.toolCall);
                const responses = [];
                for (const fc of message.toolCall.functionCalls) {
                    let result: any = {};
                    
                    // Mock Implementations
                    if (fc.name === 'get_clinic_location') {
                        const address = "200 Performance Dr, Austin, TX 78701";
                        setToolDisplay({ type: 'map', address });
                        result = { 
                            address,
                            nearby_landmark: "Next to the City River Stadium",
                            maps_url: "https://maps.google.com/?q=Rise+Physical+Therapy"
                        };
                    } else if (fc.name === 'check_availability') {
                        const date = (fc.args as any).date || "requested date";
                        // Simulate lookup delay
                        setToolDisplay({ type: 'calendar', date, slots: [] }); // Loading state
                        await new Promise(r => setTimeout(r, 800)); 
                        
                        const slots = ['9:00 AM', '11:30 AM', '3:00 PM', '4:45 PM'];
                        setToolDisplay({ type: 'calendar', date, slots });
                        result = { available_slots: slots };
                    } else if (fc.name === 'book_appointment') {
                        const args = fc.args as any;
                        const ref = "R-" + Math.floor(Math.random() * 10000);
                        setToolDisplay({ 
                          type: 'confirmation', 
                          date: args.date, 
                          time: args.time, 
                          ref,
                          goal: args.goal 
                        });
                        result = { status: "success", confirmation_code: ref, message: "Appointment confirmed and synced to CRM." };
                    }

                    responses.push({
                        id: fc.id,
                        name: fc.name,
                        response: { result }
                    });
                }
                
                // Send response back to model
                sessionPromise.then(session => {
                    session.sendToolResponse({ functionResponses: responses });
                });
            }

            // --- Audio Output Logic ---
            if (message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data) {
               if (!outputContextRef.current) return;
               const base64Audio = message.serverContent.modelTurn.parts[0].inlineData.data;
               const ctx = outputContextRef.current;
               
               if (nextStartTimeRef.current <= ctx.currentTime && sourcesRef.current.size === 0) {
                 playChime(ctx);
               }

               nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
               
               const audioBuffer = await decodeAudioData(
                 decode(base64Audio),
                 ctx,
                 24000,
                 1
               );

               const source = ctx.createBufferSource();
               source.buffer = audioBuffer;
               source.connect(ctx.destination);
               source.onended = () => sourcesRef.current.delete(source);
               
               source.start(nextStartTimeRef.current);
               nextStartTimeRef.current += audioBuffer.duration;
               sourcesRef.current.add(source);
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(src => {
                try { src.stop(); } catch(e) {}
              });
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onclose: () => {
            console.log("Session closed");
            setStatus('closed');
          },
          onerror: (err: any) => {
            console.error("Session error", err);
            setStatus('error');
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          tools: tools,
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } }
          },
          systemInstruction: `You are HAL, the Voice Assistant for RISE Physical Therapy.
          
          ROLE:
          You are a professional, efficient, and friendly assistant. Your main goal is to triage users and get them booked for a session.

          CLINIC DATA:
          - Location: 200 Performance Dr, Austin, TX 78701.
          - Hours: Mon-Fri 6am-8pm, Sat 8am-4pm.
          - Prices: Day Pass $35, Membership starts at $199/mo. Free Discovery Session for new patients.

          BOOKING PROTOCOL (Trigger this when user shows interest in booking):
          1. Ask ONE question at a time. Do not stack questions. Wait for the user to answer before moving to the next step.
          2. Step 1: Ask for their primary goal (e.g., Rehab, Performance, or General Health).
          3. Step 2: Ask for their current activity level (Low, Moderate, or Athlete).
          4. Step 3: Ask for their preferred day or time to visit.
             - Call 'check_availability' tool with the date provided.
          5. Step 4: Once a slot is agreed upon, ask for their name.
          6. Step 5: Call 'book_appointment' with all collected details (date, time, name, goal, activity_level).
          7. Final: Summarize the booking details verbally and say: "I've passed this to our physical therapy team for final confirmation. We look forward to seeing you."

          GENERAL RULES:
          - Keep answers short (1-3 sentences).
          - Be accurate with clinic data.
          - If the user asks about price/location/hours, answer directly, then ask if they want to book a visit.
          
          Start by saying: "RISE Systems Online. I'm HAL. How can I help you reach your peak today?"
          `
        }
      };

      const sessionPromise = ai.live.connect(config);
      sessionRef.current = await sessionPromise;

    } catch (e) {
      console.error(e);
      setStatus('error');
    }
  };

  const stopSession = () => {
    if (sessionRef.current) {
      try { 
          // @ts-ignore
          if (sessionRef.current.close) sessionRef.current.close(); 
      } catch(e) {}
    }
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (processorRef.current) {
        try { processorRef.current.disconnect(); } catch(e) {}
        processorRef.current = null;
    }

    const inputCtx = inputContextRef.current;
    if (inputCtx) {
        inputContextRef.current = null; 
        try { if (inputCtx.state !== 'closed') inputCtx.close(); } catch(e) {}
    }

    const outputCtx = outputContextRef.current;
    if (outputCtx) {
        outputContextRef.current = null; 
        try { if (outputCtx.state !== 'closed') outputCtx.close(); } catch(e) {}
    }
    
    sessionRef.current = null;
    sourcesRef.current.clear();
    nextStartTimeRef.current = 0;
    setStatus('closed');
    setToolDisplay(null);
  };

  const handleClose = () => {
    stopSession();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="absolute top-0 w-full p-8 flex justify-between items-center">
        <div className="flex items-center space-x-2">
           <Activity className="text-rise-lime w-6 h-6" />
           <span className="text-white font-display uppercase tracking-widest text-sm">Rise Call Center</span>
        </div>
        <button onClick={handleClose} className="text-white/50 hover:text-white transition-colors">
          <X size={32} />
        </button>
      </div>

      {/* Main Visualizer Area */}
      <div className="relative flex flex-col items-center justify-center space-y-8 w-full max-w-md px-6">
        
        {/* Avatar Section */}
        <div className="relative flex items-center justify-center">
            {status === 'connected' && (
            <>
                <div className="absolute w-64 h-64 border border-rise-lime/20 rounded-full animate-[ping_3s_ease-in-out_infinite]"></div>
                <div className="absolute w-48 h-48 border border-rise-lime/30 rounded-full animate-[ping_2s_ease-in-out_infinite]"></div>
                <div className="absolute w-32 h-32 bg-rise-lime/5 rounded-full blur-xl transform scale-[1.5]" style={{ opacity: Math.max(0.2, volume) }}></div>
            </>
            )}

            <div className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 z-10 ${
            status === 'error' ? 'bg-rise-red/20 border-rise-red' : 'bg-black border-rise-lime'
            } border-2 shadow-[0_0_30px_rgba(204,255,0,0.15)]`}>
            {status === 'connecting' ? (
                <Loader2 className="w-10 h-10 text-rise-lime animate-spin" />
            ) : (
                <div className="text-center">
                    <span className="text-4xl">🤖</span>
                </div>
            )}
            </div>
        </div>

        {/* Dynamic Tool Interface Card */}
        {toolDisplay && (
             <div className="w-full bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 animate-in slide-in-from-bottom-5 fade-in duration-500">
                
                {/* Map Card */}
                {toolDisplay.type === 'map' && (
                    <div className="flex flex-col items-center text-center space-y-3">
                        <div className="w-full h-32 bg-gray-800 rounded-lg relative overflow-hidden flex items-center justify-center group">
                            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-50" alt="Map" />
                            <MapPin className="relative z-10 w-8 h-8 text-rise-lime drop-shadow-lg" />
                        </div>
                        <div>
                             <h4 className="text-white font-display uppercase tracking-wide text-sm font-bold">Rise HQ</h4>
                             <p className="text-gray-400 text-xs">{toolDisplay.address}</p>
                        </div>
                    </div>
                )}

                {/* Calendar Card */}
                {toolDisplay.type === 'calendar' && (
                    <div className="space-y-3">
                        <div className="flex items-center space-x-2 text-rise-lime border-b border-white/10 pb-2">
                             <Calendar size={16} />
                             <span className="font-display uppercase tracking-wider text-xs font-bold">Checking Availability</span>
                        </div>
                        <p className="text-xs text-gray-400">Slots for: <span className="text-white">{toolDisplay.date}</span></p>
                        
                        {toolDisplay.slots.length === 0 ? (
                            <div className="flex justify-center py-4"><Loader2 className="animate-spin text-white/50" /></div>
                        ) : (
                            <div className="grid grid-cols-2 gap-2">
                                {toolDisplay.slots.map(slot => (
                                    <div key={slot} className="bg-white/5 hover:bg-rise-lime/20 border border-white/10 rounded px-3 py-2 text-center text-sm text-white cursor-pointer transition-colors">
                                        {slot}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Confirmation Card */}
                {toolDisplay.type === 'confirmation' && (
                    <div className="text-center space-y-4 py-2">
                        <div className="w-12 h-12 bg-rise-lime rounded-full flex items-center justify-center mx-auto text-rise-charcoal">
                            <CheckCircle size={24} />
                        </div>
                        <div>
                            <h4 className="text-white font-display font-bold text-lg uppercase">Confirmed</h4>
                            <p className="text-gray-400 text-xs">Your appointment is set.</p>
                        </div>
                        <div className="bg-black/40 rounded-lg p-3 text-left space-y-2">
                            <div className="flex justify-between text-xs">
                                <span className="text-gray-500">Date</span>
                                <span className="text-white">{toolDisplay.date}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span className="text-gray-500">Time</span>
                                <span className="text-white">{toolDisplay.time}</span>
                            </div>
                             {toolDisplay.goal && (
                                <div className="flex justify-between text-xs">
                                    <span className="text-gray-500">Goal</span>
                                    <span className="text-white truncate max-w-[150px]">{toolDisplay.goal}</span>
                                </div>
                            )}
                            <div className="flex justify-between text-xs border-t border-white/10 pt-2">
                                <span className="text-gray-500">Ref Code</span>
                                <span className="text-rise-lime font-mono">{toolDisplay.ref}</span>
                            </div>
                        </div>
                    </div>
                )}
             </div>
        )}
        
        {/* Status Text */}
        <div className="text-center">
            <h2 className="text-2xl text-white font-display font-bold uppercase tracking-wide">
            {status === 'connecting' ? 'Connecting...' : 
            status === 'error' ? 'Signal Lost' : 'HAL 9000'}
            </h2>
            <p className="text-gray-500 text-sm flex items-center justify-center gap-2 mt-1">
                {status === 'connected' && <span className="w-2 h-2 bg-rise-lime rounded-full animate-pulse"></span>}
                {status === 'error' ? 'Check mic permissions' : 'AI Voice Assistant'}
            </p>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-12 flex items-center space-x-8">
         <button 
           onClick={() => setIsMuted(!isMuted)}
           className={`p-6 rounded-full border transition-all ${isMuted ? 'bg-white text-black border-white' : 'bg-transparent text-white border-white/20 hover:border-rise-lime hover:text-rise-lime'}`}
         >
            {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
         </button>
         
         <button 
           onClick={handleClose}
           className="p-6 rounded-full bg-rise-red text-white hover:bg-red-600 transition-colors shadow-lg shadow-rise-red/20"
         >
            <PhoneOff size={24} />
         </button>
      </div>

    </div>
  );
};

// --- Audio Helpers ---

function createBlob(data: Float32Array): { data: string; mimeType: string } {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  const uint8 = new Uint8Array(int16.buffer);
  
  let binary = '';
  const len = uint8.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(uint8[i]);
  }
  const base64 = btoa(binary);
  
  return {
    data: base64,
    mimeType: 'audio/pcm;rate=16000',
  };
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

function playChime(ctx: AudioContext) {
  const t = ctx.currentTime;
  const gainValue = 0.05;

  const createOsc = (freq: number, endFreq: number) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t);
    osc.frequency.exponentialRampToValueAtTime(endFreq, t + 0.1);
    
    gain.gain.setValueAtTime(gainValue, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
    
    osc.start(t);
    osc.stop(t + 0.1);
  };

  createOsc(440, 880); 
  createOsc(660, 1320);
}

export default VoiceCall;