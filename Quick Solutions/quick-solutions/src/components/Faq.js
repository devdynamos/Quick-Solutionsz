import React, { useState } from 'react';
import './Faq.css';

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const questions = [
    {
      question: 'Are there any discounts for assignment writing services?',
      answer:
        'Yes, we offer discounts for new customers, bulk orders, and referrals. You can find more information about our discounts on our website or by contacting our customer support team.',
    },
    {
      question: 'How can I pay for a paper writing service?',
      answer:
        'We accept a variety of payment methods, including credit cards, debit cards, PayPal, and bank transfers. You can choose your preferred payment method during checkout.',
    },
    {
      question: 'How much do I have to pay for an assignment writing service?',
      answer:
        'The price of our writing services depends on several factors, including the type of assignment, the length of the paper, the academic level, and the deadline. You can get a free quote for your assignment by submitting an order request on our website.',
    },
    {
      question: 'How do I get help with my assignment?',
      answer:
        'We have a team of experienced writers who are available to assist you with any assignment, from essays and research papers to dissertations and theses. You can contact our customer support team or your assigned writer directly for any questions or assistance.',
    },
    {
      question: 'Can I get my money back?',
      answer:
        'We offer a money-back guarantee if you are not satisfied with our services. Please review our refund policy for more information on eligibility and procedures.',
    },
    {
      question: 'What is the quality of your writing services?',
      answer:
        'We are committed to providing high-quality writing services that meet the highest academic standards. Our writers are highly qualified and experienced in their respective fields, and they are dedicated to producing original and plagiarism-free content.',
    },
    {
      question: 'Can you help me with a specific subject?',
      answer:
        'Yes, we can help you with a wide range of subjects, including but not limited to: Business, English, History, Psychology, Sociology, Law, Engineering, and many more. Please feel free to contact our customer support team to discuss your specific requirements.',
    },
    {
      question: 'How confidential is my information?',
      answer:
        'We take your privacy seriously and ensure the confidentiality of your personal information. We never share your details with third parties and use secure payment gateways to protect your financial information.',
    },
  ];

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  

  return (
    <div className="faq-container">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <div className="faq-list">
        {questions.map((question, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleAnswer(index)}>
              <span>{question.question}</span>
              <span className={`faq-arrow ${activeIndex === index ? 'active' : ''}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-chevron-down"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </span>
            </div>
            <div className={`faq-answer ${activeIndex === index ? 'active' : ''}`}>{question.answer}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
