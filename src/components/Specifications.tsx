
import { useState, useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";

const specs = [
  { 
    title: "Engine", 
    value: "4.0L Naturally Aspirated Flat-Six", 
    icon: "M5 22h14", 
    description: "The GT3 RS's high-revving naturally aspirated engine delivers immediate throttle response and a thrilling soundtrack."
  },
  { 
    title: "Power", 
    value: "518 HP @ 8,500 RPM", 
    icon: "M13 2L3 14h9l-1 8 10-16h-9l1-4z", 
    description: "Maximum power is achieved at an exhilarating 8,500 RPM, with the redline at 9,000 RPM."
  },
  { 
    title: "0-60 MPH", 
    value: "3.0 seconds", 
    icon: "M5 9v6m14-6v6M5 3a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H5z", 
    description: "Launching from 0 to 60 mph in just 3.0 seconds, the GT3 RS delivers blistering acceleration."
  },
  { 
    title: "Top Speed", 
    value: "184 MPH", 
    icon: "M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0", 
    description: "The focus on downforce and track performance results in a top speed of 184 mph."
  },
  { 
    title: "Transmission", 
    value: "7-Speed PDK", 
    icon: "M12 6v4m0 2v4m-6-6h12", 
    description: "Porsche's lightning-fast 7-speed PDK transmission delivers seamless gear changes."
  },
  { 
    title: "Weight", 
    value: "3,225 lbs (1,450 kg)", 
    icon: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3", 
    description: "Extensive use of lightweight materials makes the GT3 RS a light and nimble track weapon."
  },
];

const Specifications = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const showItemsWithDelay = () => {
            specs.forEach((_, index) => {
              setTimeout(() => {
                setVisibleItems(prev => [...prev, index]);
              }, index * 150);
            });
          };
          showItemsWithDelay();
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
  
  return (
    <section id="specs" ref={sectionRef} className="py-24 px-6 md:px-12 bg-porsche-lightgray">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <span className="uppercase tracking-widest text-sm text-porsche-red">Performance Redefined</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2">Technical Specifications</h2>
          <div className="h-1 w-20 bg-porsche-red mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specs.map((spec, index) => (
            <div 
              key={spec.title}
              className={cn(
                "spec-card bg-white shadow rounded-lg",
                "transform transition-all duration-500 ease-out",
                visibleItems.includes(index) 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-16"
              )}
            >
              <div className="flex items-start">
                <div className="mr-4 p-3 bg-porsche-red text-white rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={spec.icon} />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-porsche-gray">{spec.title}</h3>
                  <p className="text-2xl font-bold text-porsche-black mt-1">{spec.value}</p>
                  <p className="text-sm text-gray-500 mt-2">{spec.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-lg text-porsche-gray mb-6">Experience the precision engineering of the 911 GT3 RS, where every component is optimized for maximum performance.</p>
          <button className="px-8 py-3 bg-porsche-black text-white rounded-full font-medium hover:bg-porsche-gray transition-colors">
            Full Technical Details
          </button>
        </div>
      </div>
    </section>
  );
};

export default Specifications;
