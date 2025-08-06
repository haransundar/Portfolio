import React, { useState } from 'react';
import { 
  SiPython, SiC, SiTensorflow, SiMysql, SiCanva, SiFigma,
  SiReact, SiJavascript, SiHtml5, SiCss3, SiNodedotjs, SiGit, SiGithub,
  SiGoogle, SiOpenai, SiN8N, SiChatbot, SiTypescript, SiCplusplus
} from 'react-icons/si';

// Official technology icons with authentic colors and 3D-like effects
const techIcons = {
  // Programming Languages
  'Python': { 
    icon: <SiPython />, 
    color: '#3776AB',
    gradient: 'from-blue-600 to-blue-700',
    shadow: 'shadow-blue-500/50'
  },
  'Java': { 
    icon: <SiJavascript />, 
    color: '#ED8B00',
    gradient: 'from-yellow-500 to-orange-600',
    shadow: 'shadow-yellow-500/50'
  },
  'C': { 
    icon: <SiC />, 
    color: '#A8B9CC',
    gradient: 'from-gray-400 to-gray-500',
    shadow: 'shadow-gray-500/50'
  },
  'C++': { 
    icon: <SiCplusplus />, 
    color: '#00599C',
    gradient: 'from-blue-600 to-blue-700',
    shadow: 'shadow-blue-500/50'
  },
  'JavaScript': { 
    icon: <SiJavascript />, 
    color: '#F7DF1E',
    gradient: 'from-yellow-400 to-yellow-500',
    shadow: 'shadow-yellow-400/50'
  },
  'TypeScript': { 
    icon: <SiTypescript />, 
    color: '#3178C6',
    gradient: 'from-blue-500 to-blue-600',
    shadow: 'shadow-blue-500/50'
  },
  
  // AI/ML Frameworks
  'YOLO': { 
    icon: <SiReact />, 
    color: '#00FF00',
    gradient: 'from-green-500 to-green-600',
    shadow: 'shadow-green-500/50'
  },
  'Tensorflow': { 
    icon: <SiTensorflow />, 
    color: '#FF6F00',
    gradient: 'from-orange-500 to-orange-600',
    shadow: 'shadow-orange-500/50'
  },
  'PyTorch': { 
    icon: <SiReact />, 
    color: '#EE4C2C',
    gradient: 'from-red-500 to-red-600',
    shadow: 'shadow-red-500/50'
  },
  'Machine Learning': { 
    icon: <SiReact />, 
    color: '#FF6F00',
    gradient: 'from-orange-500 to-orange-600',
    shadow: 'shadow-orange-500/50'
  },
  'AI': { 
    icon: <SiReact />, 
    color: '#8B5CF6',
    gradient: 'from-purple-500 to-purple-600',
    shadow: 'shadow-purple-500/50'
  },
  'Data Science': { 
    icon: <SiReact />, 
    color: '#10B981',
    gradient: 'from-green-500 to-green-600',
    shadow: 'shadow-green-500/50'
  },
  
  // AI Tools
  'CrewAI': { 
    icon: <SiReact />, 
    color: '#8B5CF6',
    gradient: 'from-purple-500 to-purple-600',
    shadow: 'shadow-purple-500/50'
  },
  'n8n': { 
    icon: <SiN8N />, 
    color: '#0066FF',
    gradient: 'from-blue-500 to-blue-600',
    shadow: 'shadow-blue-500/50'
  },
  'N8N': { 
    icon: <SiN8N />, 
    color: '#0066FF',
    gradient: 'from-blue-500 to-blue-600',
    shadow: 'shadow-blue-500/50'
  },
  'Langflow': { 
    icon: <SiReact />, 
    color: '#6366F1',
    gradient: 'from-indigo-500 to-indigo-600',
    shadow: 'shadow-indigo-500/50'
  },
  
  // Cloud & Database
  'SQL': { 
    icon: <SiMysql />, 
    color: '#4479A1',
    gradient: 'from-blue-600 to-blue-700',
    shadow: 'shadow-blue-500/50'
  },
  'AWS Cloud': { 
    icon: <SiReact />, 
    color: '#FF9900',
    gradient: 'from-orange-500 to-orange-600',
    shadow: 'shadow-orange-500/50'
  },
  'Google Cloud': { 
    icon: <SiGoogle />, 
    color: '#4285F4',
    gradient: 'from-blue-500 to-blue-600',
    shadow: 'shadow-blue-500/50'
  },
  'Vertex AI': { 
    icon: <SiGoogle />, 
    color: '#4285F4',
    gradient: 'from-blue-500 to-blue-600',
    shadow: 'shadow-blue-500/50'
  },
  
  // Design Tools
  'Canva': { 
    icon: <SiCanva />, 
    color: '#00C4CC',
    gradient: 'from-cyan-500 to-cyan-600',
    shadow: 'shadow-cyan-500/50'
  },
  'Figma': { 
    icon: <SiFigma />, 
    color: '#F24E1E',
    gradient: 'from-orange-500 to-orange-600',
    shadow: 'shadow-orange-500/50'
  },
  
  // Frontend
  'Frontend Technologies': { 
    icon: <SiReact />, 
    color: '#61DAFB',
    gradient: 'from-cyan-400 to-cyan-500',
    shadow: 'shadow-cyan-400/50'
  },
  'HTML': { 
    icon: <SiHtml5 />, 
    color: '#E34F26',
    gradient: 'from-orange-500 to-orange-600',
    shadow: 'shadow-orange-500/50'
  },
  'CSS': { 
    icon: <SiCss3 />, 
    color: '#1572B6',
    gradient: 'from-blue-500 to-blue-600',
    shadow: 'shadow-blue-500/50'
  },
  'HTML5': { 
    icon: <SiHtml5 />, 
    color: '#E34F26',
    gradient: 'from-orange-500 to-orange-600',
    shadow: 'shadow-orange-500/50'
  },
  'CSS3': { 
    icon: <SiCss3 />, 
    color: '#1572B6',
    gradient: 'from-blue-500 to-blue-600',
    shadow: 'shadow-blue-500/50'
  },
  'Web Development': { 
    icon: <SiReact />, 
    color: '#61DAFB',
    gradient: 'from-cyan-400 to-cyan-500',
    shadow: 'shadow-cyan-400/50'
  },
  'Full Stack': { 
    icon: <SiReact />, 
    color: '#61DAFB',
    gradient: 'from-cyan-400 to-cyan-500',
    shadow: 'shadow-cyan-400/50'
  },
  
  // Game Development
  'Game Development': { 
    icon: <SiReact />, 
    color: '#FF6B6B',
    gradient: 'from-red-400 to-red-500',
    shadow: 'shadow-red-400/50'
  },
  
  // Mobile Development
  'Android Development': { 
    icon: <SiReact />, 
    color: '#3DDC84',
    gradient: 'from-green-400 to-green-500',
    shadow: 'shadow-green-400/50'
  },
  'Mobile Development': { 
    icon: <SiReact />, 
    color: '#3DDC84',
    gradient: 'from-green-400 to-green-500',
    shadow: 'shadow-green-400/50'
  },
  'Google APIs': { 
    icon: <SiGoogle />, 
    color: '#4285F4',
    gradient: 'from-blue-500 to-blue-600',
    shadow: 'shadow-blue-500/50'
  },
  
  // IoT & Hardware
  'IoT': { 
    icon: <SiReact />, 
    color: '#FF6B35',
    gradient: 'from-orange-500 to-orange-600',
    shadow: 'shadow-orange-500/50'
  },
  'Embedded Systems': { 
    icon: <SiReact />, 
    color: '#4A90E2',
    gradient: 'from-blue-400 to-blue-500',
    shadow: 'shadow-blue-400/50'
  },
  'Hardware': { 
    icon: <SiReact />, 
    color: '#4A90E2',
    gradient: 'from-blue-400 to-blue-500',
    shadow: 'shadow-blue-400/50'
  },
  
  // Automation & RPA
  'RPA': { 
    icon: <SiReact />, 
    color: '#00D4AA',
    gradient: 'from-teal-400 to-teal-500',
    shadow: 'shadow-teal-400/50'
  },
  'Automation': { 
    icon: <SiReact />, 
    color: '#00D4AA',
    gradient: 'from-teal-400 to-teal-500',
    shadow: 'shadow-teal-400/50'
  },
  'Business Process': { 
    icon: <SiReact />, 
    color: '#6366F1',
    gradient: 'from-indigo-500 to-indigo-600',
    shadow: 'shadow-indigo-500/50'
  },
  
  // Development Platforms
  'Replit': { 
    icon: <SiReact />, 
    color: '#667eea',
    gradient: 'from-indigo-400 to-indigo-500',
    shadow: 'shadow-indigo-400/50'
  },
  'Competition': { 
    icon: <SiReact />, 
    color: '#FFD700',
    gradient: 'from-yellow-400 to-yellow-500',
    shadow: 'shadow-yellow-400/50'
  },
  
  // Innovation & Creative
  'Innovation': { 
    icon: <SiReact />, 
    color: '#8B5CF6',
    gradient: 'from-purple-500 to-purple-600',
    shadow: 'shadow-purple-500/50'
  },
  'Creative Development': { 
    icon: <SiReact />, 
    color: '#EC4899',
    gradient: 'from-pink-500 to-pink-600',
    shadow: 'shadow-pink-500/50'
  },
  'Prototyping': { 
    icon: <SiReact />, 
    color: '#F59E0B',
    gradient: 'from-yellow-500 to-yellow-600',
    shadow: 'shadow-yellow-500/50'
  },
  
  // Soft Skills
  'Leadership': { 
    icon: <SiReact />, 
    color: '#10B981',
    gradient: 'from-green-500 to-green-600',
    shadow: 'shadow-green-500/50'
  },
  'Coordination': { 
    icon: <SiReact />, 
    color: '#3B82F6',
    gradient: 'from-blue-500 to-blue-600',
    shadow: 'shadow-blue-500/50'
  },
  
  // Project-specific tech
  'ElevenLabs': { 
    icon: <SiReact />, 
    color: '#8B5CF6',
    gradient: 'from-purple-500 to-purple-600',
    shadow: 'shadow-purple-500/50'
  },
  'RAG': { 
    icon: <SiReact />, 
    color: '#6366F1',
    gradient: 'from-indigo-500 to-indigo-600',
    shadow: 'shadow-indigo-500/50'
  },
  'AI Agents': { 
    icon: <SiReact />, 
    color: '#8B5CF6',
    gradient: 'from-purple-500 to-purple-600',
    shadow: 'shadow-purple-500/50'
  },
  'Voice AI': { 
    icon: <SiReact />, 
    color: '#EC4899',
    gradient: 'from-pink-500 to-pink-600',
    shadow: 'shadow-pink-500/50'
  },
  'Pinecone': { 
    icon: <SiReact />, 
    color: '#F59E0B',
    gradient: 'from-yellow-500 to-yellow-600',
    shadow: 'shadow-yellow-500/50'
  },
  'Google Gemini': { 
    icon: <SiGoogle />, 
    color: '#4285F4',
    gradient: 'from-blue-500 to-blue-600',
    shadow: 'shadow-blue-500/50'
  },
  'Chatbot': { 
    icon: <SiChatbot />, 
    color: '#10B981',
    gradient: 'from-green-500 to-green-600',
    shadow: 'shadow-green-500/50'
  },
  'Computer Vision': { 
    icon: <SiReact />, 
    color: '#3B82F6',
    gradient: 'from-blue-500 to-blue-600',
    shadow: 'shadow-blue-500/50'
  },
  'Real-time Analytics': { 
    icon: <SiReact />, 
    color: '#F97316',
    gradient: 'from-orange-500 to-orange-600',
    shadow: 'shadow-orange-500/50'
  },
  'Heatmaps': { 
    icon: <SiReact />, 
    color: '#EF4444',
    gradient: 'from-red-500 to-red-600',
    shadow: 'shadow-red-500/50'
  },
};

export default function TechIconFast({ tech, className = "w-16 h-16", onHover }) {
  const techData = techIcons[tech];
  
  if (!techData) {
    return (
      <div className={`${className} bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110`} title={tech}>
        <span className="text-xs font-bold">{tech.charAt(0)}</span>
      </div>
    );
  }

  return (
    <div 
      className={`${className} relative group cursor-pointer`}
      onMouseEnter={() => onHover && onHover(tech)}
      onMouseLeave={() => onHover && onHover(null)}
      title={tech}
    >
      {/* 3D-like container with gradient background */}
      <div className={`w-full h-full bg-gradient-to-br ${techData.gradient} rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 hover:rotate-3 relative overflow-hidden`}>
        
        {/* Glow effect on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${techData.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}></div>
        
        {/* Icon container */}
        <div className="relative z-10 w-full h-full flex items-center justify-center text-white">
          <div className="transform group-hover:scale-110 transition-transform duration-300">
            {React.cloneElement(techData.icon, { 
              className: "w-full h-full",
              style: { filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }
            })}
          </div>
        </div>
        
        {/* 3D depth effect */}
        <div className="absolute inset-0 bg-black/10 rounded-xl"></div>
        
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full animate-ping opacity-75"></div>
        <div className="absolute top-2 right-2 w-1 h-1 bg-white rounded-full animate-ping opacity-75" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-2 left-2 w-1 h-1 bg-white rounded-full animate-ping opacity-75" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  );
} 