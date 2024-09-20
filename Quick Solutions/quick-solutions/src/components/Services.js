// Services.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import { FaRegFileAlt, FaFileAlt, FaFile, FaBook, FaGraduationCap, FaPencilAlt, FaEdit, FaChartLine, FaQuestionCircle } from "react-icons/fa";
import Header from './Header';
import './Services.css';

const Services = () => {
  const services = [
    {
      icon: <FaRegFileAlt />,
      title: 'Assignment Writing',
      description: 'Crafting your college essay to perfection, the services at EazyResearch promise to offer high quality content, that too, customized and molded to meet your preferred requirements to help you with college essay writing.',
      link: '/services/assignment-writing'
    },
    {
      icon: <FaFileAlt />,
      title: 'Academic Writing',
      description: 'Crafting your college essay to perfection, the services at EazyResearch promise to offer high quality content, that too, customized and molded to meet your preferred requirements to help you with college essay writing.',
      link: '/services/academic-writing'
    },
    {
      icon: <FaFile />,
      title: 'Coursework Writing',
      description: 'It\'s time to stop stressing over your thesis and leave it on us instead. As a one-stop-solution to all your thesis worries, we have all that you need and more. Qualified thesis writers available here for custom thesis writing.',
      link: '/services/coursework-writing'
    },
    {
      icon: <FaBook />,
      title: 'Dissertation Writing',
      description: 'Get professional book report writing services with our team of experts. We can help you analyze, summarize, and write a detailed report that will impress your teacher.',
      link: '/services/dissertation-writing'
    },
    {
      icon: <FaGraduationCap />,
      title: 'Essay Writing',
      description: 'Need help with your dissertation? We offer comprehensive dissertation writing services, from topic selection to final editing. Let us help you achieve your academic goals.',
      link: '/services/essay-writing'
    },
    {
      icon: <FaPencilAlt />,
      title: 'Homework Writing',
      description: 'We provide top-notch research paper writing services. Our writers are experienced in various academic fields and can deliver high-quality research papers that meet your specific requirements.',
      link: '/services/homework-writing'
    },
    {
      icon: <FaEdit />,
      title: 'Paper Writing',
      description: 'Enhance the quality of your academic work with our expert proofreading and editing services. We\'ll ensure your work is polished and free of errors, giving you a professional edge.',
      link: '/services/paper-writing'
    },
    {
      icon: <FaChartLine />,
      title: 'Thesis',
      description: 'Need assistance with data analysis and interpretation? We can help you analyze complex data sets, identify patterns, and draw meaningful conclusions for your research or project.',
      link: '/services/thesis'
    },
    {
      icon: <FaQuestionCircle />,
      title: 'Online Exams',
      description: 'Get personalized guidance and support from our academic experts. We offer consultations on research methods, topic selection, writing strategies, and more to help you succeed in your studies.',
      link: '/services/online-exams'
    },
    // Add other service items with their respective links
  ];

  return (
    <>
      <Header />
      <section className="services">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            Delivering the best academic services to get you the perfect scores
            <span className="line"></span>
          </p>
          <div className="row">
            {services.map((service, index) => (
              <div className="col-md-4" key={index}>
                <Link to={service.link} className="service-link"> {/* Wrap each service item in Link */}
                  <div className="service-card">
                    <div className="icon">
                      {service.icon}
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
