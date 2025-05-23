
import { motion } from 'framer-motion';
import { Home, Folder, Camera } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const tabs = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'portfolio', label: 'Portfolio', icon: Folder },
  { id: 'ar-viewer', label: 'AR Viewer', icon: Camera },
];

export default function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-space-dark/80 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <motion.div 
            className="text-xl font-bold text-gradient"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            AR Portfolio
          </motion.div>
          
          <div className="flex space-x-1">
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 ${
                    isActive 
                      ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/30' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={18} />
                  <span className="hidden md:inline">{tab.label}</span>
                  
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 bg-neon-blue/10 rounded-lg -z-10"
                      layoutId="activeTab"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
