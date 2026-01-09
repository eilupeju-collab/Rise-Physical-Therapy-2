import React, { useState, useEffect } from 'react';
import { Menu, X, Activity } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-rise-dark/95 backdrop-blur-md shadow-lg border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2 group cursor-pointer">
          <Activity className="h-8 w-8 text-rise-lime group-hover:rotate-12 transition-transform duration-300" />
          <span className="text-3xl font-display font-bold tracking-tighter text-white">
            RISE<span className="text-rise-lime">.</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-10 font-display uppercase tracking-widest text-sm font-medium">
          <a href="#" className="hover:text-rise-lime transition-colors">Our Method</a>
          <a href="#" className="hover:text-rise-lime transition-colors">Team</a>
          <a href="#" className="hover:text-rise-lime transition-colors">Performance</a>
          <button className="border-2 border-rise-lime text-rise-lime px-6 py-2 hover:bg-rise-lime hover:text-rise-charcoal transition-all duration-300 font-bold skew-x-[-10deg]">
            <span className="skew-x-[10deg] inline-block">Book Now</span>
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white hover:text-rise-lime">
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-rise-charcoal border-b border-white/10 py-6 px-6 flex flex-col space-y-6 font-display uppercase tracking-widest">
          <a href="#" className="text-white hover:text-rise-lime">Our Method</a>
          <a href="#" className="text-white hover:text-rise-lime">Team</a>
          <a href="#" className="text-white hover:text-rise-lime">Performance</a>
          <button className="w-full bg-rise-lime text-rise-charcoal py-3 font-bold">
            Book Evaluation
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;