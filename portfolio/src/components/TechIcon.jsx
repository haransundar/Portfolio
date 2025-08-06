import React from 'react';
import { 
  SiPython, SiC, SiTensorflow, SiMysql, SiCanva, SiFigma,
  SiReact, SiJavascript, SiHtml5, SiCss3, SiNodedotjs, SiGit, SiGithub,
  SiGoogle, SiOpenai, SiN8N, SiChatbot
} from 'react-icons/si';

const techIcons = {
  // Programming Languages
  'Python': <SiPython className="text-yellow-500" />,
  'Java': <SiJavascript className="text-yellow-400" />,
  'C': <SiC className="text-blue-600" />,
  
  // AI/ML Frameworks
  'YOLO': <SiReact className="text-green-500" />,
  'Tensorflow': <SiTensorflow className="text-orange-500" />,
  
  // AI Tools
  'CrewAI': <SiReact className="text-purple-600" />,
  'n8n': <SiN8N className="text-blue-500" />,
  'N8N': <SiN8N className="text-blue-500" />,
  'Langflow': <SiReact className="text-indigo-600" />,
  
  // Cloud & Database
  'SQL': <SiMysql className="text-blue-700" />,
  'AWS Cloud': <SiReact className="text-orange-500" />,
  
  // Design Tools
  'Canva': <SiCanva className="text-blue-400" />,
  'Figma': <SiFigma className="text-purple-500" />,
  
  // Frontend
  'Frontend Technologies': <SiReact className="text-cyan-500" />,
  
  // Soft Skills
  'Leadership': <SiReact className="text-green-600" />,
  'Coordination': <SiReact className="text-blue-600" />,
  
  // Project-specific tech
  'ElevenLabs': <SiReact className="text-purple-600" />,
  'RAG': <SiReact className="text-indigo-600" />,
  'AI Agents': <SiReact className="text-purple-600" />,
  'Voice AI': <SiReact className="text-pink-600" />,
  'Pinecone': <SiReact className="text-yellow-600" />,
  'Google Gemini': <SiGoogle className="text-blue-600" />,
  'Chatbot': <SiChatbot className="text-green-600" />,
  'Computer Vision': <SiReact className="text-blue-600" />,
  'Real-time Analytics': <SiReact className="text-orange-600" />,
  'Heatmaps': <SiReact className="text-red-600" />,
};

export default function TechIcon({ tech, className = "w-6 h-6" }) {
  const icon = techIcons[tech];
  
  if (!icon) {
    // Fallback icon for unknown technologies with gradient
    return (
      <div className={`${className} bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg`} title={tech}>
        <span className="text-xs font-bold">{tech.charAt(0)}</span>
      </div>
    );
  }
  
  return React.cloneElement(icon, { 
    className, 
    title: tech,
    'aria-label': tech 
  });
} 