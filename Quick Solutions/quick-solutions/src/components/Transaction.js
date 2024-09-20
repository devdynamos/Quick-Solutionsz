import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51PR9BhJjgfEhmVRNSkPHIqqS8OeHluPMt4aiQO8EOdRzEO2D58uIwtm9JEACIYHwNyYMjhageFQl6YS9Z0fcPpje00OIOyenxP'); // Replace with your own Stripe public key

const Transaction = () => {
  const location = useLocation();
  const { pages, price, discount, educationLevel, deadline, type } = location.state;

  const handleClick = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/create-checkout-session', {
        price,
        discount,
      });
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: data.id });
    } catch (error) {
      console.error("Error creating checkout session: ", error);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Make Transaction</h2>
        <p style={priceStyle}>
          Pages: {pages} <br />
          Price: <span style={priceValueStyle}>${price.toFixed(2)}</span> <br />
          Discount: <span style={priceValueStyle}>-${discount.toFixed(2)}</span> <br />
          Total: <span style={priceValueStyle}>${(price - discount).toFixed(2)}</span> <br />
          Education Level: {educationLevel} <br />
          Deadline: {deadline} <br />
          Type: {type} <br />
        </p>
        <form onSubmit={handleClick}>
          <button type="submit" style={buttonStyle}>
            BUY NOW
          </button>
        </form>
      </div>
    </div>
  );
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};

const cardStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  width: '300px',
};

const titleStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  marginBottom: '10px',
};

const priceStyle = {
  fontSize: '1rem',
  marginBottom: '15px',
};

const priceValueStyle = {
  color: 'red',
  fontWeight: 'bold',
};

const buttonStyle = {
  backgroundColor: '#673AB7',
  color: '#fff',
  padding: '10px 20px',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '1rem',
  fontWeight: 'bold',
};

export default Transaction;
