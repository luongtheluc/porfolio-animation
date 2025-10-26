import React, { useState, useMemo, useEffect, useRef } from 'react';
import { VideoProject, VideoCategory } from '../types';
import VideoCard from './VideoCard';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface PortfolioProps {
  projects: VideoProject[];
  onProjectSelect: (project: VideoProject) => void;
}

const categories = Object.values(VideoCategory);

const Portfolio: React.FC<PortfolioProps> = ({ projects, onProjectSelect }) => {
  const [activeFilter, setActiveFilter] = useState<VideoCategory | 'All'>('All');
  const sectionRef = useRef<HTMLElement>(null);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') {
      return projects;
    }
    return projects.filter(p => p.category === activeFilter);
  }, [activeFilter, projects]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        }
      });

      tl.from(sectionRef.current.querySelectorAll('h2, .portfolio-description'), {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.2,
      })
      .from(sectionRef.current.querySelectorAll('.filter-btn'), {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
      }, "-=0.8")
      .from(sectionRef.current.querySelectorAll('.video-card'), {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.15,
      }, "-=0.5");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-[#111111]">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-serif font-bold text-center mb-4">Selected Works</h2>
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto portfolio-description">
          A collection of projects that showcase my passion for storytelling, visual design, and motion.
        </p>

        <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-12">
          <button
            onClick={() => setActiveFilter('All')}
            className={`filter-btn px-4 py-2 text-sm md:text-base rounded-full transition-colors duration-300 ${activeFilter === 'All' ? 'bg-white text-black' : 'bg-gray-800 hover:bg-gray-700'}`}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`filter-btn px-4 py-2 text-sm md:text-base rounded-full transition-colors duration-300 ${activeFilter === category ? 'bg-white text-black' : 'bg-gray-800 hover:bg-gray-700'}`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {filteredProjects.map((project) => (
            <VideoCard
              key={project.id}
              project={project}
              onSelect={() => onProjectSelect(project)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;