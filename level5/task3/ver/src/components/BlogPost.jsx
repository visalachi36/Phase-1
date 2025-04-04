import React from "react";
import { useParams } from "react-router-dom";
import blogPosts from "../data/blogData";
import "../styles/BlogPost.css";

const BlogPost = () => {
  const { id } = useParams();
  const post = blogPosts.find((post) => post.id === id);

  if (!post) {
    return <h2 className="not-found">Blog post not found!</h2>;
  }

  return (
    <div className="blog-post">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
};

export default BlogPost;
