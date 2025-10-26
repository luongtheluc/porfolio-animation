import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current.querySelectorAll('h2, p, .contact-btn'), {
        scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: "play none none none",
        },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={sectionRef} className="py-20 md:py-32 bg-[#111111]">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-serif font-bold mb-4">Let's Create Together</h2>
        <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
          Have a project in mind? I'd love to hear about it.
        </p>
        <a 
          href="mailto:hello@designer.com"
          className="contact-btn inline-block bg-white text-black font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
        >
          Get in Touch
        </a>
        <div className="mt-16 flex justify-center space-x-6">
          <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Behance</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Vimeo</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">LinkedIn</a>
        </div>
      </div>
      <div className="mt-20 border-t border-gray-800 pt-8 text-center text-gray-500">
        &copy; 2024 John Doe. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Contact;