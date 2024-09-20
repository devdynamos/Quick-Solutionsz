import React from 'react';
import Header from './Header';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <>
      <Header />
      <div className="about-us-container">
        <div className="about-us-content">
          <h1 className="about-us-heading">About Us</h1>
          <p className="about-us-text">
            Qwik Solutions is an online platform connecting ambitious students and top
            experts from all over the world. It's a great place where people can
            cooperate with skilled professionals in any subject to succeed in
            learning or share their expertise with those who seek help. You can
            find an expert in any subject here on Qwik Solutions and connect with them
            directly via our secure chat, without intermediaries.
          </p>
        </div>
        <div className="about-us-images">
          <div className="about-us-image-container">
            <img
              className="about-us-image"
              src="img.jpg"
              alt="Group of students working together"
            />
          </div>
          <div className="about-us-image-container">
            <img
              className="about-us-image"
              src="question.jpeg"
              alt="Student asking a question to an expert"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
