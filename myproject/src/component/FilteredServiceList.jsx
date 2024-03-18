import React, { useState } from "react";
import provinceData from "./api_province.json";
import amphureData from "./api_amphure.json";
import tambonData from "./api_tambon.json";

const FilterService = ({ setFormData }) => {
    const [formData, setFormDataState] = useState({
        province: "",
        amphure: "",
        tambon: "",
    });

    const [amphures, setAmphures] = useState([]);
    const [tambons, setTambons] = useState([]);
    const provinces = provinceData;
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormDataState({
        ...formData,
        [name]: value,
      });
  
      if (name === "province") {
        const provinceId = provinces.find((province) => province.name_th === value)?.id;
        const filteredAmphures = amphureData.filter(
          (amphure) => amphure.province_id === provinceId
        );
        setAmphures(filteredAmphures);
        setTambons([]); // Reset tambon selection when province changes
      }
  
      if (name === "amphure") {
        const amphureId = amphures.find((amphure) => amphure.name_th === value)?.id;
        const filteredTambons = tambonData.filter(
          (tambon) => tambon.amphure_id === amphureId
        );
        setTambons(filteredTambons);
      }
    };
  
    return (
      <div>
        {/* Select province */}
        <select
          value={formData.province || ""} // Ensure province value is initialized as empty string if not provided
          onChange={handleChange}
          name="province"
          className="register-input"
        >
          <option value="">เลือกจังหวัด</option>
          {provinces.map((province, index) => (
            <option key={index} value={province.name_th}>
              {province.name_th}
            </option>
          ))}
        </select>
  
        {/* Select amphure */}
        <select
          value={formData.amphure || ""} // Ensure amphure value is initialized as empty string if not provided
          onChange={handleChange}
          name="amphure"
          className="register-input"
        >
          <option value="">เลือกอำเภอ</option>
          {amphures.map((amphure, index) => (
            <option key={index} value={amphure.name_th}>
              {amphure.name_th}
            </option>
          ))}
        </select>
  
        {/* Select tambon */}
        <select
          value={formData.tambon || ""} // Ensure tambon value is initialized as empty string if not provided
          onChange={handleChange}
          name="tambon"
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
    );
  };
  
  export default FilterService;
