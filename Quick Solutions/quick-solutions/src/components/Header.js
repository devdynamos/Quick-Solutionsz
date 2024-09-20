import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { MdAccountCircle } from 'react-icons/md';
import { FaBars } from 'react-icons/fa';
import './Header.css';

function Header() {
  const { isAuthenticated, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 769);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 769);
      if (window.innerWidth >= 769) {
        setIsMobileNavOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    logout();
    setIsSidebarOpen(false); // Close the sidebar after logout
  };

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  return (
    <header className="header">
      <div className="logo">
        {isMobileView && (
          <button className="mobile-nav-toggle" onClick={toggleMobileNav}>
            <FaBars />
          </button>
        )}
        <span className="brand">Qwik Solutions</span>
      </div>
      {isMobileView ? (
        <nav className={`mobile-nav ${isMobileNavOpen ? 'open' : ''}`}>
          <Link to="/" onClick={toggleMobileNav}>Home</Link>
          <Link to="/services" onClick={toggleMobileNav}>Services</Link>
          <Link to="/pricing" onClick={toggleMobileNav}>Pricing</Link>
          <Link to="/review-screen" onClick={toggleMobileNav}>Reviews</Link>
          <Link to="/blog" onClick={toggleMobileNav}>Blog</Link>
          <Link to="/aboutus" onClick={toggleMobileNav}>About Us</Link>
          <Link to="/order" onClick={toggleMobileNav}>ORDER NOW</Link>
          {isAuthenticated ? (
            <div className="account-menu">
              <MdAccountCircle size={24} onClick={toggleSidebar} />
              {isSidebarOpen && (
                <div className="sidebar">
                  <div className="sidebar-header">
                    <span>Hi, Muhammad Hamza!</span>
                    <button onClick={toggleSidebar} className="close-btn">&times;</button>
                  </div>
                  <div className="sidebar-content">
                    <Link to="/manage-account">Manage your Google Account</Link>
                    <Link to="/add-account">Add account</Link>
                    <button onClick={handleLogout}>Sign out</button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" onClick={toggleMobileNav}>
              <button className="btn-secondary">Login</button>
            </Link>
          )}
        </nav>
      ) : (
        <nav className="nav">
          <Link to="/">Home</Link>
          <div className="dropdown">
            <Link to="/services">Services</Link>
            <div className="dropdown-content">
              <Link to="/services/assignment-writing">Assignment Writing</Link>
              <Link to="/services/academic-writing">Academic Writing</Link>
              <Link to="/services/coursework-writing">Coursework Writing</Link>
              <Link to="/services/dissertation-writing">Dissertation Writing</Link>
              <Link to="/services/essay-writing">Essay Writing</Link>
              <Link to="/services/homework-writing">Homework Writing</Link>
              <Link to="/services/paper-writing">Paper Writing</Link>
              <Link to="/services/thesis">Thesis</Link>
              <Link to="/services/online-exams">Online Exams</Link>
            </div>
          </div>
          <Link to="/pricing">Pricing</Link>
          <Link to="/review-screen">Reviews</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/aboutus">About Us</Link>
          <Link to="/order">
            <button className="btn-primary">ORDER NOW</button>
          </Link>
          {isAuthenticated ? (
            <div className="account-menu">
              <MdAccountCircle size={24} onClick={toggleSidebar} />
              {isSidebarOpen && (
                <div className="sidebar">
                  <div className="sidebar-header">
                    <span>Hi, Muhammad Hamza!</span>
                    <button onClick={toggleSidebar} className="close-btn">&times;</button>
                  </div>
                  <div className="sidebar-content">
                    <Link to="/manage-account">Manage your Google Account</Link>
                    <Link to="/add-account">Add account</Link>
                    <button onClick={handleLogout}>Sign out</button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <button className="btn-secondary">Login</button>
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}

export default Header;
