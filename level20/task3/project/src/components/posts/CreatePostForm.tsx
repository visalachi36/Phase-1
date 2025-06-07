import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePost } from '../../contexts/PostContext';
import { Code, Image, Link as LinkIcon, List } from 'lucide-react';

const CreatePostForm: React.FC = () => {
  const { createPost } = usePost();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{title?: string; content?: string}>({});

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const insertFormatting = (type: string) => {
    let insertText = '';
    let selectionStart = 0;
    let selectionEnd = 0;

    switch (type) {
      case 'code':
        insertText = '```\n// your code here\n```';
        selectionStart = 4;
        selectionEnd = 20;
        break;
      case 'list':
        insertText = '- Item 1\n- Item 2\n- Item 3';
        selectionStart = 2;
        selectionEnd = 8;
        break;
      case 'link':
        insertText = '[Link text](https://example.com)';
        selectionStart = 1;
        selectionEnd = 10;
        break;
      case 'image':
        insertText = '![Alt text](https://example.com/image.jpg)';
        selectionStart = 2;
        selectionEnd = 10;
        break;
      default:
        return;
    }

    const textArea = document.getElementById('post-content') as HTMLTextAreaElement;
    if (!textArea) return;

    const currentPos = textArea.selectionStart;
    const newContent = content.substring(0, currentPos) + insertText + content.substring(textArea.selectionEnd);
    
    setContent(newContent);

    // Focus and set selection after state update
    setTimeout(() => {
      textArea.focus();
      textArea.setSelectionRange(currentPos + selectionStart, currentPos + selectionEnd);
    }, 0);
  };

  const validateForm = () => {
    const newErrors: {title?: string; content?: string} = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.trim().length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    }

    if (!content.trim()) {
      newErrors.content = 'Content is required';
    } else if (content.trim().length < 10) {
      newErrors.content = 'Content must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const post = await createPost(title, content, tags.length > 0 ? tags : undefined);
      navigate(`/post/${post.id}`);
    } catch (error) {
      console.error('Failed to create post:', error);
      alert('Failed to create post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-slate-900">Create Post</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="post-title" className="block text-sm font-medium text-slate-700 mb-1">
            Title
          </label>
          <input
            id="post-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your post a title"
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="post-content" className="block text-sm font-medium text-slate-700 mb-1">
            Content
          </label>
          
          <div className="flex mb-2 space-x-2">
            <button
              type="button"
              onClick={() => insertFormatting('code')}
              className="p-2 text-slate-600 hover:text-blue-500 border border-gray-300 rounded"
              title="Insert code block"
            >
              <Code className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('list')}
              className="p-2 text-slate-600 hover:text-blue-500 border border-gray-300 rounded"
              title="Insert list"
            >
              <List className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('link')}
              className="p-2 text-slate-600 hover:text-blue-500 border border-gray-300 rounded"
              title="Insert link"
            >
              <LinkIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('image')}
              className="p-2 text-slate-600 hover:text-blue-500 border border-gray-300 rounded"
              title="Insert image"
            >
              <Image className="h-5 w-5" />
            </button>
          </div>
          
          <textarea
            id="post-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post content here... You can use markdown formatting!"
            rows={10}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono ${
              errors.content ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.content && <p className="mt-1 text-sm text-red-500">{errors.content}</p>}
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Tags
          </label>
          <div className="flex items-center">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              placeholder="Add tags (press Enter)"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="ml-2 bg-slate-200 text-slate-800 px-4 py-3 rounded-lg hover:bg-slate-300 transition duration-200"
            >
              Add
            </button>
          </div>
          
          {tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="mr-2 px-4 py-2 text-slate-700 bg-slate-200 rounded-lg hover:bg-slate-300 transition duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 disabled:opacity-50"
          >
            {isSubmitting ? 'Creating...' : 'Create Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostForm;