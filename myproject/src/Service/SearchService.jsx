import React, { useState } from 'react';
import axios from 'axios';
import provinceData from "../component/api_province.json";
import amphureData from "../component/api_amphure.json";
import tambonData from "../component/api_tambon.json";

const SearchServiceForm = () => {
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedAmphure, setSelectedAmphure] = useState('');
  const [selectedTambon, setSelectedTambon] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  const [error, setError] = useState('');

  const handleProvinceChange = (e) => {
    const provinceName = e.target.value;
    const province = provinceData.find((province) => province.name_th === provinceName);
    setSelectedProvince(province);
    setSelectedAmphure('');
    setSelectedTambon('');
    setError('');
  };

  const handleAmphureChange = (e) => {
    const amphureName = e.target.value;
    const filteredAmphures = amphureData.filter((amphure) => {
      return amphure.province_id === selectedProvince.id;
    });
    const amphure = filteredAmphures.find((amphure) => amphure.name_th === amphureName);
    setSelectedAmphure(amphure);
    setSelectedTambon('');
    setError('');
  };

  const handleTambonChange = (e) => {
    const tambonName = e.target.value;
    const tambon = tambonData.find((tambon) => tambon.name_th === tambonName);
    setSelectedTambon(tambon);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await <axios className="get"></axios>('/search-service', {
        province: selectedProvince.name_th,
        amphure: selectedAmphure.name_th, 
        tambon: selectedTambon.name_th, 
      });
      setSelectedServices(response.data.services);
      setError('');
    } catch (error) {
      console.error('การค้นหาบริการล้มเหลว:', error);
      setError('ไม่สามารถค้นหาบริการได้');
    }
  };
  
  const filteredAmphures = amphureData.filter((amphure) => {
    return amphure.province_id === selectedProvince.id;
  });

  const filteredTambons = tambonData.filter((tambon) => {
    return tambon.amphure_id === selectedAmphure.id;
  });

  return (
    <div className="p-5">
      <h2 className="text-2xl mb-3">ค้นหาบริการ</h2>
      <form onSubmit={handleSubmit} className="mb-5">
        <div className="mb-3">
          <label htmlFor="province" className="mr-3">จังหวัด:</label>
          <select
            id="province"
            value={selectedProvince.name_th}
            onChange={handleProvinceChange}
            className="border rounded px-2 py-1"
          >
            <option value="">เลือกจังหวัด</option>
            {provinceData.map((province) => (
              <option key={province.id} value={province.name_th}>
                {province.name_th}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="amphure" className="mr-3">อำเภอ:</label>
          <select
            id="amphure"
            value={selectedAmphure.name_th}
            onChange={handleAmphureChange}
            className="border rounded px-2 py-1"
          >
            <option value="">เลือกอำเภอ</option>
            {filteredAmphures.map((amphure) => (
              <option key={amphure.id} value={amphure.name_th}>
                {amphure.name_th}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="tambon" className="mr-3">ตำบล:</label>
          <select
            id="tambon"
            value={selectedTambon.name_th}
            onChange={handleTambonChange}
            className="border rounded px-2 py-1"
          >
            <option value="">เลือกตำบล</option>
            {filteredTambons.map((tambon) => (
              <option key={tambon.id} value={tambon.name_th}>
                {tambon.name_th}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">ค้นหา</button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
      {/* Show selected services */}
      <div>
        <h2>รายชื่อผู้ให้บริการ</h2>
        <ul>
          {selectedServices.map((service, index) => (
            <li key={index}>{service.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchServiceForm;
