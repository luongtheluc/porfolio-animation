import React, { useState } from 'react';
import { VideoProject } from '../types';
import { PlayIcon } from './icons/PlayIcon';

interface VideoCardProps {
  project: VideoProject;
  onSelect: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ project, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="video-card group cursor-pointer relative overflow-hidden rounded-lg transition-transform duration-500 ease-in-out" 
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={project.thumbnailUrl}
        alt={project.title}
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition-all duration-300"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`transition-all duration-300 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
          <PlayIcon />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 p-6 text-white">
        <h3 className="text-2xl font-bold font-serif">{project.title}</h3>
        <p className="text-gray-300">{project.client}</p>
      </div>
    </div>
  );
};

export default VideoCard;