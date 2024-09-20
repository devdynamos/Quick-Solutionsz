import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ReviewScreen.css';
import axios from 'axios';
import Header from './Header';

function ReviewScreen() {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 8; // Number of reviews per page

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reviews');
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  // Get current reviews
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (!Array.isArray(reviews)) {
    return <div>Loading...</div>;
  }

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<i key={i} className="fas fa-star"></i>);
      } else {
        stars.push(<i key={i} className="far fa-star"></i>);
      }
    }
    return stars;
  };

  return (
    <>
      <Header />
      <div className="review-container">
        <h2>Customer Reviews</h2>
        <div className="reviews-grid">
          {currentReviews.map((review, index) => {
            // Determine if this review is in the second row
            const isSecondRowLeft = index === 3;
            const isSecondRowRight = index === 4;

            if (isSecondRowLeft) {
              return (
                <React.Fragment key={index}>
                  <div className="review-item second-row">
                    <h3>{review.reviewTitle}</h3>
                    <div className="star-rating">
                      {renderStars(review.rating)}
                    </div>
                    <p>Order ID: {review.orderId}</p>
                    <p>Grade Received: {review.gradeReceived}</p>
                    <p>Marks: {review.marks}</p>
                    <p>Feedback: {review.feedback}</p>
                  </div>
                  <div className="middle-container">
                    <h2>Share Your Review</h2>
                    <p>Tell us what you thought about our services.</p>
                    <Link to="/feedback">
                      <button className="homewrite-review">Write Review</button>
                    </Link>
                  </div>
                </React.Fragment>
              );
            } else if (isSecondRowRight) {
              return (
                <div key={index} className="review-item second-row">
                  <h3>{review.reviewTitle}</h3>
                  <div className="star-rating">
                      {renderStars(review.rating)}
                    </div>
                  <p>Order ID: {review.orderId}</p>
                  <p>Grade Received: {review.gradeReceived}</p>
                  <p>Marks: {review.marks}</p>
                  <p>Feedback: {review.feedback}</p>
                </div>
              );
            } else {
              return (
                <div key={index} className="review-item">
                  <h3>{review.reviewTitle}</h3>
                  <div className="star-rating">
                      {renderStars(review.rating)}
                    </div>
                  <p>Order ID: {review.orderId}</p>
                  <p>Grade Received: {review.gradeReceived}</p>
                  <p>Marks: {review.marks}</p>
                  <p>Feedback: {review.feedback}</p>
                </div>
              );
            }
          })}
        </div>
        <div className="pagination">
          {Array.from({ length: Math.ceil(reviews.length / reviewsPerPage) }, (_, i) => (
            <button key={i + 1} onClick={() => paginate(i + 1)}>
              {i + 1}
            </button>
          ))}
        </div>
        <br />
      </div>
    </>
  );
}

export default ReviewScreen;
