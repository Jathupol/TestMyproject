import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../component/Nav';
import { FaUser, FaTimes } from "react-icons/fa"; // Import FaUser icon
import amphureData from "../component/api_amphure.json";
import tambonData from "../component/api_province.json";
import provinceData from "../component/api_tambon.json";
import jobsData from "../Service/jobs.json";
import "../Service/card.css";
import UserList from './UserList';
import SearchForm from '../component/SearchForm ';
import ElectricianFilter from '../Filter/electricianFilter';


function SearchServiceForm() {

  return (


    <div>
      <Nav />
      <div>
        <h1 className='text-center text-3xl pt-6 p-5'>ช่างไฟฟ้า</h1>
      </div>
    <ElectricianFilter />
    </div>
  );
}

export default SearchServiceForm;
