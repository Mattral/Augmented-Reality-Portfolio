
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '../components/Navigation';
import ParticleBackground from '../components/ParticleBackground';
import Home from '../components/pages/Home';
import Portfolio from '../components/pages/Portfolio';
import ARViewer from '../components/pages/ARViewer';

export default function Index() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
        return <Home setActiveTab={setActiveTab} />;
      case 'portfolio':
        return <Portfolio setActiveTab={setActiveTab} setSelectedProject={setSelectedProject} />;
      case 'ar-viewer':
        return <ARViewer />;
      default:
        return <Home setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-space-dark text-white relative overflow-hidden">
      <ParticleBackground />
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderActiveTab()}
        </motion.div>
      </AnimatePresence>
      
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -2 }}>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neon-green/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>
    </div>
  );
}
