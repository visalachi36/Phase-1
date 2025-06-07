import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Search } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { usePost } from '../contexts/PostContext';
import PostCard from '../components/posts/PostCard';
import CreatePostForm from '../components/posts/CreatePostForm';

const Home: React.FC = () => {
  const { currentUser } = useAuth();
  const { posts } = usePost();
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Extract all unique tags from posts
  const allTags = Array.from(
    new Set(
      posts
        .flatMap(post => post.tags || [])
        .filter(Boolean)
    )
  );

  // Filter posts based on search term and active tag
  const filteredPosts = posts.filter(post => {
    const matchesSearch = 
      searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.userName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTag = 
      activeTag === null || 
      (post.tags && post.tags.includes(activeTag));
    
    return matchesSearch && matchesTag;
  });

  const toggleCreatePost = () => {
    setShowCreatePost(!showCreatePost);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Developer Feed</h1>
        
        {currentUser && (
          <button
            onClick={toggleCreatePost}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center transition duration-200"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            {showCreatePost ? 'Cancel' : 'Create Post'}
          </button>
        )}
      </div>
      
      {/* Create Post Form */}
      {showCreatePost && (
        <div className="mb-6 animate-fade-in">
          <CreatePostForm />
        </div>
      )}
      
      {/* Search and Filter */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        {/* Tags Filter */}
        <div className="flex overflow-x-auto pb-2 gap-2 md:max-w-[50%]">
          <button
            onClick={() => setActiveTag(null)}
            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
              activeTag === null
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            All
          </button>
          
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                activeTag === tag
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>
      
      {/* Posts Feed */}
      <div className="space-y-6">
        {filteredPosts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-slate-600 mb-4">No posts found matching your criteria.</p>
            {!currentUser ? (
              <div>
                <p className="text-slate-600 mb-2">
                  Join the community to start sharing your projects and questions.
                </p>
                <div className="flex justify-center space-x-4">
                  <Link
                    to="/login"
                    className="px-4 py-2 bg-slate-200 text-slate-800 rounded-lg hover:bg-slate-300 transition duration-200"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            ) : !showCreatePost ? (
              <button
                onClick={toggleCreatePost}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Create Your First Post
              </button>
            ) : null}
          </div>
        ) : (
          filteredPosts.map(post => <PostCard key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
};

export default Home;