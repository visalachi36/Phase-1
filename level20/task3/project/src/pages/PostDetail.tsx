import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { usePost } from '../contexts/PostContext';
import PostCard from '../components/posts/PostCard';
import CommentSection from '../components/posts/CommentSection';

const PostDetail: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const { getPost } = usePost();
  const navigate = useNavigate();
  
  if (!postId) {
    return <div>Post ID is required</div>;
  }
  
  const post = getPost(postId);
  
  if (!post) {
    return (
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 text-center">
        <h2 className="text-xl font-semibold text-red-600 mb-2">Post Not Found</h2>
        <p className="text-slate-700 mb-4">The post you're looking for doesn't exist or has been removed.</p>
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
      <div className="mb-6 flex items-center">
        <button
          onClick={() => navigate(-1)}
          className="mr-2 text-slate-600 hover:text-slate-900 transition duration-200"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <Link
          to="/"
          className="text-slate-600 hover:text-slate-900 transition duration-200"
        >
          Back to Feed
        </Link>
      </div>
      
      <PostCard post={post} showFullContent={true} />
      
      <CommentSection postId={postId} />
    </div>
  );
};

export default PostDetail;