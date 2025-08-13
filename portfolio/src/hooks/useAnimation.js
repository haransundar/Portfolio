/**
 * Animation Hook
 * Custom React hook for managing animations with accessibility support
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { prefersReducedMotion, getAnimationDuration, getStaggerDelay } from '../utils/design-system';

/**
 * Hook for managing animation preferences and states
 * @returns {Object} Animation utilities and state
 */
export const useAnimation = () => {
  const [canAnimate, setCanAnimate] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  // Check for reduced motion preference
  useEffect(() => {
    const checkMotionPreference = () => {
      setCanAnimate(!prefersReducedMotion());
    };

    // Initial check
    checkMotionPreference();

    // Listen for changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', checkMotionPreference);

    return () => {
      mediaQuery.removeEventListener('change', checkMotionPreference);
    };
  }, []);

  // Intersection observer for scroll-triggered animations
  useEffect(() => {
    const element = elementRef.current;
    if (!element || !canAnimate) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [canAnimate]);

  // Get animation configuration
  const getAnimationConfig = useCallback((config = {}) => {
    const {
      duration = 'normal',
      delay = 0,
      stagger = 0,
      easing = 'easeOut',
    } = config;

    return {
      duration: getAnimationDuration(duration),
      delay: delay + stagger,
      easing,
      enabled: canAnimate,
    };
  }, [canAnimate]);

  // Create staggered animation configs for lists
  const getStaggeredConfigs = useCallback((items, staggerSize = 'md') => {
    return items.map((_, index) => ({
      ...getAnimationConfig(),
      delay: getStaggerDelay(index, staggerSize),
    }));
  }, [getAnimationConfig]);

  return {
    canAnimate,
    isVisible,
    elementRef,
    getAnimationConfig,
    getStaggeredConfigs,
  };
};

/**
 * Hook for managing scroll-based animations
 * @param {Object} options - Configuration options
 * @returns {Object} Scroll animation utilities
 */
export const useScrollAnimation = (options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '50px',
    triggerOnce = true,
  } = options;

  const [isInView, setIsInView] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        
        if (inView && (!triggerOnce || !hasTriggered)) {
          setIsInView(true);
          setHasTriggered(true);
        } else if (!triggerOnce) {
          setIsInView(inView);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce, hasTriggered]);

  return {
    isInView,
    hasTriggered,
    elementRef,
  };
};

/**
 * Hook for managing hover animations
 * @returns {Object} Hover animation utilities
 */
export const useHoverAnimation = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const elementRef = useRef(null);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('focus', handleFocus);
    element.addEventListener('blur', handleBlur);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('focus', handleFocus);
      element.removeEventListener('blur', handleBlur);
    };
  }, [handleMouseEnter, handleMouseLeave, handleFocus, handleBlur]);

  return {
    isHovered,
    isFocused,
    isActive: isHovered || isFocused,
    elementRef,
  };
};

/**
 * Hook for managing parallax effects
 * @param {number} speed - Parallax speed multiplier (0-1)
 * @returns {Object} Parallax utilities
 */
export const useParallax = (speed = 0.5) => {
  const [offset, setOffset] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const handleScroll = () => {
      const element = elementRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const rate = scrolled * -speed;
      
      setOffset(rate);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);

  return {
    offset,
    elementRef,
    style: {
      transform: `translateY(${offset}px)`,
    },
  };
};

/**
 * Hook for managing typewriter/text reveal animations
 * @param {string} text - Text to animate
 * @param {Object} options - Animation options
 * @returns {Object} Text animation utilities
 */
export const useTextAnimation = (text, options = {}) => {
  const {
    speed = 50,
    startDelay = 0,
    autoStart = false,
  } = options;

  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef(null);

  const startAnimation = useCallback(() => {
    if (prefersReducedMotion()) {
      setDisplayText(text);
      setIsComplete(true);
      return;
    }

    setIsAnimating(true);
    setDisplayText('');
    setIsComplete(false);

    let currentIndex = 0;

    const animateText = () => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex));
        currentIndex++;
        timeoutRef.current = setTimeout(animateText, speed);
      } else {
        setIsComplete(true);
        setIsAnimating(false);
      }
    };

    timeoutRef.current = setTimeout(animateText, startDelay);
  }, [text, speed, startDelay]);

  const resetAnimation = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setDisplayText('');
    setIsComplete(false);
    setIsAnimating(false);
  }, []);

  useEffect(() => {
    if (autoStart) {
      startAnimation();
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [autoStart, startAnimation]);

  return {
    displayText,
    isComplete,
    isAnimating,
    startAnimation,
    resetAnimation,
  };
};