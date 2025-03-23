
import { useState, useRef, useEffect } from 'react';
import { cn } from "@/lib/utils";

const galleryItems = [
  {
    id: 1,
    title: "Aerodynamic Precision",
    description: "The adjustable rear wing and extensive use of vents optimize downforce and cooling.",
    image: "https://www.stuttcars.com/wp-content/uploads/2022/08/2023-porsche-911-gt3-rs-2-2048x1365.jpg"
  },
  {
    id: 2,
    title: "Carbon Fiber Components",
    description: "Lightweight carbon fiber elements reduce weight and enhance performance.",
    image: "https://www.stuttcars.com/wp-content/uploads/2022/08/2023-porsche-911-gt3-rs-5-2048x1365.jpg"
  },
  {
    id: 3,
    title: "Race-Inspired Cockpit",
    description: "The interior is focused on performance with racing seats and minimal distractions.",
    image: "https://www.stuttcars.com/wp-content/uploads/2022/08/2023-porsche-911-gt3-rs-7-2048x1365.jpg"
  },
  {
    id: 4,
    title: "Performance Wheels",
    description: "Forged lightweight wheels with center-lock design optimize handling.",
    image: "https://www.stuttcars.com/wp-content/uploads/2022/08/2023-porsche-911-gt3-rs-4-2048x1365.jpg"
  }
];

const DesignGallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % galleryItems.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="design" 
      ref={sectionRef}
      className="py-24 px-6 md:px-12 bg-porsche-black text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="uppercase tracking-widest text-sm text-porsche-red">Design Philosophy</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2">Form Follows Function</h2>
          <div className="h-1 w-20 bg-porsche-red mt-4"></div>
          <p className="text-lg opacity-80 mt-6 max-w-2xl">
            Every curve, vent, and surface of the 911 GT3 RS is meticulously crafted to optimize 
            aerodynamic performance while maintaining the iconic Porsche design language.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="relative overflow-hidden rounded-lg shadow-2xl h-[500px]">
              {galleryItems.map((item, index) => (
                <div 
                  key={item.id}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-1000",
                    index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                  )}
                >
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-2xl font-bold">{item.title}</h3>
                    <p className="text-white/80 mt-2">{item.description}</p>
                  </div>
                </div>
              ))}
              
              {/* Navigation dots */}
              <div className="absolute bottom-6 right-6 flex space-x-2 z-20">
                {galleryItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={cn(
                      "w-3 h-3 rounded-full transition-all duration-300",
                      index === activeIndex 
                        ? "bg-porsche-red w-6" 
                        : "bg-white/40 hover:bg-white/60"
                    )}
                    aria-label={`View image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/3">
            <div 
              className={cn(
                "h-full flex flex-col justify-center",
                "transform transition-all duration-1000 delay-300",
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
              )}
            >
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-4">Aerodynamic Excellence</h3>
                <p className="opacity-80">
                  With a focus on maximizing downforce, the GT3 RS features a massive adjustable rear wing, 
                  front diffuser, and side skirts that work in harmony to keep the car planted at high speeds.
                </p>
              </div>
              
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-4">Lightweight Construction</h3>
                <p className="opacity-80">
                  Carbon fiber components and a strategic weight-saving approach ensure that 
                  every gram serves a purpose, optimizing the power-to-weight ratio for exceptional performance.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold mb-4">Driver-Focused Interior</h3>
                <p className="opacity-80">
                  The cockpit is designed around the driver, with racing seats, a GT3 RS-specific steering wheel, 
                  and minimalist approach that eliminates distractions while providing all essential information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesignGallery;
