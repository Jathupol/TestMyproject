// MainApp.jsx
import React, { useState } from 'react';
import FilterForm from './FilterForm';

const MainApp = () => {
  const [filteredData, setFilteredData] = useState([]);

  const handleFilterSubmit = (filterData) => {
    // ทำการกรองข้อมูลโดยใช้ filterData
    // เช่น เรียก API หรือกรองข้อมูลใน state หรืออื่นๆ
    console.log(filterData);
    // อัพเดตข้อมูลที่ถูกกรองแล้วใน state หรือทำอย่างอื่นตามต้องการ
  };

  return (
    <div>
      <h1>แบบฟอร์มกรองข้อมูล</h1>
      <FilterForm onSubmit={handleFilterSubmit} />
      {/* แสดงผลข้อมูลที่ถูกกรอง */}
      <div>
        {filteredData.map((item) => (
          <div key={item.id}>
            {/* แสดงข้อมูลที่ถูกกรอง */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainApp;
