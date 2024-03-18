import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import './RegisterUserandService.css'

const RegisterCustomer = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    numberPhone: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });


  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/register-User",
        formData
      );
      console.log("User registered:", response.data);
  
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="register-container">
        
      <div className="register-form">
        <h1 className="register-title text-center">ลงทะเบียนผู้ใช้บริการ</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="register-input"
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="register-input"
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="register-input"
            />
          </div>
          <div>
            <label htmlFor="numberPhone">Phone Number:</label>
            <input
              type="text"
              id="numberPhone"
              name="numberPhone"
              value={formData.numberPhone}
              onChange={handleChange}
              className="register-input"
            />
          </div>
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
        <div className="link-to-login">
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterCustomer;
