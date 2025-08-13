import React from 'react';
import AnimatedHero from './AnimatedHero';

export default function Hero() {
  return (
    <AnimatedHero
      title="Hari Hara Sundaram S"
      subtitle="AI/ML Engineer & Tech Innovator"
      description="Transforming ideas into intelligent solutions through cutting-edge AI, machine learning, and innovative technology development."
      className="bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
      showScrollIndicator={true}
    />
  );
} 