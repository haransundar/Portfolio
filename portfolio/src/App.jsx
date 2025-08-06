import React, { Suspense } from 'react';
import './App.css'
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Loading component for better UX
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
  </div>
);

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300 flex flex-col overflow-x-hidden">
      <Navbar />
      <main className="pt-16 sm:pt-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 relative">
        <Suspense fallback={<LoadingSpinner />}>
          <div className="w-full">
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Certifications />
            <Contact />
          </div>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
