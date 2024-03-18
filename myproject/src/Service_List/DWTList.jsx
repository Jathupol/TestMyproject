import React, { useState, useEffect } from "react"; // Import useEffect hook
import axios from "axios";
import { FaUser, FaTimes } from "react-icons/fa"; // Import FaUser icon
import amphureData from "../component/api_amphure.json";
import tambonData from "../component/api_tambon.json";
import provinceData from "../component/api_province.json";
import jobsData from "../Service/jobs.json";
import "../Service/card.css";

const DWTList = () => {
  const [formData, setFormData] = useState({
    province: "",
    amphure: "",
    tambon: "",
  });
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [amphures, setAmphures] = useState([]);
  const [tambons, setTambons] = useState([]);
  const [selectedService, setSelectedService] = useState(null); // Add selectedService state
  const [hover, setHover] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "province") {
      const selectedProvince = provinceData.find(
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
      const selectedAmphure = amphureData.find(
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
      const filteredData = {
        province: formData.province,
        amphure: formData.amphure,
        tambon: formData.tambon,
      };
      const response = await axios.post(
        "http://localhost:3000/filtered-dwt",
        filteredData
      );
      console.log("Response data:", response.data); // Log response data
      setSearchResults(response.data);
      setErrorMessage("");
    } catch (error) {
      console.error("Error fetching filtered services:", error);
      setSearchResults([]);
      setErrorMessage("ไม่พบผลลัพธ์หรือเกิดข้อผิดพลาดในการค้นหา");
    }
  };

  useEffect(() => {
    if (selectedService) {
      const popupContainer = document.querySelector('.popup-container');
      if (popupContainer) {
        popupContainer.classList.add('active');
      }
    } else {
      const popupContainer = document.querySelector('.popup-container');
      if (popupContainer) {
        popupContainer.classList.remove('active');
      }
    }
  }, [selectedService]);

  const handleCardClick = (service) => {
    setSelectedService(service);
  };
    
  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex flex-col mb-4" >
          <label htmlFor="province" className="mb-1">จังหวัด:</label>
          <select
            id="province"
            name="province"
            value={formData.province}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="">เลือกจังหวัด</option>
            {provinceData.map((province) => (
              <option key={province.id} value={province.name_th}>
                {province.name_th}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="amphure" className="mb-1">อำเภอ:</label>
          <select
            id="amphure"
            name="amphure"
            value={formData.amphure}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="">เลือกอำเภอ</option>
            {amphures.map((amphure) => (
              <option key={amphure.id} value={amphure.name_th}>
                {amphure.name_th}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="tambon" className="mb-1">ตำบล:</label>
          <select
            id="tambon"
            name="tambon"
            value={formData.tambon}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="">เลือกตำบล</option>
            {tambons.map((tambon) => (
              <option key={tambon.id} value={tambon.name_th}>
                {tambon.name_th}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          ค้นหา
        </button>
      </form>

      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

      <div>
        <h2 className="text-lg font-semibold mb-2">
          รายชื่อ Services ที่ตรงกับข้อมูลที่ค้นหา
        </h2>
        {searchResults.length > 0 ? (
          <div className="user-card-container">
            {searchResults.map((service) => (
              <div key={service.id} className="user-card" onClick={() => setSelectedService(service)}>
                <div className="profile-icon">
                  <FaUser />
                </div>
                <div className="user-info">
                <h3>{service.fName} {service.lName}</h3>
                <p>Service: {service.service}</p>
                <p>Location: {service.province}, {service.amphure}, {service.tambon}</p>
                </div>
              </div>
            ))}
          </div>
          
        ) : (
          <p className="italic">ไม่มีผลลัพธ์</p>
        )}
      </div>
      {selectedService && (
        <div className="popup-container">
          <div className="popup">
            <span className="close-icon" onClick={() => setSelectedService(null)}><FaTimes /></span>
            <h2>ข้อมูลเพิ่มเติมของ คุณ {selectedService.fName} {selectedService.lName}</h2>
            <hr />
            <p><span className="text-blue-950 font-bold">ชื่อ: </span> {selectedService.fName} {selectedService.lName}</p>
            <p><span className="text-blue-950 font-bold">อีเมล: </span> {selectedService.email}</p>
            <p><span className="text-blue-950 font-bold">เบอร์โทร: </span> {selectedService.numberPhone}</p>
            <p><span className="text-blue-950 font-bold">ประเภทงาน: </span> {selectedService.service}</p>
            <p><span className="text-blue-950 font-bold">ที่อยู่: </span> {selectedService.province}, {selectedService.amphure}, {selectedService.tambon}</p>
            <br />
            <p><span className="text-blue-950 font-bold">รายละเอียด: </span> {selectedService.detail}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DWTList;
