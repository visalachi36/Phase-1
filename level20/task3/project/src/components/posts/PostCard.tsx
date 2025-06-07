import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Share2, MoreHorizontal, Trash2, Edit } from 'lucide-react';
import { formatDistanceToNow } from '../../utils/dateUtils';
import { useAuth } from '../../contexts/AuthContext';
import { usePost, Post } from '../../contexts/PostContext';

interface PostCardProps {
  post: Post;
  showFullContent?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, showFullContent = false }) => {
  const { currentUser } = useAuth();
  const { likePost, unlikePost, deletePost } = usePost();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const isLiked = currentUser ? post.likes.includes(currentUser.id) : false;
  const isAuthor = currentUser ? post.userId === currentUser.id : false;

  const handleLikeToggle = async () => {
    if (!currentUser) return;
    
    setIsLiking(true);
    try {
      if (isLiked) {
        await unlikePost(post.id);
      } else {
        await likePost(post.id);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    } finally {
      setIsLiking(false);
    }
  };

  const handleDelete = async () => {
    if (!currentUser || !isAuthor) return;
    
    if (window.confirm('Are you sure you want to delete this post?')) {
      setIsDeleting(true);
      try {
        await deletePost(post.id);
      } catch (error) {
        console.error('Error deleting post:', error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const contentPreview = !showFullContent && post.content.length > 250
    ? `${post.content.substring(0, 250)}...`
    : post.content;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg mb-6">
      {/* Post Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-100">
        <Link to={`/profile/${post.userId}`} className="flex items-center space-x-3">
          <img
            src={post.userAvatar}
            alt={post.userName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-medium text-slate-800">{post.userName}</h3>
            <p className="text-xs text-slate-500">
              {formatDistanceToNow(post.createdAt)}
            </p>
          </div>
        </Link>

        {isAuthor && (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-slate-500 hover:text-slate-700 focus:outline-none"
              disabled={isDeleting}
            >
              <MoreHorizontal className="h-5 w-5" />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 py-1">
                <Link
                  to={`/post/edit/${post.id}`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  onClick={() => setShowDropdown(false)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Post
                </Link>
                <button
                  onClick={handleDelete}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                  disabled={isDeleting}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  {isDeleting ? 'Deleting...' : 'Delete Post'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Post Content */}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 text-slate-900">{post.title}</h2>
        <p className="text-slate-700 whitespace-pre-line">
          {contentPreview}
          {!showFullContent && post.content.length > 250 && (
            <Link to={`/post/${post.id}`} className="text-blue-500 hover:text-blue-700 ml-1">
              Read more
            </Link>
          )}
        </p>

        {/* Post Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block bg-slate-100 text-slate-800 text-xs px-2 py-1 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Post Actions */}
      <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
        <div className="flex space-x-6">
          <button
            onClick={handleLikeToggle}
            disabled={!currentUser || isLiking}
            className={`flex items-center space-x-1 ${
              isLiked ? 'text-red-500' : 'text-slate-500 hover:text-red-500'
            } transition-colors duration-200`}
          >
            <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
            <span>{post.likes.length}</span>
          </button>

          <Link
            to={`/post/${post.id}`}
            className="flex items-center space-x-1 text-slate-500 hover:text-blue-500 transition-colors duration-200"
          >
            <MessageCircle className="h-5 w-5" />
            <span>{post.comments.length}</span>
          </Link>

          <button className="flex items-center space-x-1 text-slate-500 hover:text-green-500 transition-colors duration-200">
            <Share2 className="h-5 w-5" />
          </button>
        </div>

        {!showFullContent && (
          <Link
            to={`/post/${post.id}`}
            className="text-sm text-blue-500 hover:text-blue-700 transition-colors duration-200"
          >
            View Details
          </Link>
        )}
      </div>
    </div>
  );
};

export default PostCard;