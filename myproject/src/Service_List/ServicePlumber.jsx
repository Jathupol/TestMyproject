import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './UserList';
import Nav from '../component/Nav';
import PlumberList from './PlumberList';

function ServicePlumber() {


  return (
    <div>
      <Nav />
      <div>
        <h1 className='text-center text-3xl pt-6 p-5'>ช่างประปา</h1>
      </div>
      < PlumberList />
    </div>
  );
}

export default ServicePlumber;
