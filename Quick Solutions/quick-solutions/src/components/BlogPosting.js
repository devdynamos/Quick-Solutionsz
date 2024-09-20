import React from 'react';
import './BlogPosting.css';
import { Link } from 'react-router-dom';

const Blog = () => {
  return (
    <div className="blog-container">
      <h2>Share Your Blog</h2>
      <p>Tell us what you thought about our Blogs.</p>
      <Link to= "/blog-posting-form">
      <button className="blog-write-review">Write Your Blog</button>
      </Link>
    </div>
  );
}

export default Blog;
