import React from 'react';
import './Footer.css';
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-contact">
          <FaMapMarkerAlt className="footer-icon" />
          <p>78th St. Apt 2R, Brooklyn, NY 11214, United States</p>
        </div>
        <div className="footer-contact">
          <FaEnvelope className="footer-icon" />
          <p>hbtestimation@qwiksolutions.com</p>
        </div>
        <div className="footer-contact">
          <FaPhone className="footer-icon" />
          <p>+44 7988 187248</p>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-left">
          <img src="Qwik-Solutions.jpeg" alt="Qwik Solutions" className="footer-logo" />
          <p>
          Qwik Solutions is an online platform connecting ambitious students and top experts from all over the world. It's a great place where people can cooperate with skilled professionals in any subject to succeed in learning or share their expertise with those who seek help. You can find an expert in any subject here on Qwik Solutions and connect with them directly via our secure chat, without intermediaries.
          </p>
        </div>
        <div className="footer-middle">
          <h4>PAGES</h4>
          <ul>
            <Link to='./'>
            <li>Home</li>
            </Link>
            <Link to='./services'>
            <li>Services</li>
            </Link>
            <Link to='./pricing'>
            <li>Pricing</li>
            </Link>
            <Link to='./review-screen'>
            <li>Reviews</li>
            </Link>
            <Link to='./blog'>
            <li>Blogs</li>
            </Link>
            <Link to='./aboutus'>
            <li>About Us</li>
            </Link>
          </ul>
        </div>
        <div className="footer-right">
          <h4>CONTACT INFORMATION</h4>
          <p>78th St. Apt 2R, Brooklyn, NY 11214, United States</p>
          <p>hbtestimation@qwiksolutions.com</p>
          <p>+44 7988 187248</p>
          <p>Contact Us</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
