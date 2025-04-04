import React from "react";
import { Link } from "react-router-dom";
import blogPosts from "../data/blogData";
import "../styles/BlogList.css";

const BlogList = () => {
  return (
    <div className="blog-list">
      <h1>Simple Blog</h1>
      {blogPosts.map((post) => (
        <div key={post.id} className="blog-item">
          <h2>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
          </h2>
          <p>{post.shortDescription}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
