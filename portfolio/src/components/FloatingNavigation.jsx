/**
 * FloatingNavigation Component
 * Experimental floating navigation with glassmorphism effects
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnimation } from '../hooks/useAnimation';
import { cn, throttle } from '../utils/design-system';

const FloatingNavigation = ({
  items = [
    { id: 'hero', label: 'Home', href: '#hero' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'projects', label: 'Projects', href: '#projects' },
    { id: 'skills', label: 'Skills', href: '#skills' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ],
  className = '',
  showOnScroll = true,
  magneticEffect = true,
  ...props
}) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(!showOnScroll);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { canAnimate } = useAnimation();
  const lastScrollY = useRef(0);

  // Track scroll and active section
  useEffect(() => {
    const handleScroll = throttle(() => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY.current ? 'down' : 'up';
      
      if (showOnScroll) {
        setIsVisible(direction === 'up' || currentScrollY < 100);
      }
      
      // Update active section
      const sections = items.map(item => document.getElementById(item.id)).filter(Boolean);
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(items[i].id);
          break;
        }
      }
      
      lastScrollY.current = currentScrollY;
    }, 100);

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items, showOnScroll]);

  // Handle navigation clicks
  const handleNavClick = (e, href) => {
    e.preventDefault();
    
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    }
    
    setIsMobileMenuOpen(false);
  };

  // Animation variants
  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <>
      <motion.nav
        className={cn(
          'fixed top-4 left-1/2 transform -translate-x-1/2 z-sticky',
          'px-6 py-3 rounded-2xl',
          'glass-medium border border-white/20',
          'shadow-xl backdrop-blur-md',
          className
        )}
        variants={navVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        transition={{ duration: canAnimate ? 0.5 : 0 }}
        {...props}
      >
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {items.map((item) => (
            <motion.a
              key={item.id}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={cn(
                'relative px-4 py-2 rounded-xl text-sm font-medium',
                'transition-all duration-normal cursor-pointer focus-ring',
                activeSection === item.id
                  ? 'text-primary-600 bg-primary-100/50'
                  : 'text-neutral-700 hover:text-primary-600 hover:bg-white/30'
              )}
              whileHover={canAnimate ? { scale: 1.05 } : {}}
              whileTap={canAnimate ? { scale: 0.95 } : {}}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.div
                  className="absolute inset-0 bg-primary-500/10 rounded-xl -z-10"
                  layoutId="activeIndicator"
                  transition={{ duration: canAnimate ? 0.3 : 0 }}
                />
              )}
            </motion.a>
          ))}
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden flex items-center justify-between w-full">
          <span className="text-sm font-medium text-neutral-700">Menu</span>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg text-neutral-600 focus-ring"
          >
            <div className="w-5 h-5 flex flex-col justify-center space-y-1">
              <div className="w-full h-0.5 bg-current" />
              <div className="w-full h-0.5 bg-current" />
              <div className="w-full h-0.5 bg-current" />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className={cn(
              'fixed top-20 left-4 right-4 z-modal md:hidden',
              'p-6 rounded-2xl glass-strong border border-white/20',
              'shadow-2xl backdrop-blur-md'
            )}
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: canAnimate ? 0.3 : 0 }}
          >
            <div className="space-y-2">
              {items.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    'block px-4 py-3 rounded-xl text-base font-medium',
                    'transition-all duration-normal focus-ring',
                    activeSection === item.id
                      ? 'text-primary-600 bg-primary-100/50'
                      : 'text-neutral-700 hover:text-primary-600 hover:bg-white/30'
                  )}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    transition: { delay: canAnimate ? index * 0.1 : 0 }
                  }}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-overlay md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingNavigation;