import React, { useState } from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import "./Assignment.css";

function Assignment() {
  const [wordCount, setWordCount] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('24 Hours');
  const [couponCode, setCouponCode] = useState('');

  const handleWordCountChange = (event) => {
    setWordCount(event.target.value);
  };

  const handleDeliveryTimeChange = (event) => {
    setDeliveryTime(event.target.value);
  };

  const handleCouponCodeChange = (event) => {
    setCouponCode(event.target.value);
  };

  const handleGetStartedClick = () => {
    const whatsappNumber = "+447988187248";
    const whatsappUrl = `https://wa.me/${whatsappNumber}`;
    window.open(whatsappUrl, "_blank");
  };

  const calculatePrice = () => {
    let price = 40.00; // Default price
    if (couponCode === 'YOUR_DISCOUNT_CODE') {
      price = 35.00;
    }
    return price;
  };

  return (
    <>
    <Header />
    <div className="assignment-container">
      <div className="left-content">
        <h1>Get Reliable Essay Writing Service From Us</h1>
        <p>Reliable essays at your doorstep!</p>
        <p>
        Are you looking for a reliable service for writing your essays? Get original and creative content with our writers who are:
        </p>
        <ul>
          <li>✔ Subject matter experts</li>
          <li>✔ Highly experienced</li>
          <li>✔ Native Americans</li>
          <li>✔ Proficient writers</li>
        </ul>
        <button className="button get-started" onClick={handleGetStartedClick}>GET STARTED </button>
        <Link to="/order">
          <button className="order-button">ORDER NOW </button>
          </Link>
      </div>
      <div className="right-content">
        <h2>Order Now</h2>
        <h3>Calculate Your Order</h3>
        <div className="input-group">
          <label htmlFor="word-count">Words/Page:</label>
          <input
            type="text"
            id="word-count"
            value={wordCount}
            onChange={handleWordCountChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="delivery-time">Delivery:</label>
          <select
            id="delivery-time"
            value={deliveryTime}
            onChange={handleDeliveryTimeChange}
          >
            <option value="24 Hours">24 Hours</option>
            {/* Add more delivery time options here */}
          </select>
        </div>
        <div className="price">
          <span>Standard Price:</span>
          <span>${calculatePrice().toFixed(2)}</span>
        </div>
        <div className="special-price">
          <span>Special Price (Locked):</span>
          <span>Save on your first order!</span>
          <span>$35.00</span>
        </div>
        <div className="input-group">
          <label htmlFor="coupon-code">Enter Coupon Code:</label>
          <input
            type="text"
            id="coupon-code"
            value={couponCode}
            onChange={handleCouponCodeChange}
          />
        </div>
        <button className="button unlock">Unlock</button>
        <button className="button get-started" onClick={handleGetStartedClick}>GET STARTED </button>
      </div>
    </div>
    </>
  );
}

export default Assignment;
