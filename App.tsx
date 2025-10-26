import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Contact from './components/Contact';
import Modal from './components/Modal';
import { VideoProject } from './types';
import { portfolioProjects } from './constants';

const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<VideoProject | null>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<any>(null);
  
  useEffect(() => {
    // @ts-ignore
    const lenis = new window.Lenis();
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const handleSelectProject = (project: VideoProject) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const scrollTo = (ref: React.RefObject<HTMLElement>) => {
    if (lenisRef.current && ref.current) {
      lenisRef.current.scrollTo(ref.current);
    }
  };

  const scrollToTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0);
    }
  };

  return (
    <div className="bg-[#0a0a0a] text-gray-200 min-h-screen overflow-x-hidden">
      <Header
        onLogoClick={scrollToTop}
        onPortfolioClick={() => scrollTo(portfolioRef)}
        onAboutClick={() => scrollTo(aboutRef)}
        onContactClick={() => scrollTo(contactRef)}
      />
      <main>
        <Hero onCtaClick={() => scrollTo(portfolioRef)} />
        <div ref={portfolioRef} id="portfolio">
          <Portfolio 
            projects={portfolioProjects} 
            onProjectSelect={handleSelectProject} 
          />
        </div>
        <div ref={aboutRef} id="about">
          <About />
        </div>
        <div ref={contactRef} id="contact">
          <Contact />
        </div>
      </main>
      {selectedProject && <Modal project={selectedProject} onClose={handleCloseModal} />}
    </div>
  );
};

export default App;