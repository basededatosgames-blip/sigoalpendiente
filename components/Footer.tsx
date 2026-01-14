
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-20 border-t border-white/5 bg-black">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg"></div>
            <span className="text-xl font-bold tracking-tighter uppercase">ArtVolution</span>
          </div>
          <p className="text-gray-500 max-w-sm mb-8">
            Empowering the next generation of creative minds through seamless integration of human intuition and artificial intelligence.
          </p>
          <div className="flex space-x-4">
            {['Twitter', 'Instagram', 'Discord', 'GitHub'].map(social => (
              <a key={social} href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-indigo-600 transition-colors">
                <span className="sr-only">{social}</span>
                <div className="w-4 h-4 bg-gray-400 rounded-sm"></div>
              </a>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-bold mb-6">Product</h4>
          <ul className="space-y-4 text-gray-500 text-sm">
            <li><a href="#" className="hover:text-white">Changelog</a></li>
            <li><a href="#" className="hover:text-white">Documentation</a></li>
            <li><a href="#" className="hover:text-white">Showcase</a></li>
            <li><a href="#" className="hover:text-white">Pricing</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold mb-6">Company</h4>
          <ul className="space-y-4 text-gray-500 text-sm">
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Blog</a></li>
            <li><a href="#" className="hover:text-white">Careers</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/5 text-center text-xs text-gray-600">
        © 2024 ArtVolution AI. All rights reserved. Built for the dreamers.
      </div>
    </footer>
  );
};

export default Footer;
