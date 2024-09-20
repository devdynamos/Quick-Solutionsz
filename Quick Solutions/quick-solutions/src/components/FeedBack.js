import React, { useState } from 'react';
import Header from './Header';
import './FeedBack.css';
import axios from 'axios';

function FeedBack() {
  const [orderId, setOrderId] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(null);
  const [gradeReceived, setGradeReceived] = useState(null);
  const [marks, setMarks] = useState(null);

  const handleOrderIdChange = (e) => {
    setOrderId(e.target.value);
  };

  const handleReviewTitleChange = (e) => {
    setReviewTitle(e.target.value);
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleGradeReceivedChange = (e) => {
    setGradeReceived(e.target.value);
  };

  const handleMarksChange = (value) => {
    setMarks(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/reviews', {
        orderId,
        reviewTitle,
        feedback,
        rating,
        gradeReceived,
        marks,
      });

      console.log(response.data);

      // Clear form fields after submission
      setOrderId('');
      setReviewTitle('');
      setFeedback('');
      setRating(null);
      setGradeReceived(null);
      setMarks(null);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <>
      <Header />
      <div className="feedback-app-container">
        <div className="feedback-content-container">
          <h2 className="feedback-title">Please Rate The Quality Of My Work</h2>
          <p className="feedback-description">Hi, I am your expert and would like to know your feedback on this assignment.</p>
          <div className="feedback-rating-container">
            {[1, 2, 3, 4, 5].map((star, index) => (
              <div key={index} className="feedback-rating-item">
                <span
                  onClick={() => handleRatingChange(star)}
                  style={{
                    cursor: 'pointer',
                    fontSize: '24px',
                    color: star <= rating ? 'gold' : 'gray',
                  }}
                >
                  &#x2605;
                </span>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="feedback-input-group">
              <label htmlFor="orderId" className="feedback-label">Enter Order Id</label>
              <input
                type="text"
                id="orderId"
                className="feedback-input-text"
                value={orderId}
                onChange={handleOrderIdChange}
              />
            </div>
            <div className="feedback-input-group">
              <label htmlFor="reviewTitle" className="feedback-label">Review Title</label>
              <input
                type="text"
                id="reviewTitle"
                className="feedback-input-text"
                value={reviewTitle}
                onChange={handleReviewTitleChange}
              />
            </div>
            <div className="feedback-input-group">
              <label htmlFor="feedback" className="feedback-label">Please write your feedback here...</label>
              <textarea
                id="feedback"
                className="feedback-textarea"
                value={feedback}
                onChange={handleFeedbackChange}
                rows="4"
              />
            </div>
            <div className="feedback-input-group">
              <label className="feedback-label">Grade received</label>
              <div className="feedback-radio-group">
                <input
                  type="radio"
                  id="gradeReceivedYes"
                  name="gradeReceived"
                  value="Yes"
                  checked={gradeReceived === 'Yes'}
                  onChange={handleGradeReceivedChange}
                  className="feedback-input-radio"
                />
                <label htmlFor="gradeReceivedYes">Yes</label>
                <input
                  type="radio"
                  id="gradeReceivedNo"
                  name="gradeReceived"
                  value="No"
                  checked={gradeReceived === 'No'}
                  onChange={handleGradeReceivedChange}
                  className="feedback-input-radio"
                />
                <label htmlFor="gradeReceivedNo">No</label>
              </div>
            </div>
            <div className="feedback-grade-options">
              <button
                className={`feedback-grade-option ${marks === '85-100' ? 'active' : ''}`}
                type="button"
                onClick={() => handleMarksChange('85-100')}
              >
                85-100 Marks
              </button>
              <button
                className={`feedback-grade-option ${marks === '70-84' ? 'active' : ''}`}
                type="button"
                onClick={() => handleMarksChange('70-84')}
              >
                70-84 Marks
              </button>
              <button
                className={`feedback-grade-option ${marks === '60-69' ? 'active' : ''}`}
                type="button"
                onClick={() => handleMarksChange('60-69')}
              >
                60-69 Marks
              </button>
              <button
                className={`feedback-grade-option ${marks === '50-59' ? 'active' : ''}`}
                type="button"
                onClick={() => handleMarksChange('50-59')}
              >
                50-59 Marks
              </button>
              <button
                className={`feedback-grade-option ${marks === 'Less than 50' ? 'active' : ''}`}
                type="button"
                onClick={() => handleMarksChange('Less than 50')}
              >
                Less Than 50
              </button>
            </div>
            <button type="submit" className="feedback-submit-button">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default FeedBack;
