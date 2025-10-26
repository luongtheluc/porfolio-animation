
import React, { useState, useMemo } from 'react';
import { VideoProject, VideoCategory } from '../types';
import VideoCard from './VideoCard';

interface PortfolioProps {
  projects: VideoProject[];
  onProjectSelect: (project: VideoProject) => void;
  isVisible: boolean;
}

const categories = Object.values(VideoCategory);

const Portfolio: React.FC<PortfolioProps> = ({ projects, onProjectSelect, isVisible }) => {
  const [activeFilter, setActiveFilter] = useState<VideoCategory | 'All'>('All');

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') {
      return projects;
    }
    return projects.filter(p => p.category === activeFilter);
  }, [activeFilter, projects]);

  const animationClass = isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10';

  return (
    <section className={`py-20 md:py-32 bg-[#111111] transition-all duration-1000 ${animationClass}`}>
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-serif font-bold text-center mb-4">Selected Works</h2>
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
          A collection of projects that showcase my passion for storytelling, visual design, and motion.
        </p>

        <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-12">
          <button
            onClick={() => setActiveFilter('All')}
            className={`px-4 py-2 text-sm md:text-base rounded-full transition-colors duration-300 ${activeFilter === 'All' ? 'bg-white text-black' : 'bg-gray-800 hover:bg-gray-700'}`}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 text-sm md:text-base rounded-full transition-colors duration-300 ${activeFilter === category ? 'bg-white text-black' : 'bg-gray-800 hover:bg-gray-700'}`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {filteredProjects.map((project, index) => (
            <VideoCard
              key={project.id}
              project={project}
              onSelect={() => onProjectSelect(project)}
              style={{ transitionDelay: `${index * 100}ms`}}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
