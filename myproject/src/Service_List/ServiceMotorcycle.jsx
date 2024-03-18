import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../component/Nav';
import Motocycle from './Motocycle';
function ServiceMotocycle() {


  return (
    <div>
      <Nav />
      <div>
        <h1 className='text-center text-3xl pt-6 p-5'>ช่างซ่อมรถจักรยานยนต์</h1>
      </div>
      < Motocycle />
    </div>
  );
}

export default ServiceMotocycle;
