import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/design-system';

const highlightStats = [
  { label: 'Repositories', value: '17', detail: 'Active GitHub repositories', accent: 'from-blue-500 to-indigo-500' },
  { label: 'Individual Projects', value: '63', detail: 'Curated portfolio inventory', accent: 'from-purple-500 to-pink-500' },
  { label: 'Live Deployments', value: '28+', detail: 'Production & demo sites', accent: 'from-emerald-500 to-teal-500' },
  { label: 'Domains', value: 'AI · IoT · Automation', detail: 'Full-stack + embedded expertise', accent: 'from-amber-500 to-orange-500' },
];

const projectSections = [
  {
    id: 'flagship',
    title: 'Flagship & Production-Ready Builds',
    subtitle:
      'Enterprise SaaS, GenAI assistants, and full-stack experiences delivering measurable business outcomes and live demos.',
    accent: 'from-orange-400 to-rose-500',
    projects: [
      {
        name: 'SCAP · Supply Chain AI Compliance Platform',
        description:
          'Automates textile compliance with AI document extraction, predictive risk analytics, and a multilingual chatbot that slashes costs.',
        tags: ['AI', 'SaaS', 'Compliance', 'Multilingual'],
        matchHighlights: [
          '95-98% accuracy on document extraction',
          'Tamil/Hindi/English chatbot',
          '87% compliance cost reduction (₹11L → ₹30K)',
        ],
        links: {
          github: 'https://github.com/haransundar/scap-textile-mvp',
          demo: 'https://scap-textile-mvp-4u2t.vercel.app',
        },
        matchScore: 'ROI Match · 87% efficiency gain',
      },
      {
        name: 'Portfolio Website',
        description:
          'Live showcase with bold animations, theme toggle, and project storytelling that reflects the entire inventory.',
        tags: ['React', 'Tailwind', 'Experience Design'],
        matchHighlights: ['Live demo with animated hero', 'Responsive narrative for recruiters'],
        links: {
          github: 'https://github.com/haransundar/Portfolio',
          demo: 'https://portfolio-pi-tawny-mlbh8rz2dh.vercel.app',
        },
        matchScore: 'Experience Match · Design + Code',
      },
      {
        name: 'HR Knowledge Assistant',
        description:
          'RAG-powered assistant integrating Google Drive + Pinecone + Gemini with OAuth 2.0 for secure, sub-second answers.',
        tags: ['RAG', 'GenAI', 'Security'],
        matchHighlights: ['Instant policy answers', '<1s median latency'],
        links: {
          github: 'https://github.com/haransundar/HR-Knowlege-Assistant',
        },
        matchScore: 'Trust Match · Secure automation',
      },
      {
        name: 'AI-for-UPI-Payment-Failure-Diagnosis',
        description:
          'Fintech AI system diagnosing UPI failures with voice diagnostics, MongoDB instrumentation, and actionable recommendations.',
        tags: ['Fintech', 'Voice', 'MongoDB'],
        matchHighlights: ['Voice + AI triaging', 'Actionable remediation insights'],
        links: {
          github: 'https://github.com/haransundar/AI-for-UPI-Payment-Failure-Diagnosis',
        },
        matchScore: 'Fintech Match · Voice-first diagnostics',
      },
      {
        name: 'personacache-ai-agent',
        description:
          'Voice-first agent framework powered by ElevenLabs. Flagship persona: Tamil Nadu Information Guide with hyper-specialized context.',
        tags: ['Voice AI', 'ElevenLabs', 'Agent Framework'],
        matchHighlights: ['Context-aware Tamil Nadu persona', 'Reusable agent scaffolding'],
        links: {
          github: 'https://github.com/haransundar/personacache-ai-agent',
        },
        matchScore: 'Persona Match · Voice-first AI',
      },
    ],
  },
  {
    id: 'ai-ml',
    title: 'AI/ML Repositories',
    subtitle: 'Monorepos and experiments pushing agentic automation, Vertex AI playbooks, and document automation workflows.',
    accent: 'from-indigo-500 to-sky-500',
    projects: [
      {
        name: 'Google-adk · ADK Agent Monorepo',
        description:
          'Multiple agents built with Google ADK, including the Cognitive Compliance Agent that automates regulatory workflows.',
        tags: ['Google ADK', 'Agents', 'Compliance'],
        matchHighlights: ['Browser automation agents', 'Compliance orchestration'],
        links: {
          github: 'https://github.com/haransundar/Google-adk',
        },
        matchScore: 'Agent Match · Compliance automation',
      },
      {
        name: 'vertex-ai · Centralized Experiments',
        description:
          'Hub for Vertex AI experiments, including the Travel Buddy Agent and cloud-native ML pipelines.',
        tags: ['Vertex AI', 'ML Ops', 'Travel'],
        matchHighlights: ['Travel Buddy Agent', 'Cloud-native ML experiments'],
        links: {
          github: 'https://github.com/haransundar/vertex-ai',
        },
        matchScore: 'Cloud Match · Vertex AI',
      },
      {
        name: 'ArivuFlow',
        description:
          'AI-powered document automation platform for contracts and insight extraction (early-stage).',
        tags: ['Doc Automation', 'AI'],
        matchHighlights: ['Document processing focus', 'Data extraction pipelines'],
        links: {
          github: 'https://github.com/haransundar/ArivuFlow',
        },
        matchScore: 'Automation Match · Document AI',
      },
    ],
  },
  {
    id: 'ai-subprojects',
    title: 'AI-Projects Repository (19 Sub-Projects)',
    subtitle:
      'Breadth-first experimentation with multi-file automation suites and Python scripts spanning vision, robotics, and agent tools.',
    accent: 'from-fuchsia-500 to-purple-500',
    projects: [
      {
        name: 'Complex Multi-File Systems (5)',
        description: 'Agent automation, real-time traffic safety, timetables, N8N calculator, and face recognition workflows.',
        tags: ['Automation', 'Computer Vision', 'Agents'],
        subProjects: [
          'AI Agents Automation With Browser WebUI',
          'AI-Powered Real-Time Traffic Management',
          'AI-based Automated TimeTable System',
          'Simple AI Calculator Agent Using N8N',
          'Simple Face Recognition',
        ],
        matchHighlights: ['Modular automation WebUI', 'Live traffic object detection', 'AI scheduling stack'],
        links: {
          github: 'https://github.com/haransundar/AI-Projects',
        },
        matchScore: 'Experiment Match · 5 complex builds',
      },
      {
        name: 'Python Script Playground (13)',
        description:
          'Vision, gesture, and YOLO-driven bots implemented as standalone Python scripts for rapid prototyping.',
        tags: ['Python', 'OpenCV', 'YOLO'],
        subProjects: [
          'Building a Basic Chatbot',
          'Doctor Strange Magical Hand Gesture Effect',
          'Face-Duplication',
          'Hand Gesture Controlled Spider Robot',
          'Hand Gesture Media Player Control',
          'Hand Gesture Recognition System',
          'Hand Gesture Volume Control',
          'Hand Gesture-Based Drawing Application',
          'Hand Gesture-Based Mouse Control',
          'Hand Landmark and Palm Detection',
          'Head Counting Using YOLO',
          'HeadCount Module using YOLO',
          'Virtual Drum Kit Using Hand Gestures',
        ],
        matchHighlights: ['13 vision + gesture scripts', 'YOLO-based counting/automation'],
        links: {
          github: 'https://github.com/haransundar/AI-Projects',
        },
        matchScore: 'Prototype Match · 13 scripts',
      },
    ],
  },
  {
    id: 'iot',
    title: 'IoT-Projects Repository (27 Sub-Projects)',
    subtitle:
      'Embedded craftsmanship for gesture robotics, smart monitoring, and sensor-driven safety systems.',
    accent: 'from-emerald-500 to-lime-500',
    projects: [
      {
        name: 'Robotics & Gesture Control Stack',
        description:
          'Servo spiders, hand-gesture-driven LEDs/media players/mice, palm detection, and virtual drumming for immersive interaction.',
        tags: ['Arduino', 'OpenCV', 'Gesture'],
        subProjects: [
          'Hand Gesture Controlled LED',
          'Hand Gesture Controlled Spider Robot',
          'Hand Gesture Controlled Servo',
          'Hand Gesture Media Player Control',
          'Hand Gesture Recognition System',
          'Hand Gesture Volume Control',
          'Hand Gesture-Based Drawing Application',
          'Hand Gesture-Based Mouse Control',
          'Hand Landmark and Palm Detection',
          'Virtual Drum Kit Using Hand Gestures',
        ],
        matchHighlights: ['Gesture-first robotics', 'Servo automation + feedback'],
        links: {
          github: 'https://github.com/haransundar/Iot-Projects',
        },
        matchScore: 'Interaction Match · Gesture robotics',
      },
      {
        name: 'Sensing & Infrastructure Automations',
        description:
          'Flame alerts, parking intelligence, smart locks, adaptive lighting, ultrasonic traffic guidance, and environmental monitors built with Arduino + sensors.',
        tags: ['Sensors', 'Automation', 'Safety'],
        subProjects: [
          'Arduino Flame Detection System',
          'Automated Plant Shelter System',
          'Bluetooth Controlled Motor System',
          'Bluetooth Serial Communication',
          'Joystick-Controlled Servo Motor',
          'LED Controlling Using Blynk IoT',
          'LED Buzzer JoyStick Control',
          'Motion-Activated Buzzer System',
          'Object Detection with IR Sensor',
          'Obstacle Avoidance Spider Robot',
          'People Counting Using Ultrasonic',
          'Servo Controlling Using Blynk IoT',
          'Smart Parking System',
          'Smart Smoke Detection Door System',
          'Smart Street Light',
          'Smart Door Locking System',
          'Sound Detection System',
          'Touchpad-Controlled Servo Motor',
          'Ultrasonic Distance Based Servo & LED Control',
          'Ultrasonic LED Traffic Signal System',
          'Ultrasonic Arduino Car',
          'Water Level Monitoring System',
          'Temperature & Humidity Monitor',
        ],
        matchHighlights: ['Sensor-first safety', 'Infrastructure automation suite'],
        links: {
          github: 'https://github.com/haransundar/Iot-Projects',
        },
        matchScore: 'Systems Match · 27 builds',
      },
    ],
  },
  {
    id: 'web',
    title: 'Web Development Collections (3 Repos)',
    subtitle: 'Interactive games, experimental pages, and hackathon builds crafted with JS/HTML/CSS.',
    accent: 'from-sky-500 to-cyan-500',
    projects: [
      {
        name: 'Game & Web Projects',
        description:
          'JavaScript games, modern demos, and Buildathon pages that highlight front-end polish and rapid prototyping.',
        tags: ['JavaScript', 'HTML', 'CSS'],
        subProjects: ['Game-projects', 'Web-Projects', '100exBuildathon'],
        matchHighlights: ['Playful UI', 'Responsive demos'],
        links: {
          github: 'https://github.com/haransundar/Web-Projects',
        },
        matchScore: 'Frontend Match · UI experiments',
      },
    ],
  },
  {
    id: 'automation',
    title: 'Automation Projects (RPA)',
    subtitle: 'Robotic process automation for finance, HR, and admin workflows.',
    accent: 'from-amber-500 to-yellow-500',
    projects: [
      {
        name: 'RPA-Projects',
        description: 'Python-powered automation playbook streamlining repeatable tasks with queues and schedulers.',
        tags: ['RPA', 'Workflows', 'Python'],
        matchHighlights: ['Process automation blueprints', 'Operational excellence focus'],
        links: {
          github: 'https://github.com/haransundar/RPA-Projects',
        },
        matchScore: 'Orchestration Match · RPA',
      },
    ],
  },
  {
    id: 'organization',
    title: 'Organizational & Planning Tools',
    subtitle: 'TypeScript-powered planning hubs and experimental canvases on Replit.',
    accent: 'from-neutral-500 to-slate-500',
    projects: [
      {
        name: 'Planning + Experimental Hubs (3)',
        description: 'planny-organization-grove, lovableprojects, and Replit labs for ideation, roadmaps, and quick experiments.',
        tags: ['TypeScript', 'Productivity', 'Replit'],
        subProjects: ['planny-organization-grove', 'lovableprojects', 'replitprojects-'],
        matchHighlights: ['Organizational design', 'Creative lab space'],
        links: {
          github: 'https://github.com/haransundar/planny-organization-grove',
        },
        matchScore: 'Planning Match · 3 tools',
      },
    ],
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: 'easeOut' } },
};

export default function Projects() {
  return (
    <motion.section
      id="projects"
      className="relative mb-24 space-y-12 rounded-[32px] border border-white/30 bg-gradient-to-br from-white via-white/80 to-neutral-50/80 dark:from-neutral-900/70 dark:via-neutral-900/75 dark:to-neutral-950/90 p-6 sm:p-8 shadow-[0_40px_120px_rgba(15,23,42,0.45)] overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <span className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-white/0 via-white/40 to-white/0 dark:from-black/50 dark:via-black/80 dark:to-black/0" aria-hidden="true" />
      <motion.div className="relative z-10 space-y-6" variants={cardVariants}>
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-blue-500 font-semibold">Project Inventory</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">Complete Portfolio Lineup</h2>
        </div>
        <p className="text-neutral-600 dark:text-neutral-300 max-w-3xl">
          Every repository and sub-project has been curated into themed collections with live demos, strategic highlights,
          and animated match indicators so visitors instantly understand the breadth and impact of the work.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {highlightStats.map((stat) => (
            <motion.div
              key={stat.label}
              className="relative overflow-hidden rounded-2xl border border-white/0 p-6 shadow-lg bg-white/80 dark:bg-neutral-900/70 backdrop-blur-xl"
              variants={cardVariants}
            >
              <span className={cn('absolute inset-0 bg-gradient-to-br opacity-30', stat.accent)} aria-hidden="true" />
              <div className="relative space-y-2">
                <p className="text-xs uppercase tracking-[0.4em] text-neutral-700 dark:text-neutral-200/70">{stat.label}</p>
                <p className="text-3xl font-black text-neutral-900 dark:text-white">{stat.value}</p>
                <p className="text-sm text-neutral-500 dark:text-neutral-300">{stat.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="space-y-16">
        {projectSections.map((section) => (
          <motion.div key={section.id} className="space-y-6" variants={sectionVariants}>
            <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.4em] text-neutral-500 dark:text-neutral-400 font-semibold">
                  {section.id.replace('-', ' ')}
                </p>
                <h3 className="text-2xl font-semibold text-neutral-900 dark:text-white">{section.title}</h3>
              </div>
              <p className="text-sm text-neutral-500 dark:text-neutral-300 max-w-xl">{section.subtitle}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {section.projects.map((project, idx) => (
                <motion.article
                  key={`${section.id}-${project.name}`}
                  className="relative overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-2xl"
                  variants={cardVariants}
                  transition={{ delay: idx * 0.08 }}
                >
                  <div className={cn('absolute inset-x-0 top-0 h-1.5', section.accent)} aria-hidden="true" />
                  <div className="relative flex h-full flex-col gap-4 p-6">
                    <div className="flex flex-col gap-1">
                      <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">Match Indicator</p>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-bold text-neutral-900 dark:text-white">{project.name}</span>
                        {project.matchScore && (
                          <motion.span
                            className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-100"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                          >
                            <span className="h-2 w-2 rounded-full bg-emerald-400" />
                            {project.matchScore}
                          </motion.span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">{project.description}</p>
                    {project.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {project.subProjects?.length > 0 && (
                      <div className="space-y-1">
                        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-neutral-400">Sub-projects</p>
                        <div className="grid gap-1 text-xs text-neutral-600 dark:text-neutral-300 max-h-40 overflow-y-auto pr-2">
                          {project.subProjects.map((subproject) => (
                            <div key={subproject} className="flex items-center gap-2">
                              <span className="block h-px w-4 bg-gradient-to-r from-white to-neutral-200 dark:from-white/70" />
                              <span className="truncate">{subproject}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {project.matchHighlights?.length > 0 && (
                      <ul className="space-y-1 text-xs text-neutral-500 dark:text-neutral-400">
                        {project.matchHighlights.map((highlight) => (
                          <li key={`${project.name}-${highlight}`}>
                            <span className="mr-2 text-neutral-400">•</span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-4 flex flex-wrap gap-3">
                      {project.links?.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-full border border-neutral-200 px-4 py-2 text-xs font-semibold text-neutral-800 transition-all duration-200 hover:border-blue-500 hover:text-blue-600 dark:border-neutral-700 dark:text-neutral-200 dark:hover:text-blue-300"
                        >
                          View Repo
                        </a>
                      )}
                      {project.links?.demo && (
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-blue-500/40 transition-all duration-200 hover:brightness-110"
                        >
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}