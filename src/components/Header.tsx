import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            Portfolio
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-300 hover:text-green-400 transition-colors duration-300">
              Home
            </a>
            <a href="#about" className="text-gray-300 hover:text-green-400 transition-colors duration-300">
              About
            </a>
            <a href="#skills" className="text-gray-300 hover:text-green-400 transition-colors duration-300">
              Skills
            </a>
            <a href="#projects" className="text-gray-300 hover:text-green-400 transition-colors duration-300">
              Projects
            </a>
            <a href="#experience" className="text-gray-300 hover:text-green-400 transition-colors duration-300">
              Experience
            </a>
            <a href="#education" className="text-gray-300 hover:text-green-400 transition-colors duration-300">
              Education
            </a>
            <a href="#contact" className="text-gray-300 hover:text-green-400 transition-colors duration-300">
              Contact
            </a>
            <a href="/auth" className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300">
              Admin
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'max-h-96 opacity-100 visible' 
            : 'max-h-0 opacity-0 invisible'
        } overflow-hidden`}>
          <nav className="py-4 space-y-3 border-t border-gray-800">
            <a 
              href="#home" 
              className="block text-gray-300 hover:text-green-400 transition-colors duration-300 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </a>
            <a 
              href="#about" 
              className="block text-gray-300 hover:text-green-400 transition-colors duration-300 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="#skills" 
              className="block text-gray-300 hover:text-green-400 transition-colors duration-300 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Skills
            </a>
            <a 
              href="#projects" 
              className="block text-gray-300 hover:text-green-400 transition-colors duration-300 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </a>
            <a 
              href="#experience" 
              className="block text-gray-300 hover:text-green-400 transition-colors duration-300 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Experience
            </a>
            <a 
              href="#education" 
              className="block text-gray-300 hover:text-green-400 transition-colors duration-300 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Education
            </a>
            <a 
              href="#contact" 
              className="block text-gray-300 hover:text-green-400 transition-colors duration-300 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
            <a 
              href="/auth" 
              className="block bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
