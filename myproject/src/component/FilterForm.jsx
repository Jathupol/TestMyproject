// FilterForm.jsx
import React, { useState } from 'react';

const FilterForm = ({ onSubmit }) => {
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [job, setJob] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ province, district, job });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="province">จังหวัด:</label>
        <input
          type="text"
          id="province"
          value={province}
          onChange={(e) => setProvince(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="district">อำเภอ:</label>
        <input
          type="text"
          id="district"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="job">งานช่าง:</label>
        <input
          type="text"
          id="job"
          value={job}
          onChange={(e) => setJob(e.target.value)}
        />
      </div>
      <button type="submit">ค้นหา</button>
    </form>
  );
};

export default FilterForm;
