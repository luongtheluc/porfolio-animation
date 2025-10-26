
import React from 'react';

interface HeroProps {
  onCtaClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  return (
    <section className="h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute z-0 w-auto min-w-full min-h-full max-w-none"
        poster="https://picsum.photos/seed/hero-poster/1920/1080"
      >
        {/* Placeholder for actual video background */}
      </video>
      <div className="text-center z-20 px-4">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-extrabold text-white leading-tight mb-4 animate-fade-in-up">
          Crafting Motion.
          <br />
          Defining Brands.
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300 mb-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          A visual storyteller and motion designer creating compelling video experiences that captivate and convert.
        </p>
        <button
          onClick={onCtaClick}
          className="bg-white text-black font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
          style={{ animationDelay: '0.6s' }}
        >
          View My Work
        </button>
      </div>
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Hero;
