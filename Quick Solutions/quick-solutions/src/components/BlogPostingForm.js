import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import './BlogPostingForm.css';

const BlogPostingForm = () => {
  const [title, setTitle] = useState('');
  const [images, setImages] = useState([]);
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const onDrop = (acceptedFiles) => {
    setImages([...images, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*', multiple: true });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    images.forEach((image) => {
      formData.append('images', image); // Ensure 'images' matches the multer field name
    });
    formData.append('content', content);

    try {
      await axios.post('http://localhost:5000/api/blogs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Blog submitted successfully!');
      setTitle('');
      setImages([]);
      setContent('');
      setError('');
    } catch (error) {
      console.error('Error submitting blog:', error);
      setError('Failed to submit blog. Please try again later.');
    }
  };

  return (
    <form className="blog-form" onSubmit={handleSubmit}>
      <h2>Post Your Blog</h2>

      <label htmlFor="title">Title</label>
      <input 
        type="text" 
        id="title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        required 
      />

      <label>Upload Images</label>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some images here, or click to select images</p>
      </div>
      <div className="images-preview">
        {images.map((file, index) => (
          <img key={index} src={URL.createObjectURL(file)} alt={`preview ${index}`} />
        ))}
      </div>

      <label htmlFor="content">Content</label>
      <ReactQuill 
        value={content} 
        onChange={setContent} 
        modules={BlogPostingForm.modules} 
        formats={BlogPostingForm.formats}
      />

      {error && <p className="error">{error}</p>}

      <button type="submit">Submit</button>
    </form>
  );
};

BlogPostingForm.modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['clean']
  ],
};

BlogPostingForm.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
];

export default BlogPostingForm;
