
import { motion } from 'framer-motion';
import { Code, Palette, Zap, Globe, Award, Calendar } from 'lucide-react';

const skills = [
  { name: 'React/TypeScript', level: 95, icon: Code, color: '#00d4ff' },
  { name: 'Three.js/WebGL', level: 90, icon: Zap, color: '#8b5cf6' },
  { name: 'WebXR/AR Development', level: 85, icon: Globe, color: '#10b981' },
  { name: 'UI/UX Design', level: 80, icon: Palette, color: '#f59e0b' },
  { name: 'Performance Optimization', level: 88, icon: Award, color: '#ef4444' },
];

const timeline = [
  {
    year: '2024',
    title: 'Senior AR/VR Engineer',
    company: 'TechCorp',
    description: 'Leading WebXR development and immersive experience design'
  },
  {
    year: '2022',
    title: 'Frontend Developer',
    company: 'StartupXYZ',
    description: 'Specialized in React and 3D web applications'
  },
  {
    year: '2020',
    title: 'Web Developer',
    company: 'Creative Agency',
    description: 'Full-stack development and interactive web experiences'
  }
];

export default function About() {
  return (
    <div className="min-h-screen pt-16 bg-space-gradient">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">About Me</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Passionate AR/VR engineer crafting immersive digital experiences 
            that bridge the gap between imagination and reality
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Profile Section */}
          <motion.div
            className="glass-card p-8 rounded-xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">JD</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">John Doe</h2>
                <p className="text-neon-blue">AR/VR Engineer</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              With over 5 years of experience in cutting-edge web technologies, 
              I specialize in creating immersive AR/VR experiences that push the 
              boundaries of what's possible on the web. My passion lies in transforming 
              complex ideas into intuitive, interactive digital experiences.
            </p>
            
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-white/5 p-4 rounded-lg">
                <div className="text-2xl font-bold text-neon-blue">50+</div>
                <div className="text-gray-400 text-sm">Projects Completed</div>
              </div>
              <div className="bg-white/5 p-4 rounded-lg">
                <div className="text-2xl font-bold text-neon-green">5+</div>
                <div className="text-gray-400 text-sm">Years Experience</div>
              </div>
            </div>
          </motion.div>

          {/* Skills Section */}
          <motion.div
            className="glass-card p-8 rounded-xl"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
              <Zap className="text-neon-blue" />
              <span>Technical Skills</span>
            </h3>
            
            <div className="space-y-6">
              {skills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Icon size={18} style={{ color: skill.color }} />
                        <span className="text-white font-medium">{skill.name}</span>
                      </div>
                      <span className="text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <motion.div
                        className="h-2 rounded-full"
                        style={{ backgroundColor: skill.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Experience Timeline */}
        <motion.div
          className="glass-card p-8 rounded-xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center space-x-2">
            <Calendar className="text-neon-blue" />
            <span>Professional Journey</span>
          </h3>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-neon-blue via-neon-purple to-neon-green" />
            
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  className="relative flex items-start space-x-6"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                >
                  {/* Timeline Dot */}
                  <div className="relative z-10 w-4 h-4 bg-neon-blue rounded-full border-4 border-space-dark" />
                  
                  {/* Content */}
                  <div className="flex-1 bg-white/5 p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xl font-semibold text-white">{item.title}</h4>
                      <span className="bg-neon-blue/20 text-neon-blue px-3 py-1 rounded-full text-sm">
                        {item.year}
                      </span>
                    </div>
                    <p className="text-neon-blue font-medium mb-2">{item.company}</p>
                    <p className="text-gray-300">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
