
import React, { useState, useEffect } from 'react';
import { Menu, X, Code2 } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#experience', label: 'Experience' },
    { href: '#education', label: 'Education' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
      scrolled 
        ? 'bg-gray-950/90 backdrop-blur-xl border-b border-emerald-500/20 shadow-lg shadow-emerald-500/5' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <div className="flex items-center gap-3 group animate-slide-in-left">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-400 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <div className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
              Portfolio
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2 animate-slide-in-right">
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-gray-300 hover:text-emerald-300 hover:bg-emerald-900/20 rounded-lg transition-all duration-300 relative group font-medium"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.label}
                <span className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-green-400 group-hover:w-8 group-hover:left-1/2 group-hover:-translate-x-1/2 transition-all duration-300"></span>
              </a>
            ))}
            <a
              href="/auth"
              className="ml-6 px-6 py-2 bg-gradient-to-r from-emerald-500 to-green-400 text-white rounded-lg hover:from-emerald-600 hover:to-green-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/30 hover-lift font-medium"
            >
              Admin
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-emerald-300 hover:bg-emerald-900/30 rounded-lg transition-all duration-300"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-500 ease-in-out ${
          isMenuOpen 
            ? 'max-h-[400px] opacity-100 visible' 
            : 'max-h-0 opacity-0 invisible'
        } overflow-hidden`}>
          <nav className="py-4 space-y-2 border-t border-emerald-500/20 bg-gray-950/95 backdrop-blur-xl rounded-b-xl">
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                className="block px-4 py-3 text-gray-300 hover:text-emerald-300 hover:bg-emerald-900/30 rounded-lg transition-all duration-300 mx-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.label}
              </a>
            ))}
            <div className="mx-2 pt-2">
              <a
                href="/auth"
                className="block px-4 py-3 bg-gradient-to-r from-emerald-500 to-green-400 text-white rounded-lg hover:from-emerald-600 hover:to-green-500 transition-all duration-300 text-center font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
