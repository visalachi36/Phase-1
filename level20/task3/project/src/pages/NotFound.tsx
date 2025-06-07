import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Home } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="max-w-md mx-auto text-center">
      <Code className="h-16 w-16 text-blue-500 mx-auto mb-4" />
      
      <h1 className="text-4xl font-bold text-slate-900 mb-2">404</h1>
      <p className="text-xl text-slate-700 mb-6">Page not found</p>
      
      <p className="text-slate-600 mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      
      <Link
        to="/"
        className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
      >
        <Home className="h-5 w-5 mr-2" />
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;