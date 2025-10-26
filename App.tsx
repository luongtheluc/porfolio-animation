
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
  
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  const handleSelectProject = (project: VideoProject) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const scrollTo = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    const sections = [portfolioRef.current, aboutRef.current, contactRef.current];
    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="bg-[#0a0a0a] text-gray-200 min-h-screen">
      <Header
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
            isVisible={visibleSections.has('portfolio')}
          />
        </div>
        <div ref={aboutRef} id="about">
          <About isVisible={visibleSections.has('about')} />
        </div>
        <div ref={contactRef} id="contact">
          <Contact isVisible={visibleSections.has('contact')} />
        </div>
      </main>
      {selectedProject && <Modal project={selectedProject} onClose={handleCloseModal} />}
    </div>
  );
};

export default App;
