import React, { useState, useEffect } from "react";
import axios from "axios";


const ChangForm = () => {
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [subdistricts, setSubdistricts] = useState([]);

  useEffect(() => {
    fetchProvinces();
  }, []);

  const fetchProvinces = async () => {
    try {
      const response = await axios.get("api_province.json");
      setProvinces(response.data);
    } catch (error) {
      console.error("Error fetching provinces: ", error);
    }
  };

  const fetchDistricts = async (provinceId) => {
    try {
      const response = await axios.get(`api_amphure.json?province_id=${provinceId}`);
      setDistricts(response.data);
    } catch (error) {
      console.error("Error fetching districts: ", error);
    }
  };

  const fetchSubdistricts = async (districtId) => {
    try {
      const response = await axios.get(`api_tambon.json?amphure_id=${districtId}`);
      setSubdistricts(response.data);
    } catch (error) {
      console.error("Error fetching subdistricts: ", error);
    }
  };

  const handleProvinceChange = (e) => {
    setSelectedProvince(e.target.value);
    fetchDistricts(e.target.value);
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    fetchSubdistricts(e.target.value);
  };

  return (
    <div className="form-container">
      <h2>Filter by Location</h2>
      <div className="select-container">
        <label htmlFor="province">Province:</label>
        <select id="province" value={selectedProvince} onChange={handleProvinceChange}>
          <option value="">Select Province</option>
          {provinces.map((province) => (
            <option key={province.id} value={province.id}>
              {province.name_th}
            </option>
          ))}
        </select>
      </div>
      <div className="select-container">
        <label htmlFor="district">District:</label>
        <select id="district" value={selectedDistrict} onChange={handleDistrictChange}>
          <option value="">Select District</option>
          {districts.map((district) => (
            <option key={district.id} value={district.id}>
              {district.name_th}
            </option>
          ))}
        </select>
      </div>
      <div className="select-container">
        <label htmlFor="subdistrict">Subdistrict:</label>
        <select id="subdistrict">
          <option value="">Select Subdistrict</option>
          {subdistricts.map((subdistrict) => (
            <option key={subdistrict.id} value={subdistrict.id}>
              {subdistrict.name_th}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ChangForm;
