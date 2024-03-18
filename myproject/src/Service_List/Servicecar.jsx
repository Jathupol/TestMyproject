import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../component/Nav';
import CarList from './CarList';

function ServiceCar() {
  const [filters, setFilters] = useState({
    province: '',
    amphure: '',
    tambon: ''
  });

  const handleFilter = (filterType, value) => {
    setFilters({
      ...filters,
      [filterType]: value
    });
  };

  return (
    <div>
      <Nav />
      <div>
        <h1 className='text-center text-3xl pt-6 p-5'>ช่างซ่อมรถยนต์</h1>
      </div>
      <CarList filters={filters} />
    </div>
  );
}

export default ServiceCar;
