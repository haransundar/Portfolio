/**
 * MobileNavigation Component
 * Full-screen mobile navigation with animated menu items and gesture support
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnimation } from '../hooks/useAnimation';
import { cn } from '../utils/design-system';

const MobileNavigation = ({
  items = [
    { id: 'hero', label: 'Home', href: '#hero', icon: '🏠' },
    { id: 'about', label: 'About', href: '#about', icon: '👨‍💻' },
    { id: 'projects', label: 'Projects', href: '#projects', icon: '🚀' },
    { id: 'skills', label: 'Skills', href: '#skills', icon: '⚡' },
    { id: 'certifications', label: 'Certifications', href: '#certifications', icon: '🎓' },
    { id: 'contact', label: 'Contact', href: '#contact', icon: '📧' },
  ],
  isOpen = false,
  onClose,
  onNavigate,
  className = '',
  ...props
}) => {
  const [activeSection, setActiveSection] = useState('hero');
  const { canAnimate } = useAnimation();

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose?.();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle navigation
  const handleNavigate = (item) => {
    const targetId = item.href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 80;
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }

    setActiveSection(item.id);
    onNavigate?.(item);
    onClose?.();
  };

  // Overlay variants
  const overlayVariants = {
    hidden: {
      opacity: 0,
      transition: {
        duration: canAnimate ? 0.3 : 0,
        ease: 'easeInOut',
      },
    },
    visible: {
      opacity: 1,
      transition: {
        duration: canAnimate ? 0.3 : 0,
        ease: 'easeInOut',
      },
    },
  };

  // Menu container variants
  const menuVariants = {
    hidden: {
      x: '100%',
      transition: {
        duration: canAnimate ? 0.4 : 0,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: canAnimate ? 0.05 : 0,
        staggerDirection: -1,
      },
    },
    visible: {
      x: 0,
      transition: {
        duration: canAnimate ? 0.4 : 0,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: canAnimate ? 0.1 : 0,
        delayChildren: canAnimate ? 0.1 : 0,
      },
    },
  };

  // Menu item variants
  const itemVariants = {
    hidden: {
      x: 50,
      opacity: 0,
      transition: {
        duration: canAnimate ? 0.3 : 0,
        ease: 'easeOut',
      },
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: canAnimate ? 0.5 : 0,
        ease: 'easeOut',
      },
    },
  };

  // Close button variants
  const closeButtonVariants = {
    rest: { rotate: 0, scale: 1 },
    hover: { 
      rotate: 90, 
      scale: 1.1,
      transition: {
        duration: canAnimate ? 0.2 : 0,
        ease: 'easeOut',
      },
    },
    tap: { scale: 0.95 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />

          {/* Menu Container */}
          <motion.div
            className={cn(
              'fixed top-0 right-0 h-full w-full max-w-sm',
              'bg-white dark:bg-neutral-900',
              'shadow-2xl z-modal',
              'flex flex-col',
              className
            )}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            {...props}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-700">
              <motion.h2
                className="text-xl font-display font-bold text-neutral-900 dark:text-white"
                variants={itemVariants}
              >
                Navigation
              </motion.h2>

              {/* Close Button */}
              <motion.button
                className={cn(
                  'p-2 rounded-xl',
                  'text-neutral-600 dark:text-neutral-400',
                  'hover:bg-neutral-100 dark:hover:bg-neutral-800',
                  'focus-ring'
                )}
                variants={closeButtonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                onClick={onClose}
                aria-label="Close navigation menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </motion.button>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 p-6">
              <motion.ul className="space-y-2">
                {items.map((item, index) => {
                  const isActive = activeSection === item.id;

                  return (
                    <motion.li key={item.id} variants={itemVariants}>
                      <motion.button
                        className={cn(
                          'w-full flex items-center gap-4 p-4 rounded-xl',
                          'text-left transition-colors duration-200',
                          'focus-ring focus:outline-none',
                          isActive
                            ? 'bg-gradient-primary text-white shadow-primary'
                            : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                        )}
                        onClick={() => handleNavigate(item)}
                        whileHover={canAnimate ? { x: 8, scale: 1.02 } : {}}
                        whileTap={canAnimate ? { scale: 0.98 } : {}}
                      >
                        {/* Icon */}
                        <span className="text-2xl flex-shrink-0">
                          {item.icon}
                        </span>

                        {/* Label */}
                        <span className="font-medium text-lg">
                          {item.label}
                        </span>

                        {/* Active Indicator */}
                        {isActive && (
                          <motion.div
                            className="ml-auto w-2 h-2 bg-white rounded-full"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              duration: canAnimate ? 0.3 : 0,
                              ease: 'easeOut',
                            }}
                          />
                        )}

                        {/* Arrow */}
                        {!isActive && (
                          <motion.svg
                            className="ml-auto w-5 h-5 text-neutral-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            whileHover={canAnimate ? { x: 4 } : {}}
                            transition={{ duration: 0.2 }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </motion.svg>
                        )}
                      </motion.button>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </nav>

            {/* Footer */}
            <motion.div
              className="p-6 border-t border-neutral-200 dark:border-neutral-700"
              variants={itemVariants}
            >
              {/* Social Links */}
              <div className="flex items-center justify-center gap-4 mb-4">
                {[
                  { name: 'GitHub', icon: '🔗', href: '#' },
                  { name: 'LinkedIn', icon: '💼', href: '#' },
                  { name: 'Twitter', icon: '🐦', href: '#' },
                ].map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    className={cn(
                      'p-3 rounded-xl',
                      'bg-neutral-100 dark:bg-neutral-800',
                      'text-neutral-600 dark:text-neutral-400',
                      'hover:bg-primary-100 dark:hover:bg-primary-900',
                      'hover:text-primary-600 dark:hover:text-primary-400',
                      'transition-colors duration-200',
                      'focus-ring'
                    )}
                    whileHover={canAnimate ? { scale: 1.1, y: -2 } : {}}
                    whileTap={canAnimate ? { scale: 0.95 } : {}}
                    aria-label={social.name}
                  >
                    <span className="text-xl">{social.icon}</span>
                  </motion.a>
                ))}
              </div>

              {/* Theme Toggle */}
              <motion.button
                className={cn(
                  'w-full p-3 rounded-xl',
                  'bg-neutral-100 dark:bg-neutral-800',
                  'text-neutral-700 dark:text-neutral-300',
                  'hover:bg-neutral-200 dark:hover:bg-neutral-700',
                  'transition-colors duration-200',
                  'focus-ring'
                )}
                whileHover={canAnimate ? { scale: 1.02 } : {}}
                whileTap={canAnimate ? { scale: 0.98 } : {}}
              >
                <span className="flex items-center justify-center gap-2">
                  <span>🌙</span>
                  <span className="font-medium">Toggle Theme</span>
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileNavigation;