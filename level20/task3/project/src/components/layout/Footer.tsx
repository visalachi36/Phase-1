import React from 'react';
import { Code, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Code className="h-6 w-6 text-blue-400" />
            <span className="text-xl font-bold">DevConnect</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:space-x-8 items-center">
            <div className="flex space-x-4 mb-4 md:mb-0">
              <a href="#" className="text-slate-300 hover:text-white transition duration-300">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-300 hover:text-white transition duration-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-300 hover:text-white transition duration-300">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
            
            <div className="text-sm text-slate-400">
              © {new Date().getFullYear()} DevConnect. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;