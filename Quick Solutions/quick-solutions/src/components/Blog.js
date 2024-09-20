import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Blog.css';
import Header from './Header';
import Footer from './Footer';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blogs');
        console.log('Fetched blogs:', response.data);
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <>
    <Header />
    <div className="blog-list">
      <h2 className='title-blogs'>Latest Blogs</h2><br></br>
      <div className="blog-title"></div><br></br>
      {blogs.length > 0 ? (
        blogs.map((blog, index) => (
          <div key={index} className="blog-post">
            <Link to={`/blog/${blog.id}`} className="blog-post-title">
              <h3>{blog.title}</h3>
            </Link>
            {blog.images && blog.images.length > 0 && (
              <img
                src={`http://localhost:5000${blog.images[0]}`}
                alt={blog.title}
                className="blog-post-image"
              />
            )}
          </div>
        ))
      ) : (
        <p className="no-blogs-message">No blogs available.</p>
      )}

      <div className="recent-posts">
        <h2 className="blog-titley">Recent Posts</h2>
        {blogs.length > 0 ? (
          blogs.slice(0, 4).map((blog, index) => ( // Limit to maximum 4 recent posts
            <div key={index} className="recent-post">
              <img
                src={`http://localhost:5000${blog.images[0]}`}
                alt={blog.title}
                className="recent-post-image"
              />
              <br></br>
              <Link to={`/blog/${blog.id}`} className="recent-post-title">
                {blog.title}
              </Link>
            </div>
          ))
        ) : (
          <p className="no-blogs-message">No recent posts available.</p>
        )}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default BlogList;
