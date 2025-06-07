import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { usePost } from '../../contexts/PostContext';
import { formatDistanceToNow } from '../../utils/dateUtils';
import { Trash2 } from 'lucide-react';

interface CommentSectionProps {
  postId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const { currentUser } = useAuth();
  const { getPost, addComment, deleteComment } = usePost();
  const [commentContent, setCommentContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const post = getPost(postId);
  
  if (!post) {
    return <div>Post not found</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!commentContent.trim()) {
      setError('Comment cannot be empty');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      await addComment(postId, commentContent);
      setCommentContent('');
    } catch (err) {
      setError('Failed to add comment. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (commentId: string) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        await deleteComment(postId, commentId);
      } catch (err) {
        console.error('Failed to delete comment:', err);
      }
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4 text-slate-800">
        Comments ({post.comments.length})
      </h3>

      {/* Comment Form */}
      {currentUser ? (
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex space-x-3">
            <img
              src={currentUser.avatar || 'https://via.placeholder.com/40'}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <textarea
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                placeholder="Add a comment..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                rows={3}
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 disabled:opacity-50"
                >
                  {isSubmitting ? 'Posting...' : 'Post Comment'}
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <p className="text-center text-slate-600">
            Please <a href="/login" className="text-blue-500 hover:text-blue-700">log in</a> to comment
          </p>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {post.comments.length === 0 ? (
          <p className="text-center text-gray-500 py-4">No comments yet. Be the first to comment!</p>
        ) : (
          post.comments.map((comment) => (
            <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between">
                <div className="flex space-x-3">
                  <img
                    src={comment.userAvatar || 'https://via.placeholder.com/40'}
                    alt={comment.userName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center">
                      <h4 className="font-medium text-slate-800">{comment.userName}</h4>
                      <span className="text-xs text-slate-500 ml-2">
                        {formatDistanceToNow(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-slate-700 mt-1">{comment.content}</p>
                  </div>
                </div>
                
                {currentUser && (currentUser.id === comment.userId || currentUser.id === post.userId) && (
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="text-red-400 hover:text-red-600"
                    title="Delete comment"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;