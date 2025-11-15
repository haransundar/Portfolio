import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TechIconFast from './TechIconFast';

const skills = [
  { name: 'Java', level: 'Advanced' },
  { name: 'Python', level: 'Expert' },
  { name: 'C', level: 'Advanced' },
  { name: 'YOLO', level: 'Advanced' },
  { name: 'Tensorflow', level: 'Advanced' },
  { name: 'CrewAI', level: 'Intermediate' },
  { name: 'n8n', level: 'Intermediate' },
  { name: 'Langflow', level: 'Intermediate' },
  { name: 'SQL', level: 'Intermediate' },
  { name: 'AWS Cloud', level: 'Intermediate' },
  { name: 'Frontend Technologies', level: 'Intermediate' },
  { name: 'Canva', level: 'Advanced' },
  { name: 'Figma', level: 'Intermediate' },
  { name: 'Leadership', level: 'Advanced' },
  { name: 'Coordination', level: 'Advanced' },
];

const skillHighlights = [
  { label: 'Core Languages & Frameworks', value: '15+', detail: 'Languages & AI stacks mastered' },
  { label: 'AI Tooling', value: '9', detail: 'Specialized tooling experience' },
  { label: 'Cloud & Automation', value: '7', detail: 'Automation, infra, and orchestration' },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: 'easeOut' } },
};

const highlightVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.4 } }),
};

export default function Skills() {
  const [hoveredTech, setHoveredTech] = useState(null);

  return (
    <motion.section
      id="skills"
      className="mb-16 sm:mb-24"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div className="relative rounded-3xl border border-white/40 dark:border-white/10 p-8 bg-gradient-to-b from-white/80 to-white/40 dark:from-gray-900/80 dark:to-gray-900/60 shadow-2xl overflow-hidden" initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-10 left-1/4 w-64 h-64 bg-blue-500/20 blur-3xl rounded-full" />
          <div className="absolute bottom-6 right-0 w-48 h-48 bg-purple-500/10 blur-3xl rounded-full" />
        </div>

        <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_1.4fr] items-start">
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-blue-500 font-semibold mb-2">Expertise Compass</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">Skills in Motion</h2>
              <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                Deep-rooted experience bridging AI research, cloud automation, and product design. These technologies power everything from AI agents to experience design systems.
              </p>
            </div>

            <motion.div className="grid grid-cols-1 gap-4" initial="hidden" animate="visible">
              {skillHighlights.map((highlight, idx) => (
                <motion.div
                  key={highlight.label}
                  className="rounded-2xl border border-blue-400/40 bg-white/70 dark:bg-gray-900/70 p-5 shadow-xl"
                  custom={idx}
                  variants={highlightVariants}
                >
                  <p className="text-sm uppercase tracking-[0.3em] text-blue-600 font-bold mb-1">{highlight.label}</p>
                  <p className="text-3xl font-black text-gray-900 dark:text-white">{highlight.value}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{highlight.detail}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            {skills.map((skill, idx) => (
              <motion.div
                key={skill.name}
                className="group relative flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/80 dark:bg-gray-900/70 shadow-lg border border-gray-200/50 dark:border-gray-700/50 cursor-pointer overflow-hidden"
                title={`${skill.name} - ${skill.level}`}
                variants={cardVariants}
                transition={{ delay: idx * 0.04 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="relative">
                  <TechIconFast
                    tech={skill.name}
                    className="w-16 h-16 sm:w-20 sm:h-20"
                    onHover={setHoveredTech}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-80 transition-opacity duration-500 -z-10" />
                </div>

                <div className="text-center">
                  <span className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200 transition-colors">
                    {skill.name}
                  </span>
                  <div className="mt-1">
                    <span className="text-xs text-blue-600 dark:text-blue-300 font-medium">
                      {skill.level}
                    </span>
                  </div>
                </div>

                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-2 left-2 w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-70"></div>
                  <div className="absolute top-3 right-3 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-70" style={{ animationDelay: '0.4s' }}></div>
                  <div className="absolute bottom-3 left-4 w-1 h-1 bg-green-400 rounded-full animate-ping opacity-70" style={{ animationDelay: '0.9s' }}></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="relative mt-10 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-900/50 p-6 shadow-inner"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Technology Stack Map</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-gray-600 dark:text-gray-300">
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500" /> Programming Languages</div>
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-orange-500" /> AI/ML Frameworks</div>
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-purple-500" /> AI Tools</div>
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500" /> Cloud & Database</div>
          </div>
        </motion.div>

        <motion.p
          className="mt-8 text-sm text-center text-gray-600 dark:text-gray-300"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          Hover over each icon to trigger the glow, witness the hover particles, and keep the focus steady on the skills powering every project.
        </motion.p>
      </motion.div>
    </motion.section>
  );
}