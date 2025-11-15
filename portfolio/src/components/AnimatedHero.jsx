/**
 * AnimatedHero Component
 * Hero section with animated headline and subtitle using sequential text reveal
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedText, { AnimatedHeading, AnimatedParagraph } from './AnimatedText';
import { useAnimation, useScrollAnimation } from '../hooks/useAnimation';
import { cn } from '../utils/design-system';

const AnimatedHero = ({
  title = "Creative Developer",
  subtitle = "Building the future with code and design",
  description = "Passionate about creating exceptional digital experiences through innovative technology and thoughtful design.",
  className = '',
  backgroundElements = true,
  autoStart = true,
  onAnimationComplete,
  ...props
}) => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const { canAnimate } = useAnimation();
  const { isInView, elementRef } = useScrollAnimation({ threshold: 0.2 });

  // Animation phases: 0 = waiting, 1 = title, 2 = subtitle, 3 = description, 4 = complete
  const phases = [
    { name: 'waiting', duration: 0 },
    { name: 'title', duration: 2000 },
    { name: 'subtitle', duration: 1500 },
    { name: 'description', duration: 2000 },
    { name: 'complete', duration: 0 },
  ];

  // Start animation when component is in view or autoStart is true
  useEffect(() => {
    if ((isInView || autoStart) && currentPhase === 0 && canAnimate) {
      setCurrentPhase(1);
    }
  }, [isInView, autoStart, currentPhase, canAnimate]);

  // Handle phase progression
  useEffect(() => {
    if (currentPhase > 0 && currentPhase < phases.length - 1) {
      const timer = setTimeout(() => {
        setCurrentPhase(prev => prev + 1);
      }, phases[currentPhase].duration);

      return () => clearTimeout(timer);
    } else if (currentPhase === phases.length - 1 && !isComplete) {
      setIsComplete(true);
      onAnimationComplete?.();
    }
  }, [currentPhase, phases, isComplete, onAnimationComplete]);

  const scrollToSection = (targetId) => {
    if (typeof document === 'undefined' || typeof window === 'undefined') {
      return;
    }

    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  // Background animation variants
  const backgroundVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: canAnimate ? 3 : 0,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: canAnimate ? 0.5 : 0,
        staggerChildren: canAnimate ? 0.2 : 0,
      },
    },
  };

  return (
    <motion.section
      ref={elementRef}
      className={cn(
        'relative min-h-screen flex items-center justify-center',
        'px-4 sm:px-6 lg:px-8 py-20',
        'overflow-hidden',
        className
      )}
      variants={containerVariants}
      initial="hidden"
      animate={currentPhase > 0 ? "visible" : "hidden"}
      {...props}
    >
      {/* Background Elements */}
      {backgroundElements && (
        <>
          {/* Organic Background Shapes */}
          <motion.div
            className="absolute inset-0 -z-10"
            variants={backgroundVariants}
            initial="hidden"
            animate={currentPhase > 0 ? "visible" : "hidden"}
          >
            {/* Primary organic shape */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-primary opacity-10 organic-blob" />
            
            {/* Secondary organic shape */}
            <div 
              className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-secondary opacity-8 organic-blob"
              style={{ animationDelay: '2s' }}
            />
            
            {/* Accent shape */}
            <div 
              className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-mesh-1 opacity-5 organic-blob"
              style={{ animationDelay: '4s' }}
            />
          </motion.div>

          {/* Floating Particles */}
          <div className="absolute inset-0 -z-5">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className={cn(
                  'absolute w-2 h-2 rounded-full',
                  i % 3 === 0 && 'bg-primary-400',
                  i % 3 === 1 && 'bg-secondary-400',
                  i % 3 === 2 && 'bg-accent-400'
                )}
                style={{
                  left: `${20 + (i * 15)}%`,
                  top: `${30 + (i * 10)}%`,
                }}
                animate={canAnimate ? {
                  y: [-20, 20, -20],
                  opacity: [0.3, 0.8, 0.3],
                } : {}}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Title Animation */}
        <div className="mb-6 relative">
          <p
            aria-hidden="true"
            className={cn(
              'absolute inset-0 flex items-center justify-center text-center',
              'text-6xl sm:text-7xl lg:text-8xl font-display font-black leading-tight tracking-tight',
              'text-gray-900/90 dark:text-white/90 transition-opacity duration-500',
              'pointer-events-none select-none',
              currentPhase > 0 ? 'opacity-60' : 'opacity-100'
            )}
          >
            {title}
          </p>
          <AnimatedHeading
            level={1}
            className={cn(
              'text-6xl sm:text-7xl lg:text-8xl',
              'font-display font-black',
              'text-gradient-primary',
              'leading-tight tracking-tight',
              'relative z-10'
            )}
            animation="slideUp"
            staggerDelay={0.08}
            duration={0.8}
            startDelay={0.2}
            autoStart={currentPhase >= 1}
            onComplete={() => {
              if (currentPhase === 1) {
                setTimeout(() => setCurrentPhase(2), 300);
              }
            }}
          >
            {title}
          </AnimatedHeading>
        </div>

        {/* Subtitle Animation */}
        <div className="mb-8">
          <AnimatedText
            as="h2"
            text={subtitle}
            className={cn(
              'text-xl sm:text-2xl lg:text-3xl',
              'font-display font-medium',
              'text-neutral-700 dark:text-neutral-300',
              'tracking-wide'
            )}
            animation="fadeIn"
            splitBy="word"
            staggerDelay={0.05}
            duration={0.6}
            startDelay={0.1}
            autoStart={currentPhase >= 2}
            onComplete={() => {
              if (currentPhase === 2) {
                setTimeout(() => setCurrentPhase(3), 200);
              }
            }}
          />
        </div>

        {/* Description Animation */}
        <div className="mb-12">
          <AnimatedParagraph
            className={cn(
              'text-lg sm:text-xl',
              'text-neutral-600 dark:text-neutral-400',
              'max-w-2xl mx-auto',
              'leading-relaxed'
            )}
            staggerDelay={0.03}
            duration={0.5}
            startDelay={0.1}
            autoStart={currentPhase >= 3}
            onComplete={() => {
              if (currentPhase === 3) {
                setTimeout(() => setCurrentPhase(4), 100);
              }
            }}
          >
            {description}
          </AnimatedParagraph>
        </div>

        {/* Call-to-Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={currentPhase >= 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: canAnimate ? 0.6 : 0,
            delay: canAnimate ? 0.2 : 0,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <motion.button
            className={cn(
              'btn-magnetic px-8 py-4 rounded-xl',
              'bg-gradient-primary text-white font-semibold',
              'shadow-primary hover:shadow-xl',
              'transition-all duration-normal',
              'focus-ring'
            )}
            whileHover={canAnimate ? { scale: 1.05, y: -2 } : {}}
            whileTap={canAnimate ? { scale: 0.98 } : {}}
            onClick={() => scrollToSection('projects')}
          >
            View My Work
          </motion.button>

          <motion.button
            className={cn(
              'px-8 py-4 rounded-xl',
              'border-2 border-primary-500 text-primary-500',
              'hover:bg-primary-500 hover:text-white',
              'transition-all duration-normal',
              'focus-ring'
            )}
            whileHover={canAnimate ? { scale: 1.05, y: -2 } : {}}
            whileTap={canAnimate ? { scale: 0.98 } : {}}
          >
            Get In Touch
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={isComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{
            duration: canAnimate ? 0.5 : 0,
            delay: canAnimate ? 1 : 0,
          }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-neutral-400 rounded-full flex justify-center"
            animate={canAnimate ? { y: [0, 5, 0] } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.div
              className="w-1 h-3 bg-neutral-400 rounded-full mt-2"
              animate={canAnimate ? { y: [0, 8, 0] } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AnimatedHero;