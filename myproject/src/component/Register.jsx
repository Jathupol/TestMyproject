import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import amphureData from "./api_amphure.json";
import tambonData from "./api_tambon.json";
import provinceData from "./api_province.json";
import jobsData from "../Service/jobs.json";

import "../component/Register.css";
import Nav from "../component/Nav";

const Register = () => {
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
    numberPhone: "",
    service: "",
    province: "",
    amphure: "",
    tambon: "",
    detail:"",
  });

  const [amphures, setAmphures] = useState([]);
  const [tambons, setTambons] = useState([]);
  const [error, setError] = useState(""); // Define setError function
  const navigate = useNavigate();
  const jobs = jobsData.jobs;
  const provinces = provinceData;
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "province") {
      const selectedProvince = provinces.find(
        (province) => province.name_th === value
      );
      if (selectedProvince) {
        const provinceId = selectedProvince.id;
        const filteredAmphures = amphureData.filter(
          (amphure) => amphure.province_id === provinceId
        );
        setAmphures(filteredAmphures);
      }
    }

    if (name === "amphure") {
      const selectedAmphure = amphures.find(
        (amphure) => amphure.name_th === value
      );
      if (selectedAmphure) {
        const amphureId = selectedAmphure.id;
        const filteredTambons = tambonData.filter(
          (tambon) => tambon.amphure_id === amphureId
        );
        setTambons(filteredTambons);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/register",formData);
      
      console.log("Service registered:", response.data);

      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      setError(error.response.data.error || "Registration failed");
    }
  };

  return (
    <>
    <Nav />
    <div className="register-container">
      <div className="register-form">
        <h2 className="register-title text-center">ลงทะเบียนผู้ให้บริการ</h2>
        <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="fName">ชื่อจริง:</label>
            <input
              type="text"
              id="fName"
              name="fName"
              value={formData.fName}
              onChange={handleChange}
              className="register-input"
            />
          </div>
          <div>
            <label htmlFor="lName">นามสกุล:</label>
            <input
              type="text"
              id="lName"
              name="lName"
              value={formData.lName}
              onChange={handleChange}
              className="register-input"
            />
          </div>
          <div>
            <label htmlFor="email">อีเมล:</label>
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
            <label htmlFor="password">รหัสผ่าน:</label>
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
            <label htmlFor="numberPhone">เบอร์โทรศัพท์:</label>
            <input
              type="text"
              id="numberPhone"
              name="numberPhone"
              value={formData.numberPhone}
              onChange={handleChange}
              className="register-input"
            />
          </div>
          <div>
            <label htmlFor="service">เลือกประเภทงาน:</label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="register-input"
            >
              <option value="">เลือกประเภทงาน</option>
              {jobs.map((job) => (
                <option key={job.id} value={job.name}>
                  {job.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="province">จังหวัด:</label>
            <select
              id="province"
              name="province"
              value={formData.province}
              onChange={handleChange}
              className="register-input"
            >
              <option value="">เลือกจังหวัด</option>
              {provinces.map((province, index) => (
                <option key={index} value={province.name_th}>
                  {province.name_th}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="amphure">อำเภอ:</label>
            <select
              id="amphure"
              name="amphure"
              value={formData.amphure}
              onChange={handleChange}
              className="register-input"
            >
              <option value="">เลือกอำเภอ</option>
              {amphures.map((amphure, index) => (
                <option key={index} value={amphure.name_th}>
                  {amphure.name_th}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="tambon">ตำบล:</label>
            <select
              id="tambon"
              name="tambon"
              value={formData.tambon}
              onChange={handleChange}
              className="register-input"
            >
              <option value="">เลือกตำบล</option>
              {tambons.map((tambon, index) => (
                <option key={index} value={tambon.name_th}>
                  {tambon.name_th}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="detail">รายละเอียด</label>
            <textarea
              id="detail"
              name="detail"
              value={formData.detail}
              onChange={handleChange}
              className="register-input"
            ></textarea>
          </div>
          <button type="submit" className="register-button">
            ลงทะเบียน
          </button>
        
        
        <div className="link-to-login">
          <p>
            มีบัญชีผู้ใช้แล้ว? <Link to="/login">เข้าสู่ระบบที่นี่</Link>
          </p>
        </div>
        </form>
        
      </div>
    </div>
    </>
  );
};

export default Register;
