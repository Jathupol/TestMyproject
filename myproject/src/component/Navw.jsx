import React from 'react';
import { Link } from 'react-router-dom';

const Navw = () => {
  return (
    <nav className="flex justify-between items-center py-4 px-8 bg-white">
      <div>
        <h1 className="text-xl font-bold">Logo</h1>
      </div>
      <div>
        <ul className="flex space-x-4">
          <li><Link to="/register" className="text-blue-500">ลงทะเบียน</Link></li>
          <li><Link to="/login" className="text-blue-500">เข้าสู่ระบบ</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navw;
