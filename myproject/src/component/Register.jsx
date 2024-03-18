import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import "./Register.css";
import Navw from "./Navw";


const Register = () => {
  return (
    <> 
    <Navw />
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
