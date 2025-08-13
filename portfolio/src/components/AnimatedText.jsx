/**
 * AnimatedText Component
 * Provides letter-by-letter animation with accessibility support
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnimation } from '../hooks/useAnimation';
import { cn } from '../utils/design-system';

const AnimatedText = ({
  text,
  className = '',
  as = 'span',
  animation = 'fadeIn',
  staggerDelay = 0.05,
  startDelay = 0,
  duration = 0.6,
  autoStart = false,
  onComplete,
  splitBy = 'letter', // 'letter', 'word', 'line'
  preserveSpaces = true,
  ...props
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(autoStart);
  const { canAnimate, isVisible, elementRef } = useAnimation();
  const hasStarted = useRef(false);

  // Split text based on splitBy prop
  const splitText = (text, splitBy) => {
    switch (splitBy) {
      case 'word':
        return text.split(' ').map((word, index) => ({
          content: word,
          isSpace: false,
          key: `word-${index}`,
        }));
      case 'line':
        return text.split('\n').map((line, index) => ({
          content: line,
          isSpace: false,
          key: `line-${index}`,
        }));
      case 'letter':
      default:
        return text.split('').map((char, index) => ({
          content: char,
          isSpace: char === ' ',
          key: `letter-${index}`,
        }));
    }
  };

  const textParts = splitText(text, splitBy);

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: canAnimate ? staggerDelay : 0,
        delayChildren: canAnimate ? startDelay : 0,
      },
    },
  };

  const getItemVariants = (animationType) => {
    const baseVariants = {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: {
          duration: canAnimate ? duration : 0,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
    };

    switch (animationType) {
      case 'slideUp':
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: {
              duration: canAnimate ? duration : 0,
              ease: [0.25, 0.46, 0.45, 0.94],
            },
          },
        };
      case 'slideDown':
        return {
          hidden: { opacity: 0, y: -20 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: {
              duration: canAnimate ? duration : 0,
              ease: [0.25, 0.46, 0.45, 0.94],
            },
          },
        };
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { 
            opacity: 1, 
            scale: 1,
            transition: {
              duration: canAnimate ? duration : 0,
              ease: [0.25, 0.46, 0.45, 0.94],
            },
          },
        };
      case 'rotate':
        return {
          hidden: { opacity: 0, rotateX: -90 },
          visible: { 
            opacity: 1, 
            rotateX: 0,
            transition: {
              duration: canAnimate ? duration : 0,
              ease: [0.25, 0.46, 0.45, 0.94],
            },
          },
        };
      case 'typewriter':
        return {
          hidden: { width: 0, opacity: 0 },
          visible: { 
            width: 'auto', 
            opacity: 1,
            transition: {
              duration: canAnimate ? duration : 0,
              ease: 'linear',
            },
          },
        };
      case 'fadeIn':
      default:
        return baseVariants;
    }
  };

  const itemVariants = getItemVariants(animation);

  // Start animation when component becomes visible
  useEffect(() => {
    if (isVisible && !hasStarted.current && !autoStart) {
      setShouldAnimate(true);
      hasStarted.current = true;
    }
  }, [isVisible, autoStart]);

  // Handle animation completion
  useEffect(() => {
    if (shouldAnimate && !isAnimating) {
      setIsAnimating(true);
      
      // Calculate total animation time
      const totalTime = (startDelay + (textParts.length * staggerDelay) + duration) * 1000;
      
      const timer = setTimeout(() => {
        setIsAnimating(false);
        onComplete?.();
      }, canAnimate ? totalTime : 0);

      return () => clearTimeout(timer);
    }
  }, [shouldAnimate, isAnimating, startDelay, staggerDelay, duration, textParts.length, onComplete, canAnimate]);

  // Create the appropriate HTML element
  const Component = motion[as] || motion.span;

  // If animations are disabled, render static text
  if (!canAnimate) {
    const StaticComponent = as;
    return (
      <StaticComponent 
        ref={elementRef}
        className={cn('inline-block', className)}
        {...props}
      >
        {text}
      </StaticComponent>
    );
  }

  return (
    <Component
      ref={elementRef}
      className={cn('inline-block', className)}
      variants={containerVariants}
      initial="hidden"
      animate={shouldAnimate ? "visible" : "hidden"}
      {...props}
    >
      <AnimatePresence>
        {textParts.map((part, index) => {
          // Handle spaces differently based on preserveSpaces
          if (part.isSpace && preserveSpaces) {
            return (
              <motion.span
                key={part.key}
                variants={itemVariants}
                className="inline-block"
                style={{ width: '0.25em' }}
              >
                &nbsp;
              </motion.span>
            );
          }

          // Handle line breaks
          if (part.content === '\n') {
            return <br key={part.key} />;
          }

          return (
            <motion.span
              key={part.key}
              variants={itemVariants}
              className={cn(
                'inline-block',
                animation === 'typewriter' && 'overflow-hidden'
              )}
              style={{
                transformOrigin: 'center bottom',
                ...(animation === 'typewriter' && { whiteSpace: 'nowrap' }),
              }}
            >
              {part.content}
            </motion.span>
          );
        })}
      </AnimatePresence>
    </Component>
  );
};

// Higher-order component for common text animations
export const AnimatedHeading = ({ children, level = 1, ...props }) => {
  const HeadingTag = `h${level}`;
  return (
    <AnimatedText
      as={HeadingTag}
      animation="slideUp"
      staggerDelay={0.03}
      duration={0.8}
      className="font-display font-bold"
      {...props}
    >
      {children}
    </AnimatedText>
  );
};

export const AnimatedParagraph = ({ children, ...props }) => {
  return (
    <AnimatedText
      as="p"
      animation="fadeIn"
      splitBy="word"
      staggerDelay={0.02}
      duration={0.5}
      className="font-body"
      {...props}
    >
      {children}
    </AnimatedText>
  );
};

export const TypewriterText = ({ children, ...props }) => {
  return (
    <AnimatedText
      animation="typewriter"
      staggerDelay={0.1}
      duration={0.3}
      className="font-mono"
      {...props}
    >
      {children}
    </AnimatedText>
  );
};

export default AnimatedText;