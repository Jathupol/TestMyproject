import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../component/Nav';
import FurnitureList from './FurnitureList';
function ServiceFurniture() {


  return (
    <div>
      <Nav />
      <div>
        <h1 className='text-center text-3xl pt-6 p-5'>ช่างฟอร์นิเจอร์</h1>
      </div>
      < FurnitureList />
    </div>
  );
}

export default ServiceFurniture;
