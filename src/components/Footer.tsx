
import React from 'react';
import { Mail, Phone, MapPin, Loader2 } from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { data: profile, isLoading, isError } = useProfile();

  const socialLinks = [
    { name: 'LinkedIn', url: '#', icon: 'L' },
    { name: 'GitHub', url: '#', icon: 'G' },
    { name: 'Twitter', url: '#', icon: 'T' },
    { name: 'Dribbble', url: '#', icon: 'D' }
  ];

  if (isLoading) {
    return (
      <footer className="bg-gray-950 border-t border-emerald-500/20">
        <div className="container mx-auto px-4 py-8 flex justify-center items-center">
          <Loader2 className="animate-spin text-emerald-400" size={32} />
        </div>
      </footer>
    );
  }

  if (isError) {
    return (
      <footer className="bg-gray-950 border-t border-red-500/20">
        <div className="container mx-auto px-4 py-8 text-center text-red-400">
          Could not load profile information.
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-gray-950 border-t border-emerald-500/20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Brand & Contact */}
          <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-6 animate-slide-in-left">
            <div className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
              {profile?.name || 'Portfolio'}
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-400">
              <div className="flex items-center space-x-2 hover:text-emerald-400 transition-colors duration-300">
                <Mail size={14} />
                <a href={`mailto:${profile?.email}`}>{profile?.email || 'john.doe@example.com'}</a>
              </div>
              <div className="flex items-center space-x-2 hover:text-emerald-400 transition-colors duration-300">
                <Phone size={14} />
                <span>{profile?.phone || '+1 (555) 123-4567'}</span>
              </div>
              <div className="flex items-center space-x-2 hover:text-emerald-400 transition-colors duration-300">
                <MapPin size={14} />
                <span>{profile?.address || 'San Francisco, CA'}</span>
              </div>
            </div>
          </div>

          {/* Social Links & Copyright */}
          <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-6 animate-slide-in-right">
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={social.name}
                  href={social.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gray-800 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-green-400 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 hover-lift"
                  aria-label={social.name}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="text-sm font-bold">{social.icon}</span>
                </a>
              ))}
            </div>
            <p className="text-gray-400 text-sm">
              © {currentYear} {profile?.name || 'Portfolio'}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
