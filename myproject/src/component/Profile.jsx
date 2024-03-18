import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEdit } from "@fortawesome/free-solid-svg-icons";
import Nav from "./Nav";
import provinceData from "./api_province.json";
import amphureData from "./api_amphure.json";
import tambonData from "./api_tambon.json";
import jobsData from "../Service/jobs.json";

import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    email: "",
    service: "",
    province: "",
    amphure: "",
    tambon: "",
    detail: "",
  });
  const [amphures, setAmphures] = useState([]);
  const [tambons, setTambons] = useState([]);
  const provinces = provinceData;

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
    if (userData) {
      setFormData({
        fName: userData.fName,
        lName: userData.lName,
        email: userData.email,
        service: userData.service,
        province: userData.province,
        amphure: userData.amphure,
        tambon: userData.tambon,
        detail: userData.detail,
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeProvince = (e) => {
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
        setTambons([]); // Reset tambons when province changes
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

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/"; // Redirect to registration page for craftsmen
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = { ...formData };
      const userData = JSON.parse(localStorage.getItem("user"));
  
      // Check each field and use the original value if it hasn't changed
      if (!updatedData.fName) updatedData.fName = userData.fName;
      if (!updatedData.lName) updatedData.lName = userData.lName;
      if (!updatedData.email) updatedData.email = userData.email;
      if (!updatedData.service) updatedData.service = userData.service;
      if (!updatedData.province) updatedData.province = userData.province;
      if (!updatedData.amphure) updatedData.amphure = userData.amphure;
      if (!updatedData.tambon) updatedData.tambon = userData.tambon;
      if (!updatedData.detail) updatedData.detail = userData.detail;
  
      // Check if the user's last update was within the last 21 days
      const lastUpdateDate = new Date(userData.lastUpdate);
      const currentDate = new Date();
      const daysDifference = Math.floor((currentDate - lastUpdateDate) / (1000 * 60 * 60 * 24));
  
      if (daysDifference > 21) {
        alert("Cannot update user information. Last update was more than 21 days ago.");
        return;
      }
  
      await axios.put(`http://localhost:3000/update-user/${user.id}`, updatedData);
      alert("User information updated successfully");
      setEditing(false);
      localStorage.setItem("user", JSON.stringify({ ...updatedData, lastUpdate: currentDate }));
      setUser(updatedData);
    } catch (error) {
      console.error("Error updating user information:", error);
      alert("An error occurred while updating user information");
    }
  };

  const handleEdit = () => {
    setFormData({
      fName: user.fName,
      lName: user.lName,
      email: user.email,
      service: user.service,
      province: user.province,
      amphure: user.amphure,
      tambon: user.tambon,
      detail: user.detail,
    });
    setEditing(true);
  };
  
  
  return (
    <>
      <Nav />
      <div className="max-w-md mx-auto mt-10 px-4 py-6 bg-white shadow-md rounded-md">
        <div className="flex items-center justify-center mb-4">
          <FontAwesomeIcon icon={faUser} className="text-4xl mr-2" />
          <h2 className="text-xl font-bold">ข้อมูลผู้ใช้</h2>
          {editing ? (
            <button
              className="ml-auto px-3 py-1 bg-blue-500 text-white rounded-md"
              onClick={() => setEditing(false)}
            >
              ยกเลิก
            </button>
          ) : (
            <button
              className="ml-auto px-3 py-1 bg-blue-500 text-white rounded-md"
              onClick={handleEdit}
            >
              <FontAwesomeIcon icon={faEdit} className="mr-1" />
              แก้ไข
            </button>
          )}
        </div>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label htmlFor="fName" className="block mb-2">
              ชื่อ:
            </label>
            <input
              type="text"
              id="fName"
              name="fName"
              value={formData.fName}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded-md w-full"
              disabled={!editing}
            />
            
          </div>
          <div className="mb-4">
            <label htmlFor="lName" className="block mb-2">
              นามสกุล :
            </label>
            <input
              type="text"
              id="lName"
              name="lName"
              value={formData.lName}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded-md w-full"
              disabled={!editing}
            />
            
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">
            email :
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded-md w-full"
              disabled={!editing}
            />
            
          </div>
          <div className="mb-4">
            <label htmlFor="numberPhone" className="block mb-2">
              เบอร์โทรศัพท์ :
            </label>
            <input
              type="text"
              id="numberPhone"
              name="numberPhone"
              value={formData.numberPhone}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded-md w-full"
              disabled={!editing}
            />
            
          </div>
          <div className="mb-4">
            <label htmlFor="service" className="block mb-2">
              บริการ :
            </label>
            <input
              type="text"
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded-md w-full"
              disabled={!editing}
            />
            
          </div>
          <div className="mb-4">
  <label htmlFor="province">จังหวัด:</label>
  <select
    id="province"
    name="province"
    value={editing ? formData.province : user ? user.province : ""}
    onChange={handleChangeProvince}
    className="register-input"
    disabled={!editing}
  >
    <option value="">เลือกจังหวัด</option>
    {provinces.map((province, index) => (
      <option key={index} value={province.name_th}>
        {province.name_th}
      </option>
    ))}
  </select>
</div>
<div className="mb-4">
  <label htmlFor="amphure">อำเภอ:</label>
  <select
    id="amphure"
    name="amphure"
    value={editing ? formData.amphure : user ? user.amphure : ""}
    onChange={handleChangeProvince}
    className="register-input"
    disabled={!editing}
  >
    <option value="">เลือกอำเภอ</option>
    {editing
      ? amphures.map((amphure, index) => (
          <option key={index} value={amphure.name_th}>
            {amphure.name_th}
          </option>
        ))
      : user && (
          <option value={user.amphure} selected>
            {user.amphure}
          </option>
        )}
  </select>
</div>
<div className="mb-4">
  <label htmlFor="tambon">ตำบล:</label>
  <select
    id="tambon"
    name="tambon"
    value={editing ? formData.tambon : user ? user.tambon : ""}
    onChange={handleChangeProvince}
    className="register-input"
    disabled={!editing}
  >
    <option value="">เลือกตำบล</option>
    {editing
      ? tambons.map((tambon, index) => (
          <option key={index} value={tambon.name_th}>
            {tambon.name_th}
          </option>
        ))
      : user && (
          <option value={user.tambon} selected>
            {user.tambon}
          </option>
        )}
  </select>
</div>
          <div className="mb-4">
            <label htmlFor="detail" className="block mb-2">
              รายละเอียด :
            </label>
            <textarea
              id="detail"
              name="detail"
              value={formData.detail}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded-md w-full"
              disabled={!editing}
              rows={4} // กำหนดจำนวนบรรทัดที่แสดงใน textarea
            />
          </div>
          {/* Repeat similar code for other fields */}
          <button
            type="submit"
            className={`${
              editing ? "block" : "hidden"
            } bg-blue-500 text-white px-4 py-2 rounded-md`}
          >
            บันทึก
          </button>
        </form>
        {user && (
          <div className="text-center mt-4">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md"
              onClick={handleLogout}
            >
              ออกจากระบบ
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
