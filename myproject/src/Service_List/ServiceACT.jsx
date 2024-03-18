import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../component/Nav';
import ACTList from './ACTList';

function ServiceACT() {


  return (
    <div>
      <Nav />
      <div>
        <h1 className='text-center text-3xl pt-6 p-5'>ช่างแอร์</h1>
      </div>
      < ACTList />
    </div>
  );
}

export default ServiceACT;
