
import { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, SpotLight } from '@react-three/drei';
import { cn } from "@/lib/utils";
import Car3DModel from './Car3DModel';

const Hero3D = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Set a timeout to simulate loading and ensure UI transitions smoothly
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="relative h-screen w-full overflow-hidden bg-porsche-black">
      {/* Background effect */}
      <div className="absolute inset-0 bg-hero-pattern z-0"></div>
      
      {/* 3D Scene Container */}
      <div className="relative w-full h-full">
        <div 
          className={cn(
            "relative w-full h-full",
            isLoaded ? "opacity-100" : "opacity-0",
            "transition-opacity duration-1000"
          )}
        >
          <Canvas shadows dpr={[1, 2]}>
            <fog attach="fog" args={['#000', 5, 15]} />
            <ambientLight intensity={0.5} />
            <SpotLight 
              position={[10, 10, 10]} 
              angle={0.3} 
              penumbra={1} 
              intensity={1} 
              castShadow 
              shadow-mapSize={[2048, 2048]} 
            />
            <Suspense fallback={null}>
              <Car3DModel 
                position={[0, -1, 0]} 
                color="#FF0000" 
                rotationSpeed={0.005} 
                scale={[1, 1, 1]}
              />
              <Environment preset="city" />
            </Suspense>
            <OrbitControls 
              autoRotate
              autoRotateSpeed={0.5}
              enableZoom={false}
              enablePan={false}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / 2}
            />
            <PerspectiveCamera position={[0, 2, 5]} fov={50} makeDefault />
          </Canvas>
        </div>
        
        {/* Loading state */}
        {!isLoaded && (
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
            <svg className="animate-spin h-10 w-10 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-lg font-light">Loading 3D Experience</p>
          </div>
        )}
      </div>
      
      {/* Heading text */}
      <div className="absolute top-1/2 left-12 transform -translate-y-1/2 z-10 max-w-xl text-white animate-fade-in">
        <span className="inline-block text-sm uppercase tracking-widest mb-2 text-porsche-red">The Ultimate Expression</span>
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Porsche 911 GT3 RS</h1>
        <p className="text-lg md:text-xl opacity-80 mb-8">Motorsport expertise embodied in a road-legal masterpiece, combining precision engineering with uncompromising performance.</p>
        <div className="flex space-x-4">
          <button className="px-8 py-3 bg-porsche-red text-white rounded-full font-medium hover:bg-red-700 transition-colors">
            Explore
          </button>
          <button className="px-8 py-3 border border-white/30 text-white rounded-full font-medium hover:bg-white/10 transition-colors">
            Specifications
          </button>
        </div>
      </div>
      
      {/* Scroll prompt */}
      <div className="scroll-prompt text-white">
        <p className="text-sm mb-2 opacity-70">Scroll to explore</p>
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
};

export default Hero3D;
