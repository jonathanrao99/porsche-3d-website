
import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, Environment } from '@react-three/drei';
import Car3DModel from './Car3DModel';

const colorOptions = [
  { name: 'GT Silver Metallic', hex: '#BFBFBF', id: 'silver' },
  { name: 'Guards Red', hex: '#A52A2A', id: 'red' },
  { name: 'Racing Yellow', hex: '#FFD700', id: 'yellow' },
  { name: 'Shark Blue', hex: '#0077B6', id: 'blue' },
  { name: 'Carmine Red', hex: '#960018', id: 'carmine' },
];

const CarConfigurator = () => {
  const [activeColor, setActiveColor] = useState(colorOptions[0]);

  return (
    <section className="py-24 px-6 md:px-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-porsche-red uppercase tracking-widest text-sm">Make It Yours</span>
          <h2 className="text-4xl font-bold mt-2 mb-4">Configure Your GT3 RS</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore different exterior colors and visualize your perfect Porsche 911 GT3 RS.
          </p>
        </div>
        
        <div className="h-[500px] mb-12 bg-gradient-to-b from-white to-gray-100 rounded-xl overflow-hidden shadow-lg">
          <Canvas shadows>
            <Suspense fallback={null}>
              <Stage environment="city" intensity={0.5}>
                <Car3DModel 
                  rotationSpeed={0.005} 
                  color={activeColor.hex} 
                  position={[0, 0, 0]}
                  scale={[1, 1, 1]}
                />
              </Stage>
              <Environment preset="city" />
            </Suspense>
            <OrbitControls
              autoRotate
              autoRotateSpeed={0.5}
              enableZoom={true}
              enablePan={false}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI / 2}
            />
          </Canvas>
        </div>
        
        <div className="flex justify-center gap-6 flex-wrap">
          {colorOptions.map((color) => (
            <button
              key={color.id}
              onClick={() => setActiveColor(color)}
              className="flex flex-col items-center transition-all hover:scale-105 group"
            >
              <div 
                className={`w-16 h-16 rounded-full mb-2 border-2 ${activeColor.id === color.id ? 'border-porsche-red' : 'border-transparent'} transition-all duration-300 hover:shadow-md`}
                style={{ backgroundColor: color.hex }}
              />
              <span className={`text-sm transition-all duration-300 ${activeColor.id === color.id ? 'font-bold' : ''}`}>
                {color.name}
              </span>
            </button>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <button className="px-8 py-3 bg-porsche-red text-white rounded-full font-medium hover:bg-red-700 transition-colors">
            Save Configuration
          </button>
        </div>
      </div>
    </section>
  );
};

export default CarConfigurator;
