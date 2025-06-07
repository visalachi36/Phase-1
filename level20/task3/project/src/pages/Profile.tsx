import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth, User } from '../contexts/AuthContext';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileTabs from '../components/profile/ProfileTabs';

const Profile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Mock users data for demonstration
  const mockUsers = [
    {
      id: '1',
      name: 'Jane Developer',
      email: 'jane@example.com',
      bio: 'Full-stack developer with 5 years of experience in React and Node.js',
      skills: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      id: '2',
      name: 'John Coder',
      email: 'john@example.com',
      bio: 'Frontend developer passionate about UI/UX',
      skills: ['JavaScript', 'Vue.js', 'CSS', 'Figma'],
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    }
  ];

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        const foundUser = mockUsers.find(u => u.id === userId);
        
        if (!foundUser) {
          // If user ID doesn't match mock data, check if it's the current user
          if (currentUser && currentUser.id === userId) {
            setUser(currentUser);
          } else {
            setError('User not found');
          }
        } else {
          setUser(foundUser);
        }
      } catch (err) {
        setError('Failed to load user profile');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    } else {
      setError('User ID is required');
      setLoading(false);
    }
  }, [userId, currentUser]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 text-center">
        <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
        <p className="text-slate-700 mb-4">{error || 'User not found'}</p>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <ProfileHeader user={user} />
      <ProfileTabs userId={user.id} />
    </div>
  );
};

export default Profile;