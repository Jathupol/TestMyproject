import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import provinceData from "../component/api_province.json";
import amphureData from "../component/api_amphure.json";
import tambonData from "../component/api_tambon.json";

import "./Register.css";


const Register = () => {
  return (
    <> 
    <div className="register-container">
      
      <div className="register-form ">
        <h2 className="register-title">ประเภทอยู่ใช้</h2>

        <div className="pt-10">
          <Link to="/RegisterUser" className="register-button">
            ลงทะเบียนผู้ใช้
          </Link>
          <Link to="/RegisterService" className="register-button">
            ลงทะเบียนผู้ให้บริการ
          </Link>
        </div>
        <div className="link-to-login pt-10">          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p></div>
      </div>
    </div>
    </>
  );
};

export default Register;
