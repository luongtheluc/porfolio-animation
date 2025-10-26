import React, { useEffect, useRef } from 'react';
// FIX: Import 'gsap' and 'ScrollTrigger' to resolve 'Cannot find name' errors.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

interface HeroProps {
  onCtaClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    const line1El = document.getElementById('line1');
    const line2El = document.getElementById('line2');
    const paragraphEl = document.getElementById('paragraph');
    
    const textTimeline = gsap.timeline({
      repeat: -1,
      repeatDelay: 3,
    });
    
    textTimeline
      .set(["#line1", "#line2", "#paragraph"], { text: "" })
      .add(() => line1El?.classList.add('is-typing'))
      .to("#line1", {
        duration: 1.5,
        text: "Crafting Motion.",
        ease: "none",
        onComplete: () => line1El?.classList.remove('is-typing')
      })
      .add(() => line2El?.classList.add('is-typing'), "+=0.2")
      .to("#line2", {
        duration: 1.5,
        text: "Defining Brands.",
        ease: "none",
        onComplete: () => line2El?.classList.remove('is-typing')
      }, ">")
      .add(() => paragraphEl?.classList.add('is-typing'), "+=0.2")
      .to("#paragraph", {
        duration: 3,
        text: "A visual storyteller and motion designer creating compelling video experiences that captivate and convert.",
        ease: "none",
        onComplete: () => paragraphEl?.classList.remove('is-typing')
      }, ">");

    // Animate CTA button only once
    gsap.from(".hero-cta-wrapper", {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
      delay: 5.9, // Timed to appear before the first cycle of paragraph animation ends
    });
    
    gsap.to(".hero-content", {
        scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
        },
        y: -150,
        opacity: 0,
    });

    gsap.to(".hero-video", {
        scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
        },
        scale: 1.2,
    });

    return () => {
      // Kill all scroll triggers and timelines on unmount to prevent memory leaks
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      textTimeline.kill();
      gsap.killTweensOf(".hero-cta-wrapper");
    };
  }, []);

  return (
    <section ref={heroRef} className="h-screen flex items-center justify-center relative">
      <style>{`
        .typing-text.is-typing::after {
          content: '_';
          margin-left: 0.1em;
          animation: blink-caret 0.75s step-end infinite;
          font-weight: 400;
        }
        @keyframes blink-caret {
          from, to { opacity: 1 }
          50% { opacity: 0 }
        }
      `}</style>
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute z-0 w-auto min-w-full min-h-full max-w-none hero-video"
        poster="https://picsum.photos/seed/hero-poster/1920/1080"
      >
        {/* Placeholder for actual video background */}
        
      </video>
      <div className="text-center z-20 px-4 hero-content">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-extrabold text-white leading-tight mb-4 hero-headline">
          <span id="line1" className="block typing-text min-h-[1.2em]"></span>
          <span id="line2" className="block typing-text min-h-[1.2em]"></span>
        </h1>
        
        <p id="paragraph" className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300 mb-8 hero-paragraph typing-text min-h-[4.5em] md:min-h-[3em]"></p>

        <div className="overflow-hidden hero-cta-wrapper">
            <button
            onClick={onCtaClick}
            className="bg-white text-black font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 will-change-transform"
            >
            View My Work
            </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;