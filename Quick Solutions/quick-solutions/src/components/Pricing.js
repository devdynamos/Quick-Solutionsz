import React from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import './Pricing.css'; // Import CSS file for styling
import Footer from './Footer';

const Pricing = () => {
  return (
    <>
    <Header />
    <div className="pricing-container">
      <h1>Packages</h1>
      <p>Take a look at the brilliant packages we offer for your convenience!</p>
      <div className="pricing-options">
        <div className="pricing-option standard">
          <h2>Standard</h2>
          <h3>(100 Words)</h3>
          <div className="price">
            $ 11.49
          </div>
          <ul>
            <li> Table of Content ($18.31)</li>
            <li> Abstract ($3.8)</li>
            <li> Unlimited Revisions ($12.2)</li>
            <li> Outline ($23.5)</li>
            <li> Plagiarism Report ($12.1)</li>
            <li> Quality Review by PHD Writer ($9.9)</li>
          </ul>
          <Link to="/order">
          <button className="order-button">ORDER NOW </button>
          </Link>
        </div>

        <div className="pricing-option merit">
          <h2>Merit</h2>
          <h3>(100 Words)</h3>
          <div className="price">
            $ 12.75
          </div>
          <ul>
            <li> Table of Content ($18.31)</li>
            <li> Abstract ($3.8)</li>
            <li> Unlimited Revisions ($12.2)</li>
            <li> Outline ($23.5)</li>
            <li> Plagiarism Report ($12.1)</li>
            <li> Quality Review by PHD Writer ($9.9)</li>
          </ul>
          <Link to="/order">
          <button className="order-button">ORDER NOW </button>
          </Link>
        </div>

        <div className="pricing-option distinction">
          <h2>Distinction</h2>
          <h3>(100 Words)</h3>
          <div className="price">
            $ 15.00
          </div>
          <ul>
            <li> Table of Content ($18.31)</li>
            <li> Abstract ($3.8)</li>
            <li> Unlimited Revisions ($12.2)</li>
            <li> Outline ($23.5)</li>
            <li> Plagiarism Report ($12.1)</li>
            <li> Quality Review by PHD Writer ($9.9)</li>
          </ul>
          <Link to="/order">
          <button className="order-button">ORDER NOW </button>
          </Link>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Pricing;