// Nav.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Nav.css"; // Import CSS file
import logo from "../pic/mylogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // เพิ่ม state สำหรับเก็บค่าค้นหา
  const navigate = useNavigate(); // Import useNavigate hook for programmatic navigation

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // อัพเดตค่าค้นหาเมื่อมีการเปลี่ยนแปลง
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search term:", searchTerm);
  };

  const handleProfileClick = () => {
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (!userData) {
        throw new Error("กรุณาเข้าสู่ระบบของผู้ให้บริการก่อน");
      } else {
        navigate("/Profile");
      }
    } catch (error) {
      alert(error.message);
      navigate("/login");
    }
  };

  return (
    <nav className="nav-container">
      <div className="logo">
        <Link to="/home">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <div>
        <ul className="menu-items">
          <li className="dropdown-menu-item">
            <Link to="/home">หน้าหลัก</Link>
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
                      <Link to="/search">ช่างไฟฟ้า</Link>
                    </li>
                    <li className="dropdown-menu-item">
                      <Link to="/serviceplumer">ช่างประปา</Link>
                    </li>
                    <li className="dropdown-menu-item">
                      <Link to="/servicepainter">ช่างสี</Link>
                    </li>
                    <li className="dropdown-menu-item">
                      <Link to="/serviceACT">ช่างแอร์</Link>
                    </li>
                    <li className="dropdown-menu-item">
                      <Link to="/serviceDw">ช่างประตู-หน้าต่าง</Link>
                    </li>
                    <li className="dropdown-menu-item">
                      <Link to="/serviceCSTW">ช่างก่อสร้าง</Link>
                    </li>
                    <li className="dropdown-menu-item">
                      <Link to="/serviceFurniture">ช่างฟอร์นิเจอร์</Link>
                    </li>
                    <li className="dropdown-menu-item">
                      <Link to="/servicemotocycle">ช่างรถจักรยานยนต์</Link>
                    </li>
                    <li className="dropdown-menu-item">
                      <Link to="/ช่างซ่อมรถยนต์">ช่างซ่อมรถยนต์</Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          </div>
          {localStorage.getItem("user") && (
            <li className="menu-item">
              <Link to="/Profile" className="link" onClick={handleProfileClick}>
                <FontAwesomeIcon
                  icon={faUser}
                  className="rounded-full text-2xl"
                />
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
