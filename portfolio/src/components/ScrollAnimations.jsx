/**
 * ScrollAnimations Component
 * Provides scroll-based animations and parallax effects
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useAnimation, useScrollAnimation, useParallax } from '../hooks/useAnimation';
import { cn, throttle } from '../utils/design-system';

// Scroll-triggered reveal animation
export const ScrollReveal = ({
  children,
  className = '',
  animation = 'slideUp',
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  triggerOnce = true,
  ...props
}) => {
  const { isInView, elementRef } = useScrollAnimation({ 
    threshold, 
    triggerOnce 
  });
  const { canAnimate } = useAnimation();

  const animations = {
    slideUp: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 },
    },
    slideDown: {
      hidden: { opacity: 0, y: -50 },
      visible: { opacity: 1, y: 0 },
    },
    slideLeft: {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0 },
    },
    slideRight: {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 },
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
  };

  return (
    <motion.div
      ref={elementRef}
      className={cn('relative', className)}
      variants={animations[animation]}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{
        duration: canAnimate ? duration : 0,
        delay: canAnimate ? delay : 0,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Parallax container
export const ParallaxContainer = ({
  children,
  speed = 0.5,
  className = '',
  ...props
}) => {
  const { offset, elementRef, style } = useParallax(speed);

  return (
    <div
      ref={elementRef}
      className={cn('relative', className)}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
};