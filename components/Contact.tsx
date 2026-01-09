import React from 'react';
import { MapPin, Phone, Mail, Send, Clock } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section className="bg-black py-24 border-t border-white/10 relative" id="contact">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Contact Info */}
        <div>
           <h3 className="text-rise-lime font-display font-bold tracking-widest uppercase text-sm mb-2">Get In Touch</h3>
           <h2 className="text-4xl md:text-6xl font-display font-bold text-white uppercase italic mb-8">
            Start Your <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-rise-red to-white">Journey</span>
           </h2>
           <p className="text-gray-400 mb-12 max-w-md leading-relaxed">
             Whether you're rehabbing an injury or chasing a PR, our team is ready to build your roadmap. Stop by or send us a message.
           </p>

           <div className="space-y-8">
             <div className="flex items-start space-x-6">
                <div className="bg-white/5 p-4 rounded border border-white/10">
                    <MapPin className="text-rise-lime w-6 h-6" />
                </div>
                <div>
                    <h4 className="text-white font-bold font-display uppercase tracking-wide mb-1">Visit HQ</h4>
                    <p className="text-gray-400 text-sm">200 Performance Dr.<br/>Austin, TX 78701</p>
                </div>
             </div>
             
             <div className="flex items-start space-x-6">
                <div className="bg-white/5 p-4 rounded border border-white/10">
                    <Clock className="text-rise-lime w-6 h-6" />
                </div>
                <div>
                    <h4 className="text-white font-bold font-display uppercase tracking-wide mb-1">Opening Hours</h4>
                    <p className="text-gray-400 text-sm">
                        Mon - Fri: 6:00 AM - 8:00 PM<br/>
                        Sat: 8:00 AM - 4:00 PM<br/>
                        Sun: Closed (Recovery Day)
                    </p>
                </div>
             </div>

             <div className="flex items-start space-x-6">
                <div className="bg-white/5 p-4 rounded border border-white/10">
                    <Phone className="text-rise-lime w-6 h-6" />
                </div>
                <div>
                    <h4 className="text-white font-bold font-display uppercase tracking-wide mb-1">Call Us</h4>
                    <p className="text-gray-400 text-sm">+1 (512) 555-0199<br/>Booking Support Available 24/7</p>
                </div>
             </div>

             <div className="flex items-start space-x-6">
                <div className="bg-white/5 p-4 rounded border border-white/10">
                    <Mail className="text-rise-lime w-6 h-6" />
                </div>
                <div>
                    <h4 className="text-white font-bold font-display uppercase tracking-wide mb-1">Email</h4>
                    <p className="text-gray-400 text-sm">hello@rise-pt.com<br/>careers@rise-pt.com</p>
                </div>
             </div>
           </div>
        </div>

        {/* Form */}
        <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-2xl">
            <h3 className="text-2xl font-display font-bold text-white uppercase mb-6">Patient Intake</h3>
            <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">First Name</label>
                        <input type="text" className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-rise-lime focus:outline-none transition-colors" placeholder="JANE" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Last Name</label>
                        <input type="text" className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-rise-lime focus:outline-none transition-colors" placeholder="DOE" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address</label>
                    <input type="email" className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-rise-lime focus:outline-none transition-colors" placeholder="JANE@EXAMPLE.COM" />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Primary Goal</label>
                    <select className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-rise-lime focus:outline-none transition-colors appearance-none">
                        <option>Injury Rehabilitation</option>
                        <option>Performance Training</option>
                        <option>General Maintenance</option>
                        <option>Other</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Message</label>
                    <textarea rows={4} className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-rise-lime focus:outline-none transition-colors" placeholder="Tell us about your injury or goals..."></textarea>
                </div>

                <button type="button" className="w-full bg-white text-rise-charcoal font-display font-bold uppercase tracking-widest py-4 hover:bg-rise-lime transition-colors flex items-center justify-center space-x-2">
                    <span>Submit Request</span>
                    <Send size={16} />
                </button>
            </form>
        </div>

      </div>
    </section>
  );
};

export default Contact;