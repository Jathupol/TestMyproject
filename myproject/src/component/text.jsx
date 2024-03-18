import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link,Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons"; // Import sun and moon icons
import "./Login.css";
import Navw from "./Navw";


const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // State to control dark mode
  const navigate = useNavigate();
  
  const isLoggedIn = localStorage.getItem("@user");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
async function loginUser(credentials){
  return fetch('http://localhost:3000/login',{
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body:JSON.stringify(credentials)
})
.then(data => data.json())
}

  // const handleLogin = async () => {
  //   try {
  //     const response = await axios.post("http://localhost:3000/login", formData);
  //     if (response.data.success) {
  //       console.log("Login successful:", response.data);
  //     // Store user data in local storage
  //     localStorage.setItem("@user", JSON.stringify(response.data.user));
  //     navigate("/home");
  //     } else {
  //       setError("ไม่พบผู้ใช้");
  //     }
  //   } catch (error) {
  //     console.error("Login failed:", error);
  //     setError("ไม่พบผู้ใช้นี้กรุณาลงทะเบียน หรือ เข้าสู่ระบบอีกครั้ง!!");
  //   }
  // };

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await loginUser({
      email,
      password
    })
    console.log(response)

    // if (!formData.email || !formData.password) {
    //   alert("กรุณาใส่กรอกข้อมูลให้ครบถ้วน!!");
    //   return;
    // }
    // handleLogin();
  };

  return (
    <>
    <Navw />
    <div
      className={`max-w-md mx-auto mt-10 px-4 py-6 bg-white shadow-md rounded-md ${
        darkMode ? "dark" : ""
      }`}
    >
      
      <h2 className="text-xl font-bold mb-4">เข้าสู่ระบบ</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md w-full"
            
          />
        </div>
        <div className="mb-4 relative">
          <label htmlFor="password" className="block mb-2">
            Password:
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md w-full pr-10"
          />
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            className="icon absolute inset-y-0 right-0 px-3 py-2 mt-10 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Login
        </button>
        <hr />
      </form>
      <div className="flex justify-center mt-4">
        {/* Button to toggle dark mode */}
      </div>
      <p className="mt-4 text-center">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-500">
          Register
        </Link>
      </p>
    </div>
    </>
  );
};

export default Login;
