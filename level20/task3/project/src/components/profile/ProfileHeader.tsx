import React from 'react';
import { Link } from 'react-router-dom';
import { Edit, Github, Globe, MapPin, Twitter } from 'lucide-react';
import { useAuth, User } from '../../contexts/AuthContext';

interface ProfileHeaderProps {
  user: User;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  const { currentUser } = useAuth();
  const isCurrentUser = currentUser?.id === user.id;
  
  // In a real app, these would come from the user object
  const socialLinks = {
    website: 'https://example.com',
    github: 'github',
    twitter: 'twitter',
    location: 'San Francisco, CA'
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      {/* Cover Image */}
      <div className="h-48 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
        {isCurrentUser && (
          <Link
            to="/profile/edit"
            className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition duration-200"
            title="Edit Profile"
          >
            <Edit className="h-5 w-5 text-slate-700" />
          </Link>
        )}
      </div>
      
      {/* Profile Info */}
      <div className="px-6 py-4 relative">
        {/* Avatar */}
        <div className="absolute -top-16 left-6 border-4 border-white rounded-full overflow-hidden shadow-lg">
          <img
            src={user.avatar || 'https://via.placeholder.com/128'}
            alt={user.name}
            className="w-32 h-32 object-cover"
          />
        </div>
        
        {/* User Info */}
        <div className="mt-16">
          <h1 className="text-2xl font-bold text-slate-900">{user.name}</h1>
          
          {/* Social Links */}
          <div className="flex flex-wrap gap-4 mt-2 text-sm text-slate-600">
            {socialLinks.website && (
              <a href={socialLinks.website} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-blue-500">
                <Globe className="h-4 w-4 mr-1" />
                Website
              </a>
            )}
            {socialLinks.github && (
              <a href={`https://github.com/${socialLinks.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-blue-500">
                <Github className="h-4 w-4 mr-1" />
                {socialLinks.github}
              </a>
            )}
            {socialLinks.twitter && (
              <a href={`https://twitter.com/${socialLinks.twitter}`} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-blue-500">
                <Twitter className="h-4 w-4 mr-1" />
                @{socialLinks.twitter}
              </a>
            )}
            {socialLinks.location && (
              <span className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {socialLinks.location}
              </span>
            )}
          </div>
          
          {/* Bio */}
          <p className="mt-4 text-slate-700">{user.bio || 'No bio provided yet.'}</p>
          
          {/* Skills */}
          {user.skills && user.skills.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-slate-700 mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-slate-100 text-slate-800 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Edit Profile Button (only shown for the current user) */}
          {isCurrentUser && (
            <div className="mt-6">
              <Link
                to="/profile/edit"
                className="inline-block bg-slate-200 hover:bg-slate-300 text-slate-800 px-4 py-2 rounded-md transition duration-200"
              >
                Edit Profile
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;