
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Globe, Layers } from 'lucide-react';

interface HomeProps {
  setActiveTab: (tab: string) => void;
}

export default function Home({ setActiveTab }: HomeProps) {
  const features = [
    {
      icon: Globe,
      title: 'WebXR Ready',
      description: 'Experience portfolio projects in immersive AR'
    },
    {
      icon: Layers,
      title: '3D Interactive',
      description: 'Manipulate and explore 3D models in real-time'
    },
    {
      icon: Zap,
      title: 'Performance Optimized',
      description: 'Smooth 60fps rendering across all devices'
    }
  ];

  return (
    <div className="min-h-screen pt-16 bg-space-gradient relative overflow-hidden">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gradient">AR Portfolio</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Experience the future of portfolio presentation through immersive 
            Augmented Reality and interactive 3D visualizations
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button 
              onClick={() => setActiveTab('portfolio')}
              className="bg-neon-blue hover:bg-neon-blue/80 text-space-dark px-8 py-4 rounded-lg font-semibold flex items-center space-x-2 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,212,255,0.5)]"
            >
              <span>Explore Portfolio</span>
              <ArrowRight size={20} />
            </button>
            
            <button 
              onClick={() => setActiveTab('ar-viewer')}
              className="glass-card neon-border px-8 py-4 rounded-lg font-semibold text-neon-blue hover:bg-neon-blue/10 transition-all duration-300 hover:scale-105"
            >
              Enter AR Experience
            </button>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className="glass-card p-6 text-center hover:scale-105 transition-transform duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                whileHover={{ y: -10 }}
              >
                <div className="bg-neon-blue/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-neon-blue" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 animate-float">
        <div className="w-4 h-4 bg-neon-purple/50 rounded-full animate-glow"></div>
      </div>
      <div className="absolute top-1/3 right-20 animate-float" style={{ animationDelay: '1s' }}>
        <div className="w-6 h-6 bg-neon-green/50 rounded-full animate-glow"></div>
      </div>
      <div className="absolute bottom-1/4 left-1/4 animate-float" style={{ animationDelay: '2s' }}>
        <div className="w-3 h-3 bg-neon-blue/50 rounded-full animate-glow"></div>
      </div>
    </div>
  );
}
