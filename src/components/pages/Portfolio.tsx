
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Eye, Filter, X } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  image: string;
  detailedDescription: string;
  features: string[];
  hasARModel: boolean;
}

interface PortfolioProps {
  setActiveTab: (tab: string) => void;
  setSelectedProject?: (project: Project) => void;
}

const projects: Project[] = [
  {
    id: '1',
    title: 'Interactive 3D Visualization',
    description: 'Real-time data visualization using Three.js and WebGL',
    category: 'Web Development',
    technologies: ['React', 'Three.js', 'WebGL', 'TypeScript'],
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop',
    detailedDescription: 'A comprehensive 3D data visualization platform that renders complex datasets in real-time using cutting-edge WebGL technology.',
    features: ['Real-time rendering', 'Interactive controls', 'Data streaming', 'Mobile responsive'],
    hasARModel: true
  },
  {
    id: '2',
    title: 'AR Product Showcase',
    description: 'Augmented reality product visualization for e-commerce',
    category: 'AR/VR',
    technologies: ['WebXR', 'A-Frame', 'JavaScript', 'glTF'],
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop',
    detailedDescription: 'Revolutionary AR shopping experience allowing customers to visualize products in their own space before purchasing.',
    features: ['WebXR integration', 'Model optimization', 'Cross-platform support', 'Real-time lighting'],
    hasARModel: true
  },
  {
    id: '3',
    title: 'AR/VR Neural Network Dashboard',
    description: 'Immersive 3D neural network visualization with real-time data analytics',
    category: 'AR/VR',
    technologies: ['React', 'Three.js', 'WebXR', 'TensorFlow.js'],
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=400&fit=crop',
    detailedDescription: 'Advanced AR/VR dashboard that visualizes neural networks in 3D space, allowing users to interact with machine learning models and see data flow in real-time.',
    features: ['3D Neural Network Visualization', 'Real-time data flow', 'Interactive node exploration', 'AR/VR compatibility'],
    hasARModel: true
  },
  {
    id: '4',
    title: 'Mobile AR Game',
    description: 'Location-based augmented reality mobile gaming experience',
    category: 'AR/VR',
    technologies: ['Unity', 'ARCore', 'ARKit', 'C#'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    detailedDescription: 'Immersive location-based AR game that transforms real-world environments into interactive gaming experiences.',
    features: ['GPS integration', 'Social features', 'Achievement system', 'Cloud synchronization'],
    hasARModel: true
  }
];

const categories = ['All', 'Web Development', 'AR/VR', 'Data Science'];

export default function Portfolio({ setActiveTab, setSelectedProject }: PortfolioProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProjectLocal] = useState<Project | null>(null);

  const filteredProjects = projects.filter(project => 
    selectedCategory === 'All' || project.category === selectedCategory
  );

  const openARViewer = (project: Project) => {
    if (setSelectedProject) {
      setSelectedProject(project);
    }
    setActiveTab('ar-viewer');
  };

  return (
    <div className="min-h-screen pt-16 bg-space-gradient">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            <span className="text-gradient">Project Gallery</span>
          </h1>
          <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
            Explore my latest projects featuring cutting-edge AR/VR technology and interactive experiences
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full transition-all duration-300 flex items-center space-x-2 ${
                selectedCategory === category
                  ? 'bg-neon-blue text-space-dark'
                  : 'glass-card text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Filter size={16} />
              <span>{category}</span>
            </button>
          ))}
        </motion.div>

        {/* Project Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="glass-card rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                layout
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-space-dark/80 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <span className="bg-neon-blue/20 text-neon-blue px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                      {project.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4 line-clamp-2">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span 
                        key={tech}
                        className="bg-white/10 text-gray-300 px-2 py-1 rounded text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-gray-500 text-sm">+{project.technologies.length - 3} more</span>
                    )}
                  </div>
                  
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setSelectedProjectLocal(project)}
                      className="flex-1 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2"
                    >
                      <Eye size={16} />
                      <span>Details</span>
                    </button>
                    
                    {project.hasARModel && (
                      <button 
                        onClick={() => openARViewer(project)}
                        className="bg-neon-blue hover:bg-neon-blue/80 text-space-dark px-4 py-2 rounded-lg transition-colors duration-300 font-semibold"
                      >
                        View AR
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProjectLocal(null)}
          >
            <motion.div
              className="glass-card rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() => setSelectedProjectLocal(null)}
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-300"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-8">
                <h2 className="text-3xl font-bold text-white mb-4">{selectedProject.title}</h2>
                <p className="text-gray-300 mb-6">{selectedProject.detailedDescription}</p>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <span 
                          key={tech}
                          className="bg-neon-blue/20 text-neon-blue px-3 py-1 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Key Features</h3>
                    <ul className="space-y-2">
                      {selectedProject.features.map((feature, index) => (
                        <li key={index} className="text-gray-300 flex items-center space-x-2">
                          <div className="w-2 h-2 bg-neon-green rounded-full" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="flex gap-4 mt-8">
                  <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-colors duration-300 flex items-center space-x-2">
                    <ExternalLink size={16} />
                    <span>Live Demo</span>
                  </button>
                  
                  {selectedProject.hasARModel && (
                    <button 
                      onClick={() => openARViewer(selectedProject)}
                      className="bg-neon-blue hover:bg-neon-blue/80 text-space-dark px-6 py-3 rounded-lg transition-colors duration-300 font-semibold"
                    >
                      Experience in AR
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
