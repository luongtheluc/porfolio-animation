import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
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

      tl.from(sectionRef.current.querySelector('h2'), {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
      })
      .from(sectionRef.current.querySelectorAll('p'), {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.2,
      }, "-=0.8")
      .from(sectionRef.current.querySelectorAll('.timeline-item'), {
          opacity: 0,
          x: -40,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.2,
      }, "-=0.5");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">The Story So Far</h2>
            <p className="text-lg text-gray-300 mb-4">
              With a passion for cinematic narratives and pixel-perfect execution, I've spent the last decade collaborating with leading brands to bring their visions to life.
            </p>
            <p className="text-lg text-gray-400">
              My work is a blend of artistic intuition and technical precision, driven by the belief that great design is not just seen, but felt. From initial concept to final render, I'm dedicated to creating motion that resonates.
            </p>
          </div>
          <div className="space-y-8">
            <div className="flex items-start timeline-item">
              <div className="text-2xl font-bold font-serif text-gray-500 mr-6">2014</div>
              <div>
                <h3 className="text-xl font-bold text-white">Began Journey</h3>
                <p className="text-gray-400">Started exploring the world of motion graphics and visual effects.</p>
              </div>
            </div>
            <div className="flex items-start timeline-item">
              <div className="text-2xl font-bold font-serif text-gray-500 mr-6">2018</div>
              <div>
                <h3 className="text-xl font-bold text-white">Joined Stellar Dynamics</h3>
                <p className="text-gray-400">Led video production for major product launches as a Senior Motion Designer.</p>
              </div>
            </div>
            <div className="flex items-start timeline-item">
              <div className="text-2xl font-bold font-serif text-gray-500 mr-6">2022</div>
              <div>
                <h3 className="text-xl font-bold text-white">Freelance & Consulting</h3>
                <p className="text-gray-400">Partnering with agencies and brands worldwide to create award-winning campaigns.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;