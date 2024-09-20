import React, { useState } from 'react';
import './Video.css'; // Import your CSS file

function Video() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="app-container">
      <button className="open-modal-button" onClick={handleModalOpen}>
        How It Works
      </button>

      {isModalOpen && (
        <div className="modal-container">
          <div className="modal-content">
            <span className="close-modal-button" onClick={handleModalClose}>
              &times;
            </span>
            <h2 className="modal-title">How it works</h2>
            <div className="video-container">
              {/* Replace with your actual video source */}
              <video
                className="video-player"
                controls
                src="qwik-solutions.mp4"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Video;