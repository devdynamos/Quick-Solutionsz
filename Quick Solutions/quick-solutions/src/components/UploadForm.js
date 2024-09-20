import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [plagiarismResult, setPlagiarismResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setPlagiarismResult(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <h2>Upload File to Check Plagiarism</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {plagiarismResult && (
        <div>
          <h3>Plagiarism Check Result</h3>
          <p><strong>Original Text:</strong></p>
          <p>{plagiarismResult.text}</p>
          <p><strong>Plagiarism Result:</strong></p>
          <p>{plagiarismResult.plagiarism}</p>
        </div>
      )}
    </div>
  );
};

export default UploadForm;
