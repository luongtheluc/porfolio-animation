
import React, { useEffect } from 'react';
import { VideoProject } from '../types';
import { CloseIcon } from './icons/CloseIcon';

interface ModalProps {
  project: VideoProject;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-[#111111] rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto relative animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white z-10">
          <CloseIcon />
        </button>
        
        <div className="aspect-video bg-black">
          {/* In a real app, this would be a proper video player like Plyr or ReactPlayer */}
          <iframe 
            width="100%" 
            height="100%" 
            src={`https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1`}
            title={project.title} 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            className="border-0"
          ></iframe>
        </div>

        <div className="p-8 md:p-12">
          <div className="flex justify-between items-start flex-col md:flex-row">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-2">{project.title}</h2>
              <p className="text-lg text-gray-300">{project.client} &bull; {project.year}</p>
            </div>
            <div className="mt-4 md:mt-0 bg-gray-800 text-gray-200 text-sm font-medium px-3 py-1 rounded-full">
              {project.category}
            </div>
          </div>
          <p className="mt-6 text-gray-400 leading-relaxed">
            {project.description}
          </p>
        </div>
      </div>
       <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        @keyframes scale-in {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
        }
        .animate-scale-in {
            animation: scale-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Modal;
