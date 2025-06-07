import React, { useState } from 'react';
import { usePost } from '../../contexts/PostContext';
import PostCard from '../posts/PostCard';

interface ProfileTabsProps {
  userId: string;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ userId }) => {
  const [activeTab, setActiveTab] = useState('posts');
  const { getUserPosts, posts } = usePost();
  
  const userPosts = getUserPosts(userId);
  
  // Calculate liked posts by looking at all posts the user has liked
  const likedPosts = posts.filter(post => post.likes.includes(userId));
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('posts')}
          className={`flex-1 py-4 text-center transition duration-200 ${
            activeTab === 'posts'
              ? 'text-blue-500 border-b-2 border-blue-500 font-medium'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Posts ({userPosts.length})
        </button>
        <button
          onClick={() => setActiveTab('liked')}
          className={`flex-1 py-4 text-center transition duration-200 ${
            activeTab === 'liked'
              ? 'text-blue-500 border-b-2 border-blue-500 font-medium'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Liked Posts ({likedPosts.length})
        </button>
      </div>
      
      {/* Tab Content */}
      <div className="p-4">
        {activeTab === 'posts' && (
          <div>
            {userPosts.length === 0 ? (
              <div className="text-center py-6 text-slate-500">
                No posts yet.
              </div>
            ) : (
              <div className="space-y-6">
                {userPosts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'liked' && (
          <div>
            {likedPosts.length === 0 ? (
              <div className="text-center py-6 text-slate-500">
                No liked posts yet.
              </div>
            ) : (
              <div className="space-y-6">
                {likedPosts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileTabs;