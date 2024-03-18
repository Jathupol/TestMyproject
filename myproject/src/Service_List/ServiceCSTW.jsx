import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../component/Nav';
import CSTWList from './CSTWList';

function ServiceCSTW() {


  return (
    <div>
      <Nav />
      <div>
        <h1 className='text-center text-3xl pt-6 p-5'>ช่างก่อสร้าง</h1>
      </div>
      < CSTWList />
    </div>
  );
}

export default ServiceCSTW;
