
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, Github, Linkedin, Download, Send } from 'lucide-react';

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    setIsSubmitted(true);
    reset();
    
    // Reset success message after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'john.doe@example.com',
      href: 'mailto:john.doe@example.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'San Francisco, CA',
      href: '#'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com',
      color: '#333'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com',
      color: '#0077b5'
    }
  ];

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
            <span className="text-gradient">Get In Touch</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Ready to bring your AR/VR vision to life? Let's collaborate on 
            creating extraordinary digital experiences together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-card p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <motion.a
                      key={index}
                      href={info.href}
                      className="flex items-center space-x-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300 group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    >
                      <div className="bg-neon-blue/20 p-3 rounded-lg group-hover:bg-neon-blue/30 transition-colors">
                        <Icon className="text-neon-blue" size={20} />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">{info.label}</p>
                        <p className="text-white font-medium">{info.value}</p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Social Links */}
            <motion.div
              className="glass-card p-8 rounded-xl"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-xl font-bold text-white mb-6">Connect With Me</h3>
              
              <div className="flex space-x-4 mb-6">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/10 hover:bg-white/20 p-4 rounded-lg transition-colors duration-300 group"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="text-white group-hover:text-neon-blue transition-colors" size={24} />
                    </motion.a>
                  );
                })}
              </div>
              
              <button className="w-full bg-neon-green hover:bg-neon-green/80 text-space-dark font-semibold px-6 py-3 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2">
                <Download size={20} />
                <span>Download CV</span>
              </button>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="glass-card p-8 rounded-xl"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Send Message</h2>
            
            {isSubmitted ? (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-neon-green/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="text-neon-green" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
                <p className="text-gray-300">Thank you for reaching out. I'll get back to you soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Name</label>
                    <input
                      type="text"
                      {...register('name', { required: 'Name is required' })}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-neon-blue focus:outline-none transition-colors"
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-white font-medium mb-2">Email</label>
                    <input
                      type="email"
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-neon-blue focus:outline-none transition-colors"
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-white font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    {...register('subject', { required: 'Subject is required' })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-neon-blue focus:outline-none transition-colors"
                    placeholder="Project inquiry, collaboration, etc."
                  />
                  {errors.subject && (
                    <p className="text-red-400 text-sm mt-1">{errors.subject.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-white font-medium mb-2">Message</label>
                  <textarea
                    rows={5}
                    {...register('message', { required: 'Message is required' })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-neon-blue focus:outline-none transition-colors resize-none"
                    placeholder="Tell me about your project or ideas..."
                  />
                  {errors.message && (
                    <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>
                
                <motion.button
                  type="submit"
                  className="w-full bg-neon-blue hover:bg-neon-blue/80 text-space-dark font-semibold px-6 py-4 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send size={20} />
                  <span>Send Message</span>
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
