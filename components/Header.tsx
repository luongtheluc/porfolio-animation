import React, { useState, useEffect } from 'react';

interface HeaderProps {
  onPortfolioClick: () => void;
  onAboutClick: () => void;
  onContactClick: () => void;
  onLogoClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onPortfolioClick, onAboutClick, onContactClick, onLogoClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold font-serif cursor-pointer" onClick={onLogoClick}>
          JD
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <button onClick={onPortfolioClick} className="text-gray-300 hover:text-white transition-colors duration-300">Work</button>
          <button onClick={onAboutClick} className="text-gray-300 hover:text-white transition-colors duration-300">About</button>
          <button onClick={onContactClick} className="bg-gray-200 text-black px-4 py-2 rounded-full font-medium hover:bg-white transition-colors duration-300">Contact</button>
        </nav>
        <div className="md:hidden">
            {/* Mobile menu button can be added here */}
        </div>
      </div>
    </header>
  );
};

export default Header;