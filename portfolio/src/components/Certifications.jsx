import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/design-system';

const certificateFiles = import.meta.glob('../../certifications/*.{pdf,PDF,png,PNG,jpg,JPG,jpeg,JPEG}', {
  as: 'url',
  eager: true,
});

const formatTitle = (filename) => {
  return filename
    .replace(/\.[^/.]+$/, '')
    .replace(/[-_.]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

const detectCategory = (title) => {
  const normalized = title.toLowerCase();
  if (normalized.includes('aws') || normalized.includes('cloud')) return 'Cloud & Infra';
  if (normalized.includes('python') || normalized.includes('java') || normalized.includes('c++') || normalized.includes('fundamental')) return 'Programming';
  if (normalized.includes('ai') || normalized.includes('ml') || normalized.includes('data')) return 'AI & Data';
  if (normalized.includes('design') || normalized.includes('ux') || normalized.includes('ui')) return 'Design & UX';
  if (normalized.includes('cyber') || normalized.includes('security') || normalized.includes('network')) return 'Cybersecurity';
  if (normalized.includes('workshop') || normalized.includes('conference') || normalized.includes('internship')) return 'Workshops & Experience';
  return 'Highlights';
};

const certificates = Object.entries(certificateFiles).map(([path, url]) => {
  const filename = path.split('/').pop() || path;
  const extension = filename.split('.').pop()?.toLowerCase() || 'pdf';
  const title = formatTitle(filename);

  return {
    id: filename,
    title,
    url,
    type: extension === 'pdf' ? 'pdf' : 'image',
    category: detectCategory(title),
  };
}).sort((a, b) => a.title.localeCompare(b.title));

const categories = ['All', ...Array.from(new Set(certificates.map((cert) => cert.category)))];

const sectionAnimation = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const cardAnimation = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -20, scale: 0.95 },
};

const overlayAnimation = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function Certifications() {
  const [filter, setFilter] = useState('All');
  const [activeCertificate, setActiveCertificate] = useState(null);

  const filteredCertificates = useMemo(() => {
    if (filter === 'All') return certificates;
    return certificates.filter((cert) => cert.category === filter);
  }, [filter]);

  if (!certificates.length) return null;

  return (
    <motion.section
      id="certifications"
      className="mb-16 sm:mb-24"
      variants={sectionAnimation}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <motion.div
        className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ delay: 0.1 }}
      >
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-blue-500 font-semibold">Evidence of Excellence</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mt-2 text-balance">
            Global Certifications & Achievements
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl text-sm sm:text-base text-pretty">
            Dynamically pulled from the full repository of certificates to showcase proven expertise across AI, cloud, cybersecurity, design,
            and hands-on workshops.
          </p>
                </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setFilter(category)}
              className={cn(
                'px-4 py-2 rounded-full border text-sm font-medium focus-ring',
                filter === category
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent shadow-lg'
                  : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-300 dark:hover:border-blue-500 hover:text-blue-600'
              )}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {category}
            </motion.button>
          ))}
              </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredCertificates.map((certificate, index) => (
            <motion.article
              key={certificate.id}
              className="relative bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200/60 dark:border-gray-800/60 overflow-hidden group"
              variants={cardAnimation}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.35, delay: index * 0.04 }}
              whileHover={{ y: -6 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/30 dark:from-blue-600/5 dark:to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="flex items-center justify-between gap-3 mb-4 relative z-10">
              <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-blue-500 font-semibold">{certificate.category}</p>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white leading-tight mt-2 text-pretty">
                    {certificate.title}
                  </h3>
              </div>
                <span className="px-3 py-1 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-600 dark:text-gray-300 shadow-sm">
                  {certificate.type === 'pdf' ? 'PDF' : 'Image'}
                </span>
            </div>

              <motion.div
                className={cn(
                  'relative rounded-xl border border-dashed border-gray-200 dark:border-gray-700 bg-gray-50/70 dark:bg-gray-800/30 flex items-center justify-center overflow-hidden',
                  certificate.type === 'image' ? 'h-48' : 'h-40'
                )}
                whileHover={certificate.type === 'image' ? { scale: 1.01 } : undefined}
              >
                {certificate.type === 'image' ? (
                  <button
                    type="button"
                    className="w-full h-full focus:outline-none"
                    onClick={() => setActiveCertificate(certificate)}
                  >
                    <img
                      src={certificate.url}
                      alt={certificate.title}
                      loading="lazy"
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                  </button>
                ) : (
                  <div className="text-center px-6 py-8 text-sm text-gray-600 dark:text-gray-300">
                    <p className="font-semibold mb-2">Interactive PDF</p>
                    <p>Open to preview or download the official certificate.</p>
              </div>
            )}
              </motion.div>

              <div className="mt-5 flex flex-wrap items-center gap-3 relative z-10">
                <motion.a
                  href={certificate.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold shadow-lg focus-ring"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  View Credential
                </motion.a>
                <motion.a
                  href={certificate.url}
                  download
                  className="px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:border-blue-400 dark:hover:border-blue-400 focus-ring"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Download
                </motion.a>
          </div>
            </motion.article>
        ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {activeCertificate && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            variants={overlayAnimation}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setActiveCertificate(null)}
          >
            <motion.div
              className="relative max-w-5xl w-full bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-white/10 overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Close preview"
                className="absolute top-4 right-4 z-10 text-white bg-black/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70"
                onClick={() => setActiveCertificate(null)}
              >
                ×
              </button>
              {activeCertificate.type === 'image' ? (
                <img
                  src={activeCertificate.url}
                  alt={activeCertificate.title}
                  className="w-full h-full object-contain bg-gray-900/80 max-h-[80vh]"
                />
              ) : (
                <iframe
                  src={activeCertificate.url}
                  title={activeCertificate.title}
                  className="w-full h-[80vh] bg-white"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
} 