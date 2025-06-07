import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth, User } from './AuthContext';

// Define post and comment types
export interface Comment {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  createdAt: Date;
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  title: string;
  content: string;
  likes: string[]; // Array of user IDs who liked the post
  comments: Comment[];
  createdAt: Date;
  tags?: string[];
}

interface PostContextType {
  posts: Post[];
  getUserPosts: (userId: string) => Post[];
  getPost: (postId: string) => Post | undefined;
  createPost: (title: string, content: string, tags?: string[]) => Promise<Post>;
  updatePost: (postId: string, title: string, content: string, tags?: string[]) => Promise<Post>;
  deletePost: (postId: string) => Promise<void>;
  likePost: (postId: string) => Promise<void>;
  unlikePost: (postId: string) => Promise<void>;
  addComment: (postId: string, content: string) => Promise<Comment>;
  deleteComment: (postId: string, commentId: string) => Promise<void>;
  loading: boolean;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export function usePost() {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error('usePost must be used within a PostProvider');
  }
  return context;
}

interface PostProviderProps {
  children: ReactNode;
}

export function PostProvider({ children }: PostProviderProps) {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock post data for demonstration
  const initialPosts: Post[] = [
    {
      id: '1',
      userId: '1',
      userName: 'Jane Developer',
      userAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      title: 'Built a React Component Library',
      content: 'Just finished building my first component library with React and Storybook. Check it out and let me know what you think!',
      likes: ['2'],
      comments: [
        {
          id: '1',
          postId: '1',
          userId: '2',
          userName: 'John Coder',
          userAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          content: 'This looks amazing! Could you share how you set up your build process?',
          createdAt: new Date('2023-09-10T14:30:00')
        }
      ],
      createdAt: new Date('2023-09-10T10:15:00'),
      tags: ['React', 'UI', 'Component Library']
    },
    {
      id: '2',
      userId: '2',
      userName: 'John Coder',
      userAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      title: 'Help with TypeScript Generics',
      content: 'I\'m struggling to understand how to use TypeScript generics with React hooks. Can someone explain with a simple example?',
      likes: ['1'],
      comments: [
        {
          id: '2',
          postId: '2',
          userId: '1',
          userName: 'Jane Developer',
          userAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
          content: 'Generics are like placeholders for types. Here\'s a simple example: `function identity<T>(arg: T): T { return arg; }`',
          createdAt: new Date('2023-09-11T09:45:00')
        }
      ],
      createdAt: new Date('2023-09-11T08:20:00'),
      tags: ['TypeScript', 'React', 'Hooks']
    },
    {
      id: '3',
      userId: '1',
      userName: 'Jane Developer',
      userAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      title: 'My VS Code Setup for Frontend Development',
      content: 'I\'ve customized my VS Code setup for optimal frontend development. Here are my favorite extensions and settings...',
      likes: [],
      comments: [],
      createdAt: new Date('2023-09-12T16:45:00'),
      tags: ['VS Code', 'Tools', 'Frontend']
    }
  ];

  // Load posts from localStorage or use initial mock data
  useEffect(() => {
    const storedPosts = localStorage.getItem('posts');
    if (storedPosts) {
      // Parse dates correctly
      const parsedPosts = JSON.parse(storedPosts, (key, value) => {
        if (key === 'createdAt') {
          return new Date(value);
        }
        return value;
      });
      setPosts(parsedPosts);
    } else {
      setPosts(initialPosts);
    }
    setLoading(false);
  }, []);

  // Save posts to localStorage whenever they change
  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem('posts', JSON.stringify(posts));
    }
  }, [posts]);

  // Get posts by user ID
  const getUserPosts = (userId: string) => {
    return posts.filter(post => post.userId === userId);
  };

  // Get post by ID
  const getPost = (postId: string) => {
    return posts.find(post => post.id === postId);
  };

  // Create a new post
  const createPost = async (title: string, content: string, tags?: string[]) => {
    if (!currentUser) {
      throw new Error('You must be logged in to create a post');
    }

    const newPost: Post = {
      id: String(Date.now()),
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar || '',
      title,
      content,
      likes: [],
      comments: [],
      createdAt: new Date(),
      tags
    };

    setPosts(prevPosts => [newPost, ...prevPosts]);
    return newPost;
  };

  // Update an existing post
  const updatePost = async (postId: string, title: string, content: string, tags?: string[]) => {
    if (!currentUser) {
      throw new Error('You must be logged in to update a post');
    }

    const postIndex = posts.findIndex(post => post.id === postId);
    
    if (postIndex === -1) {
      throw new Error('Post not found');
    }

    if (posts[postIndex].userId !== currentUser.id) {
      throw new Error('You can only update your own posts');
    }

    const updatedPost = {
      ...posts[postIndex],
      title,
      content,
      tags
    };

    const updatedPosts = [...posts];
    updatedPosts[postIndex] = updatedPost;
    setPosts(updatedPosts);

    return updatedPost;
  };

  // Delete a post
  const deletePost = async (postId: string) => {
    if (!currentUser) {
      throw new Error('You must be logged in to delete a post');
    }

    const post = posts.find(p => p.id === postId);
    
    if (!post) {
      throw new Error('Post not found');
    }

    if (post.userId !== currentUser.id) {
      throw new Error('You can only delete your own posts');
    }

    setPosts(prevPosts => prevPosts.filter(p => p.id !== postId));
  };

  // Like a post
  const likePost = async (postId: string) => {
    if (!currentUser) {
      throw new Error('You must be logged in to like a post');
    }

    const postIndex = posts.findIndex(post => post.id === postId);
    
    if (postIndex === -1) {
      throw new Error('Post not found');
    }

    // Check if user already liked the post
    if (posts[postIndex].likes.includes(currentUser.id)) {
      return; // User already liked the post
    }

    const updatedPost = {
      ...posts[postIndex],
      likes: [...posts[postIndex].likes, currentUser.id]
    };

    const updatedPosts = [...posts];
    updatedPosts[postIndex] = updatedPost;
    setPosts(updatedPosts);
  };

  // Unlike a post
  const unlikePost = async (postId: string) => {
    if (!currentUser) {
      throw new Error('You must be logged in to unlike a post');
    }

    const postIndex = posts.findIndex(post => post.id === postId);
    
    if (postIndex === -1) {
      throw new Error('Post not found');
    }

    // Check if user liked the post
    if (!posts[postIndex].likes.includes(currentUser.id)) {
      return; // User didn't like the post
    }

    const updatedPost = {
      ...posts[postIndex],
      likes: posts[postIndex].likes.filter(userId => userId !== currentUser.id)
    };

    const updatedPosts = [...posts];
    updatedPosts[postIndex] = updatedPost;
    setPosts(updatedPosts);
  };

  // Add a comment to a post
  const addComment = async (postId: string, content: string) => {
    if (!currentUser) {
      throw new Error('You must be logged in to comment');
    }

    const postIndex = posts.findIndex(post => post.id === postId);
    
    if (postIndex === -1) {
      throw new Error('Post not found');
    }

    const newComment: Comment = {
      id: String(Date.now()),
      postId,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar || '',
      content,
      createdAt: new Date()
    };

    const updatedPost = {
      ...posts[postIndex],
      comments: [...posts[postIndex].comments, newComment]
    };

    const updatedPosts = [...posts];
    updatedPosts[postIndex] = updatedPost;
    setPosts(updatedPosts);

    return newComment;
  };

  // Delete a comment
  const deleteComment = async (postId: string, commentId: string) => {
    if (!currentUser) {
      throw new Error('You must be logged in to delete a comment');
    }

    const postIndex = posts.findIndex(post => post.id === postId);
    
    if (postIndex === -1) {
      throw new Error('Post not found');
    }

    const comment = posts[postIndex].comments.find(c => c.id === commentId);
    
    if (!comment) {
      throw new Error('Comment not found');
    }

    if (comment.userId !== currentUser.id && posts[postIndex].userId !== currentUser.id) {
      throw new Error('You can only delete your own comments or comments on your posts');
    }

    const updatedPost = {
      ...posts[postIndex],
      comments: posts[postIndex].comments.filter(c => c.id !== commentId)
    };

    const updatedPosts = [...posts];
    updatedPosts[postIndex] = updatedPost;
    setPosts(updatedPosts);
  };

  const value = {
    posts,
    getUserPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
    likePost,
    unlikePost,
    addComment,
    deleteComment,
    loading
  };

  return (
    <PostContext.Provider value={value}>
      {children}
    </PostContext.Provider>
  );
}