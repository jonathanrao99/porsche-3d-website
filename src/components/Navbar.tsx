
import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={cn(
      "py-4 px-6 md:px-12 w-full transition-all duration-300",
      scrolled ? "sticky-nav" : "absolute bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Porsche_911_GT3.svg/2048px-Porsche_911_GT3.svg.png" 
            alt="Porsche Logo" 
            className="h-10 mr-2"
          />
          <span className={cn(
            "font-bold text-lg tracking-tight transition-colors",
            scrolled ? "text-porsche-black" : "text-white"
          )}>
            911 GT3 RS
          </span>
        </div>
        
        <div className={cn(
          "hidden md:flex space-x-8 font-medium",
          scrolled ? "text-porsche-gray" : "text-white"
        )}>
          <a href="#specs" className="transition-colors hover:text-porsche-red">Specifications</a>
          <a href="#design" className="transition-colors hover:text-porsche-red">Design</a>
          <a href="#experience" className="transition-colors hover:text-porsche-red">Experience</a>
          <a href="#contact" className="transition-colors hover:text-porsche-red">Contact</a>
        </div>
        
        <button className={cn(
          "hidden md:block px-6 py-2 rounded-full font-medium transition-all",
          "bg-porsche-red text-white hover:bg-red-700 hover:shadow-md"
        )}>
          Configure
        </button>
        
        <button className="md:hidden text-porsche-red">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
