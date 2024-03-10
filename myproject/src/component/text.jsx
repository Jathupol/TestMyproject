import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="flex justify-between items-center py-4 px-8 bg-white">
      <div>
        <h1 className="text-xl font-bold">Logo</h1>
      </div>
      <div>
        <ul className="flex space-x-4">
          <li>
            <Link to="/Profile" className="text-blue-500">
              โปรไฟล์
            </Link>
          </li>
          {/* เพิ่มเงื่อนไขให้แสดงเมนูเมื่อคลิกที่ลิงก์ */}
          <li>
            <div className="relative">
              <span
                onClick={toggleMenu}
                className="text-blue-500 cursor-pointer"
              >
                หมวดหมู่
              </span>
              {showMenu && (
                <div className="absolute bg-white text-gray-800 py-2 px-4 shadow-lg">
                  <ul className="menu-items">
                    <li>
                      <Link to="/Category1">ช่างไฟ</Link>
                    </li>
                    <li>
                      <Link to="/Category2">ช่างประปา</Link>
                    </li>
                    <li>
                      <Link to="/Category3">ช่างไม้</Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </li>
          <li>
            <Link to="/Login" className="text-blue-500">
              ออกจากระบบ
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
