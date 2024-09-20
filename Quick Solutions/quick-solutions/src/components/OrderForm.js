import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import "./OrderForm.css";

const OrderForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [paperType, setPaperType] = useState("");
  const [numberOfPages, setNumberOfPages] = useState(1); // Default to 1 page
  const [paperQuality, setPaperQuality] = useState("");
  const [wordCount, setWordCount] = useState(250); // Default to 250 words for 1 page
  const [deliveryTime, setDeliveryTime] = useState("24 Hours");
  const [price, setPrice] = useState(30.00);
  const [discount, setDiscount] = useState(15.00);
  const [finalPrice, setFinalPrice] = useState(15.00);
  const [majorCourse, setMajorCourse] = useState("");
  const [topic, setTopic] = useState("");
  const [whoAssistedYou, setWhoAssistedYou] = useState("");
  const [citationStyle, setCitationStyle] = useState("");
  const [reference, setReference] = useState("");
  const [paperDescription, setPaperDescription] = useState("");
  const [extraRequirements, setExtraRequirements] = useState("");

  useEffect(() => {
    const calculatePrices = () => {
      let basePricePerPage = 30.00;
      let discountPerPage = 15.00;

      switch (deliveryTime) {
        case "24 Hours":
          basePricePerPage = 30.00;
          discountPerPage = 15.00;
          break;
        case "48 Hours":
          basePricePerPage = 28.00;
          discountPerPage = 14.00;
          break;
        case "72 Hours":
          basePricePerPage = 26.00;
          discountPerPage = 13.00;
          break;
        case "4-5 Days":
          basePricePerPage = 24.00;
          discountPerPage = 12.00;
          break;
        case "6-10 Days":
          basePricePerPage = 22.00;
          discountPerPage = 11.00;
          break;
        default:
          basePricePerPage = 22.00;
          discountPerPage = 11.00;
          break;
      }

      const calculatedPrice = numberOfPages * basePricePerPage;
      const calculatedDiscount = numberOfPages * discountPerPage;
      const calculatedFinalPrice = calculatedPrice - calculatedDiscount;

      setPrice(calculatedPrice.toFixed(2));
      setDiscount(calculatedDiscount.toFixed(2));
      setFinalPrice(calculatedFinalPrice.toFixed(2));
    };

    calculatePrices();
  }, [numberOfPages, deliveryTime]);

  useEffect(() => {
    setWordCount(numberOfPages * 250);
  }, [numberOfPages]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      name &&
      email &&
      phoneNumber &&
      educationLevel &&
      paperType &&
      numberOfPages &&
      paperQuality &&
      wordCount &&
      deliveryTime &&
      price &&
      discount &&
      finalPrice &&
      majorCourse &&
      topic &&
      whoAssistedYou &&
      citationStyle &&
      reference &&
      paperDescription &&
      extraRequirements
    ) {
      try {
        const response = await axios.post("http://localhost:5000/order", {
          name,
          email,
          phoneNumber,
          educationLevel,
          paperType,
          numberOfPages,
          paperQuality,
          wordCount,
          deliveryTime,
          price,
          discount,
          finalPrice,
          majorCourse,
          topic,
          whoAssistedYou,
          citationStyle,
          reference,
          paperDescription,
          extraRequirements,
        });
        console.log("Order submitted:", response.data);

        // Clear form fields after successful submission
        setName("");
        setEmail("");
        setPhoneNumber("");
        setEducationLevel("");
        setPaperType("");
        setNumberOfPages(1);
        setPaperQuality("");
        setWordCount(250);
        setDeliveryTime("24 Hours");
        setPrice(30.00);
        setDiscount(15.00);
        setFinalPrice(15.00);
        setMajorCourse("");
        setTopic("");
        setWhoAssistedYou("");
        setCitationStyle("");
        setReference("");
        setPaperDescription("");
        setExtraRequirements("");
      } catch (error) {
        console.error("Error submitting order:", error);
      }
    } else {
      console.log("Please fill out all required fields.");
    }
  };

  const handleGetStartedClick = () => {
    const whatsappNumber = "+447988187248";
    const whatsappUrl = `https://wa.me/${whatsappNumber}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      <Header />
      <div className="orderform-container">
        <h1 className="orderform-title">Order Form</h1>
        <p className="orderform-description">
          Looking to place an order? Fill in the details in the Order Form below
          and treat yourself to the best academic papers ever! For further
          information, feel free to contact our Customer Support Team.
        </p>
        <h1 className="ordform-title">Fill Out The Order Form</h1>
        <orderform onSubmit={handleSubmit}>
          <div className="orderform-group">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              className="orderform-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="orderform-group">
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              className="orderform-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="orderform-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              className="orderform-control"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div className="orderform-group">
            <label htmlFor="educationLevel">Education Level</label>
            <select
              id="educationLevel"
              className="orderform-control"
              value={educationLevel}
              onChange={(e) => setEducationLevel(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="Under Graduate">Under Graduate</option>
              <option value="Graduate">Graduate</option>
              <option value="Post Graduate">Post Graduate</option>
            </select>
          </div>
          <div className="orderform-group">
            <label htmlFor="paperType">Paper Type</label>
            <select
              id="paperType"
              className="orderform-control"
              value={paperType}
              onChange={(e) => setPaperType(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="Dissertation">Dissertation</option>
              <option value="Essay">Essay</option>
              <option value="Research Paper">Research Paper</option>
            </select>
          </div>
          <div className="orderform-group">
            <label htmlFor="numberOfPages">Number of Pages</label>
            <input
              type="number"
              id="numberOfPages"
              className="orderform-control"
              value={numberOfPages}
              onChange={(e) => setNumberOfPages(e.target.value)}
              min="1"
              required
            />
          </div>
          <div className="orderform-group">
            <label htmlFor="paperQuality">Paper Quality</label>
            <select
              id="paperQuality"
              className="orderform-control"
              value={paperQuality}
              onChange={(e) => setPaperQuality(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="2.2">2.2</option>
              <option value="2.1">2.1</option>
              <option value="First Class">First Class</option>
            </select>
          </div>
          <div className="orderform-group">
            <label htmlFor="wordCount">Word Count</label>
            <input
              type="number"
              id="wordCount"
              className="orderform-control"
              value={wordCount}
              readOnly
            />
          </div>
          <div className="orderform-group">
            <label htmlFor="deliveryTime">Delivery Time</label>
            <select
              id="deliveryTime"
              className="orderform-control"
              value={deliveryTime}
              onChange={(e) => setDeliveryTime(e.target.value)}
              required
            >
              <option value="24 Hours">24 Hours</option>
              <option value="48 Hours">48 Hours</option>
              <option value="72 Hours">72 Hours</option>
              <option value="4-5 Days">4-5 Days</option>
              <option value="6-10 Days">6-10 Days</option>
              <option value="10+ Days">10+ Days</option>
            </select>
          </div>
          <div className="orderform-group">
            <label htmlFor="price">Price ($)</label>
            <input
              type="number"
              id="price"
              className="orderform-control"
              value={price}
              readOnly
            />
          </div>
          <div className="orderform-group">
            <label htmlFor="discount">Discount ($)</label>
            <input
              type="number"
              id="discount"
              className="orderform-control"
              value={discount}
              readOnly
            />
          </div>
          <div className="orderform-group">
            <label htmlFor="finalPrice">Final Price ($)</label>
            <input
              type="number"
              id="finalPrice"
              className="orderform-control"
              value={finalPrice}
              readOnly
            />
          </div>
          <div className="orderform-group">
            <label htmlFor="majorCourse">Major/Course</label>
            <input
              type="text"
              id="majorCourse"
              className="orderform-control"
              value={majorCourse}
              onChange={(e) => setMajorCourse(e.target.value)}
              required
            />
          </div>
          <div className="orderform-group">
            <label htmlFor="topic">Topic</label>
            <input
              type="text"
              id="topic"
              className="orderform-control"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
            />
          </div>
          <div className="orderform-group">
            <label htmlFor="whoAssistedYou">Who Assisted You?</label>
            <select
              id="whoAssistedYou"
              className="orderform-control"
              value={whoAssistedYou}
              onChange={(e) => setWhoAssistedYou(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="No One">No One</option>
              <option value="Tutor">Tutor</option>
              <option value="Professor">Professor</option>
            </select>
          </div>
          <div className="orderform-group">
            <label htmlFor="citationStyle">Citation Style</label>
            <select
              id="citationStyle"
              className="orderform-control"
              value={citationStyle}
              onChange={(e) => setCitationStyle(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="MLA">MLA</option>
              <option value="APA">APA</option>
              <option value="Chicago">Chicago</option>
            </select>
          </div>
          <div className="orderform-group">
            <label htmlFor="reference">Reference</label>
            <input
              type="text"
              id="reference"
              className="orderform-control"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              required
            />
          </div>
          <div className="orderform-group">
            <label htmlFor="paperDescription">Paper Description</label>
            <textarea
              id="paperDescription"
              className="orderform-control"
              value={paperDescription}
              onChange={(e) => setPaperDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="orderform-group">
            <label htmlFor="extraRequirements">Extra Requirements</label>
            <textarea
              id="extraRequirements"
              className="orderform-control"
              value={extraRequirements}
              onChange={(e) => setExtraRequirements(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="orderbtn-group">
            <button
              type="button"
              className="orderbtn get-started-btn"
              onClick={handleGetStartedClick}
            >
              Get Started
            </button>
            <button type="submit" className="orderbtn order-now-btn" onClick={handleSubmit}>
              Order Now
            </button>
          </div>
        </orderform>
      </div>
    </>
  );
};

export default OrderForm;


             
