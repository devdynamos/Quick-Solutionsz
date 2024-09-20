// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; // Import the Header component
import HomeScreen from './components/HomeScreen';
import Faq from './components/Faq';
import ChatIcon from './components/ChatIcon';
import Login from './components/Login'; // Import the Login component
import SignUp from './components/SignUp';
import AboutUs from './components/AboutUs';
import Blog from './components/Blog';
import Services from './components/Services';
import Pricing from './components/Pricing';
import OrderForm from './components/OrderForm';
import Assignment from './components/Assignment';
import Academic from './components/Academic';
import Coursework from './components/Coursework';
import Dissertation from './components/Dissertation';
import Essay from './components/Essay';
import Homework from './components/Homework';
import Paper from './components/Paper';
import Thesis from './components/Thesis';
import OnlineExams from './components/OnlineExams';
import Transaction from './components/Transaction';
import FeedBack from './components/FeedBack';
import ReviewScreen from './components/ReviewScreen';
import BlogPosting from './components/BlogPosting';
import BlogPostingForm from './components/BlogPostingForm';
import BlogDetail from './components/BlogDetail';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Footer from './components/Footer';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import { AuthProvider } from './components/AuthContext';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <div>
              <Header />
              <HomeScreen />
              <Services />
              <AboutUs />
              <Faq />
              <Footer />
              <ChatIcon />
            </div>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/assignment-writing" element={<Assignment />} />
          <Route path="/services/academic-writing" element={<Academic />} />
          <Route path="/services/coursework-writing" element={<Coursework />} />
          <Route path="/services/dissertation-writing" element={<Dissertation />} />
          <Route path="/services/essay-writing" element={<Essay />} />
          <Route path="/services/homework-writing" element={<Homework />} />
          <Route path="/services/paper-writing" element={<Paper />} />
          <Route path="/services/thesis" element={<Thesis />} />
          <Route path="/services/online-exams" element={<OnlineExams />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/review-screen" element={<ReviewScreen />} />
          <Route path="/order" element={<OrderForm />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/feedback" element={<FeedBack />} />
          <Route path="/review-screen" element={<ReviewScreen />} />
          <Route path="/blog-posting" element={<BlogPosting />} />
          <Route path="/blog-posting-form" element={<BlogPostingForm />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/dashboard" element={<PrivateRoute component={AdminDashboard} />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
