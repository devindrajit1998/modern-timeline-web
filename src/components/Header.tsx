
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-slate-950/90 backdrop-blur-lg border-b border-slate-800/50 shadow-lg shadow-black/20' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-14 lg:h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 group">
            <div className="w-7 h-7 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
              <Code2 className="w-4 h-4 text-white" />
            </div>
            <div className="text-lg font-semibold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Portfolio
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3 py-1.5 text-sm text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-md transition-all duration-300 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 group-hover:w-6 group-hover:left-1/2 group-hover:-translate-x-1/2 transition-all duration-300"></span>
              </a>
            ))}
            <a
              href="/auth"
              className="ml-3 px-4 py-1.5 text-sm bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-md hover:from-indigo-600 hover:to-violet-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-indigo-500/20"
            >
              Admin
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-md transition-all duration-300"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'max-h-[400px] opacity-100 visible' 
            : 'max-h-0 opacity-0 invisible'
        } overflow-hidden`}>
          <nav className="py-3 space-y-1 border-t border-slate-800/50 bg-slate-950/95 backdrop-blur-lg rounded-b-lg">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-md transition-all duration-300 mx-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="mx-2 pt-2">
              <a
                href="/auth"
                className="block px-3 py-2 text-sm bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-md hover:from-indigo-600 hover:to-violet-600 transition-all duration-300 text-center"
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
