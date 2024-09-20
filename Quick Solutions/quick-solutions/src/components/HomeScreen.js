import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { TbCopyOff } from "react-icons/tb";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdOutlineSupportAgent } from "react-icons/md";
import { GrSecure } from "react-icons/gr";
import './HomeScreen.css';
import './Video.css';

function HomeScreen() {
  const [pages, setPages] = useState(1);
  const [price, setPrice] = useState(30.00);
  const [discount, setDiscount] = useState(15.00);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deadline, setDeadline] = useState("6 hours");
  const [type, setType] = useState("");
  const [educationLevel, setEducationLevel] = useState("High School");
  const navigate = useNavigate();

  useEffect(() => {
    calculatePrice(pages, deadline);
  }, [pages, deadline]);

  const calculatePrice = (numPages, deadline) => {
    let basePricePerPage = 30.00;
    let discountPerPage = 15.00;

    switch (deadline) {
      case "6 hours":
      case "12 hours":
      case "1 day":
        basePricePerPage = 30.00;
        discountPerPage = 15.00;
        break;
      case "2 days":
        basePricePerPage = 28.00;
        discountPerPage = 14.00;
        break;
      case "3 days":
        basePricePerPage = 26.00;
        discountPerPage = 13.00;
        break;
      case "5 days":
        basePricePerPage = 24.00;
        discountPerPage = 12.00;
        break;
      case "7 days":
      case "10 days":
        basePricePerPage = 22.00;
        discountPerPage = 11.00;
        break;
      default:
        basePricePerPage = 22.00;
        discountPerPage = 11.00;
        break;
    }

    const newPrice = numPages * basePricePerPage;
    const newDiscount = numPages * discountPerPage;

    setPrice(newPrice);
    setDiscount(newDiscount);
  };

  const handleIncrement = () => {
    setPages(prevPages => prevPages + 1);
  };

  const handleDecrement = () => {
    if (pages > 1) {
      setPages(prevPages => prevPages - 1);
    }
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleDeadlineChange = (e) => {
    setDeadline(e.target.value);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleEducationLevelChange = (e) => {
    setEducationLevel(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (pages && price && discount && educationLevel && deadline && type) {
      try {
        const response = await axios.post("http://localhost:5000/", {
          pages,
          price,
          discount,
          educationLevel,
          deadline,
          type,
        });

        if (response.status === 201) {
          console.log("Order submitted successfully:", response.data);
          navigate("/transaction", {
            state: { pages, price, discount, educationLevel, deadline, type }
          });

        } else {
          console.log("Failed to submit order. Server response:", response);
        }

      } catch (error) {
        console.error("Error submitting order:", error);
      }

    } else {
      console.log("Please fill out all required fields.");
    }
  };

  return (
    <div className="container">
      <main className="main">
        <section className="hero">
          <h2>Welcome to Qwik Solutions!</h2>
          <div className="features">
            <div className="feature">
              <TbCopyOff className="icon" />
              <h3>Plagiarism-free</h3>
            </div>
            <div className="feature">
              <GiTakeMyMoney className="icon" />
              <h3>10 Day Money Back</h3>
            </div>
            <div className="feature">
              <MdOutlineSupportAgent className="icon" />
              <h3>24/7 Support</h3>
            </div>
            <div className="feature">
              <GrSecure className="icon" />
              <h3>Complete Confidentiality</h3>
            </div>
          </div>
          <div className="cta">
            <Link to="/order">
              <button className="order-button">ORDER NOW</button>
            </Link>
            <button className="btn-secondary" onClick={handleModalOpen}>How It Works</button>
          </div>
        </section>
        <section className="form-section">
          <form className="form" onSubmit={handleSubmit}>
            <h3>Type</h3>
            <select value={type} onChange={handleTypeChange}>
              <option value="" disabled hidden>E.g. essay</option>
              <option value="annotated bibliography">Annotated Bibliography</option>
              <option value="application essay">Application Essay</option>
              <option value="article">Article</option>
              <option value="business plan">Business Plan</option>
              <option value="capstone project">Capstone Project</option>
              <option value="case study">Case Study</option>
              <option value="code">Code</option>
              <option value="content writing">Content Writing</option>
              <option value="coursework">Coursework</option>
              <option value="creative writing">Creative Writing</option>
              <option value="dissertation">Dissertation</option>
              <option value="proposal">Proposal</option>
              <option value="editing">Editing</option>
              <option value="essay">Essay</option>
              <option value="excel assignment">Excel Assignment</option>
              <option value="review">Review</option>
              <option value="math solving">Math Solving</option>
              <option value="outline">Outline</option>
              <option value="personal statement">Personal Statement</option>
              <option value="presentation">Presentation</option>
              <option value="reflective writing">Reflective Writing</option>
              <option value="report">Report</option>
              <option value="research paper">Research Paper</option>
              <option value="speech">Speech</option>
              <option value="term paper">Term Paper</option>
              <option value="test">Test</option>
              <option value="thesis">Thesis</option>
              <option value="q&a">Q&A</option>
              <option value="other types">Other Types</option>
            </select>
            <h3>Education Level</h3>
            <select value={educationLevel} onChange={handleEducationLevelChange}>
              <option value="High School">High School</option>
              <option value="college">College</option>
              <option value="Bachelor">Bachelor</option>
              <option value="Master">Master</option>
              <option value="Ph.D.">Ph.D.</option>
            </select>
            <h3>Deadline</h3>
            <select value={deadline} onChange={handleDeadlineChange}>
              <option value="6 hours">6 hours</option>
              <option value="12 hours">12 hours</option>
              <option value="1 day">1 day</option>
              <option value="2 days">2 days</option>
              <option value="3 days">3 days</option>
              <option value="5 days">5 days</option>
              <option value="7 days">7 days</option>
              <option value="10 days">10 days</option>
              <option value="2 weeks">2 weeks</option>
              <option value="1 month">1 month</option>
              <option value="2 months">2 months</option>
            </select>
            <h3>Pages/words</h3>
            <div className="input-group">
              <button type="button" className="btn-secondary" onClick={handleDecrement}>-</button>
              <input type="text" value={`${pages} page${pages > 1 ? 's' : ''}/275 words`} readOnly />
              <button type="button" className="btn-secondary" onClick={handleIncrement}>+</button>
            </div>
            <div className="form-price">
              <span>Your price</span>
              <i className="fas fa-info-circle"></i>
              <span className='full-price'>${price.toFixed(2)}</span>
              <span className="discount">${discount.toFixed(2)}</span>
              <i className="fas fa-fire"></i>
            </div>
            <button type="submit" className="btn-success">Submit</button>
          </form>
        </section>
      </main>
      <footer className="footer-downtop">
        <p>Qwik Solutions / assignments writing services</p>
      </footer>

      {isModalOpen && (
        <div className="modal-container">
          <div className="modal-content">
            <span className="close-modal-button" onClick={handleModalClose}>
              &times;
            </span>
            <h2 className="modal-title">How It Works</h2>
            <div className="video-container">
              <video className="video-player" controls src="qwik-solutions.mp4" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomeScreen;
