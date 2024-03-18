import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../component/Nav';
import PlumberList from './PlumberList';
import UserList from './UserList';
function SearchService() {


  return (
    <div>
      <Nav />
      <div>
        <h1 className='text-center text-3xl pt-6 p-5'>ช่างไฟฟ้า</h1>
      </div>
      < UserList />
    </div>
  );
}

export default SearchService;
