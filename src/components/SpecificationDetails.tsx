import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PresentationControls } from '@react-three/drei';

// Car parts models using basic shapes
const EnginePart = () => {
  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1, 1, 1.5, 16]} />
        <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[2, 0.3, 1.5]} />
        <meshStandardMaterial color="#555" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.8]}>
        <cylinderGeometry args={[0.3, 0.3, 1.6, 16]} />
        <meshStandardMaterial color="#777" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0, -0.8]}>
        <cylinderGeometry args={[0.3, 0.3, 1.6, 16]} />
        <meshStandardMaterial color="#777" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
};

const WheelPart = () => {
  return (
    <group>
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1, 0.3, 16, 32]} />
        <meshStandardMaterial color="#111" metalness={0.5} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 0.5, 32]} />
        <meshStandardMaterial color="#777" metalness={0.8} roughness={0.1} />
      </mesh>
      {[...Array(5)].map((_, i) => (
        <mesh key={i} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, i * (Math.PI * 2) / 5]}>
          <boxGeometry args={[1.4, 0.15, 0.15]} />
          <meshStandardMaterial color="#444" metalness={0.7} roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
};

const BrakePart = () => {
  return (
    <group>
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 0.15, 32]} />
        <meshStandardMaterial color="#333" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.08]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 0.3, 32]} />
        <meshStandardMaterial color="#800" metalness={0.7} roughness={0.2} />
      </mesh>
      <mesh position={[0.7, 0, 0.2]}>
        <boxGeometry args={[0.4, 0.8, 0.3]} />
        <meshStandardMaterial color="#d00" metalness={0.6} roughness={0.3} />
      </mesh>
    </group>
  );
};

const SpecificationsDetail = () => {
  const [activePart, setActivePart] = useState('engine');

  const renderModel = () => {
    switch (activePart) {
      case 'engine':
        return <EnginePart />;
      case 'wheel':
        return <WheelPart />;
      case 'brake':
        return <BrakePart />;
      default:
        return <EnginePart />;
    }
  };

  return (
    <div className="py-16 bg-gradient-to-b from-gray-100 to-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <span className="text-porsche-red uppercase tracking-widest text-sm">Technical Excellence</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Explore Key Components</h2>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2 h-96">
            <Canvas shadows camera={{ position: [0, 0, 4], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <Suspense fallback={null}>
                <PresentationControls
                  global
                  zoom={0.8}
                  rotation={[0, -Math.PI / 4, 0]}
                  polar={[-Math.PI / 4, Math.PI / 4]}
                  azimuth={[-Math.PI / 4, Math.PI / 4]}>
                  {renderModel()}
                </PresentationControls>
                <Environment preset="city" />
              </Suspense>
              <OrbitControls 
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 2}
              />
            </Canvas>
          </div>
          
          <div className="lg:w-1/2">
            <div className="flex gap-4 mb-8">
              <button 
                onClick={() => setActivePart('engine')}
                className={`px-6 py-3 rounded-lg transition-all ${activePart === 'engine' ? 'bg-porsche-red text-white' : 'bg-gray-200 text-gray-700'}`}>
                Engine
              </button>
              <button 
                onClick={() => setActivePart('wheel')}
                className={`px-6 py-3 rounded-lg transition-all ${activePart === 'wheel' ? 'bg-porsche-red text-white' : 'bg-gray-200 text-gray-700'}`}>
                Wheels
              </button>
              <button 
                onClick={() => setActivePart('brake')}
                className={`px-6 py-3 rounded-lg transition-all ${activePart === 'brake' ? 'bg-porsche-red text-white' : 'bg-gray-200 text-gray-700'}`}>
                Brakes
              </button>
            </div>
            
            <div className="space-y-6">
              {activePart === 'engine' && (
                <div className="animate-fade-in">
                  <h3 className="text-2xl font-bold mb-4">4.0L Naturally Aspirated Flat-Six</h3>
                  <p className="text-gray-700 mb-4">
                    The heart of the GT3 RS is a masterpiece of engineering, delivering raw power and 
                    immediate response through its naturally aspirated design.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="w-4 h-4 bg-porsche-red rounded-full mr-2"></span>
                      <span>520 HP @ 8,400 RPM</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-4 h-4 bg-porsche-red rounded-full mr-2"></span>
                      <span>9,000 RPM redline</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-4 h-4 bg-porsche-red rounded-full mr-2"></span>
                      <span>346 lb-ft of torque</span>
                    </li>
                  </ul>
                </div>
              )}
              
              {activePart === 'wheel' && (
                <div className="animate-fade-in">
                  <h3 className="text-2xl font-bold mb-4">Ultra-Lightweight Magnesium Wheels</h3>
                  <p className="text-gray-700 mb-4">
                    Specially developed magnesium wheels reduce unsprung mass for improved handling and response.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="w-4 h-4 bg-porsche-red rounded-full mr-2"></span>
                      <span>20" front, 21" rear diameter</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-4 h-4 bg-porsche-red rounded-full mr-2"></span>
                      <span>Center-lock design</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-4 h-4 bg-porsche-red rounded-full mr-2"></span>
                      <span>Optional track-focused tires</span>
                    </li>
                  </ul>
                </div>
              )}
              
              {activePart === 'brake' && (
                <div className="animate-fade-in">
                  <h3 className="text-2xl font-bold mb-4">Porsche Ceramic Composite Brakes</h3>
                  <p className="text-gray-700 mb-4">
                    The ultimate in braking performance, PCCB delivers consistent stopping power even under 
                    extreme track conditions.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="w-4 h-4 bg-porsche-red rounded-full mr-2"></span>
                      <span>410mm front, 390mm rear carbon-ceramic discs</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-4 h-4 bg-porsche-red rounded-full mr-2"></span>
                      <span>6-piston front, 4-piston rear calipers</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-4 h-4 bg-porsche-red rounded-full mr-2"></span>
                      <span>Reduced fade under high temperatures</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecificationsDetail;
