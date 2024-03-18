import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../component/Nav';
import DWTList from './DWTList';

function ServiceDWT() {


  return (
    <div>
      <Nav />
      <div>
        <h1 className='text-center text-3xl pt-6 p-5'>ช่างประตู-หน้าต่าง</h1>
      </div>
      < DWTList />
    </div>
  );
}

export default ServiceDWT;
