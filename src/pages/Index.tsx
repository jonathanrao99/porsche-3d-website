
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero3D from '../components/Hero3D';
import Specifications from '../components/Specifications';
import DesignGallery from '../components/DesignGallery';
import Footer from '../components/Footer';

const Index = () => {
  useEffect(() => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href') || '');
        if (target) {
          window.scrollTo({
            top: target.getBoundingClientRect().top + window.scrollY - 80,
            behavior: 'smooth'
          });
        }
      });
    });
    
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', function (e) {});
      });
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero3D />
      <Specifications />
      <DesignGallery />
      <section id="experience" className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <span className="uppercase tracking-widest text-sm text-porsche-red">Driving Perfection</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-8">Experience The GT3 RS</h2>
          
          <div className="relative rounded-xl overflow-hidden h-[600px] shadow-2xl">
            <div className="absolute inset-0 bg-porsche-black/50 flex items-center justify-center z-10">
              <button className="w-24 h-24 bg-porsche-red rounded-full flex items-center justify-center hover:bg-red-700 transition-all hover:scale-105">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
            <img 
              src="https://cdn.motor1.com/images/mgl/NGRwVe/s3/porsche-911-gt3-rs-2022.jpg" 
              alt="Porsche GT3 RS on track" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <p className="text-xl mt-8 max-w-3xl mx-auto text-porsche-gray">
            Every aspect of the 911 GT3 RS is designed to deliver an unparalleled driving experience, 
            blending raw power with precision handling to create a car that excels both on the track 
            and on the road.
          </p>
          
          <div className="mt-12 flex flex-wrap justify-center gap-6">
            <button className="px-8 py-3 bg-porsche-red text-white rounded-full font-medium hover:bg-red-700 transition-colors">
              Book a Test Drive
            </button>
            <button className="px-8 py-3 border border-porsche-gray text-porsche-gray rounded-full font-medium hover:bg-porsche-lightgray transition-colors">
              Download Brochure
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Index;
