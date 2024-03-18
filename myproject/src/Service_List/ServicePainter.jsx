import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../component/Nav';
import PainterList from './PainterList';

function ServicePaniter() {


  return (
    <div>
      <Nav />
      <div>
        <h1 className='text-center text-3xl pt-6 p-5'>ช่างสี</h1>
      </div>
      < PainterList />
    </div>
  );
}

export default ServicePaniter;
