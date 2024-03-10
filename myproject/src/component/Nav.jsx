// Nav.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Nav.css"; // Import CSS file
import { FaSearch } from "react-icons/fa"; // Import FaSearch icon from react-icons/fa

const Nav = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // เพิ่ม state สำหรับเก็บค่าค้นหา

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // อัพเดตค่าค้นหาเมื่อมีการเปลี่ยนแปลง
  };

  // ฟังก์ชัน handleSearchSubmit เพื่อจัดการเมื่อผู้ใช้กดปุ่มค้นหา
  const handleSearchSubmit = (e) => {
    e.preventDefault(); // ป้องกันการรีเฟรชหน้า
    console.log("Search term:", searchTerm); // ทดสอบแสดงผลค่าค้นหาใน console
    // เพิ่มโค้ดสำหรับการค้นหาข้อมูลตามที่คุณต้องการ
  };
  return (
    <nav className="nav-container">
      <div>
        <h1 className="logo">Logo</h1>
      </div>
      <div>
        <ul className="menu-items">
          <li className="menu-item">
            <form onSubmit={handleSearchSubmit} className="search-form">
              <input
                type="text"
                placeholder="ค้นหา..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input max-w-xs"
              />
              <button type="submit" className="search-button">
                <FaSearch />
              </button>
            </form>
          </li>
          <li className="menu-item">
            <Link to="/Profile" className="link">
              โปรไฟล์
            </Link>
          </li>
          <div className="relative">
            <li className="menu-item dropdown">
              <span onClick={toggleMenu} className="link">
                ประเภทงาน
              </span>
              {showMenu && (
                <div className="dropdown-menu">
                  <ul>
                    <li className="dropdown-menu-item">
                      <Link to="/Service">ช่างไฟฟ้า</Link>
                    </li>
                    <li className="dropdown-menu-item">
                      <Link to="/UserCard">ช่างประปา</Link>
                    </li>
                    <li className="dropdown-menu-item">
                      <Link to="/UserListForm">ช่างสี</Link>
                    </li>
                    <li className="dropdown-menu-item">
                      <Link to="/UserListForm">ช่างแอร์</Link>
                    </li>
                    <li className="dropdown-menu-item">
                      <Link to="/Service">ช่างปูน</Link>
                    </li>
                    <li className="dropdown-menu-item">
                      <Link to="/Service">ช่างประตู-หน้าต่าง</Link>
                    </li>
                    <li className="dropdown-menu-item">
                      <Link to="/Service">ช่างก่อสร้าง</Link>
                    </li>
                    <li className="dropdown-menu-item">
                      <Link to="/Service">ช่างฟอร์นิเจอร์</Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          </div>

          <li className="menu-item">
            <Link to="/Login" className="link">
              ออกจากระบบ
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
