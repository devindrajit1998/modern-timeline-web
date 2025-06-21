
import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'LinkedIn', url: '#', icon: 'L' },
    { name: 'GitHub', url: '#', icon: 'G' },
    { name: 'Twitter', url: '#', icon: 'T' },
    { name: 'Dribbble', url: '#', icon: 'D' }
  ];

  return (
    <footer className="bg-slate-950 border-t border-slate-800/50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
          {/* Brand & Contact */}
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <div className="text-lg font-semibold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Portfolio
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-4 text-xs text-slate-400">
              <div className="flex items-center space-x-1">
                <Mail size={12} />
                <span>john.doe@example.com</span>
              </div>
              <div className="flex items-center space-x-1">
                <Phone size={12} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin size={12} />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Social Links & Copyright */}
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <div className="flex space-x-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="w-7 h-7 bg-slate-800 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-violet-500 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300"
                  aria-label={social.name}
                >
                  <span className="text-xs font-bold">{social.icon}</span>
                </a>
              ))}
            </div>
            <p className="text-slate-400 text-xs">
              © {currentYear} Portfolio. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
