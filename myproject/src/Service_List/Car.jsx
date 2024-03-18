import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Service/card.css";
import { FaUser, FaStar, FaTimes } from "react-icons/fa"; // Import FaStar icon for star rating

const Car = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // State เก็บผู้ใช้ที่ถูกเลือก
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleRatingClick = async (value) => {
    // ตรวจสอบว่ามีผู้ใช้ถูกเลือกหรือไม่
    if (selectedUser) {
      try {
        // ส่งคะแนนดาวไปยังเซิร์ฟเวอร์
        await axios.post(
          `http://localhost:3000/users/${selectedUser.id}/rate`,
          { rating: value }
        );
        // อัปเดตคะแนนดาวใหม่ใน state
        setSelectedUser({ ...selectedUser, rating: value });
      } catch (error) {
        console.error("Error rating user:", error);
      }
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/servicecar");
        const userData = response.data.users;
        if (Array.isArray(userData)) {
          setUsers(userData);
        } else {
          console.error("Received data is not an array:", userData);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      const popupContainer = document.querySelector('.popup-container');
      if (popupContainer) {
        popupContainer.classList.add('active');
      }
    } else {
      const popupContainer = document.querySelector('.popup-container');
      if (popupContainer) {
        popupContainer.classList.remove('active');
      }
    }
  }, [selectedUser]);
  return (
    <div className="user-list-container">
      <div className="user-card-container">
        {users.map((user) => (
          <div key={user.id} className="user-card" onClick={() => setSelectedUser(user)}>
            <div className="profile-icon">
              <FaUser />
            </div>
            <div className="user-info">
              <h3>{user.fName} {user.lName}</h3>
              {/* <p>Email: {user.email}</p>
              <p>Phone: {user.numberPhone}</p> */}
              <p>Service: {user.service}</p>
              <p>Location: {user.province}, {user.amphure}, {user.tambon}</p>
              <div className="rating">
                {[...Array(5)].map((star, index) => {
                  const ratingValue = index + 1;
                  return (
                    <label key={index}>
                      <input
                        type="radio"
                        name="rating"
                        value={ratingValue}
                        onClick={() => handleRatingClick(ratingValue)}
                      />
                      <FaStar
                        className="star"
                        color={ratingValue <= (hover || (selectedUser && selectedUser.rating) || rating) ? "#ffc107" : "#e4e5e9"}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(0)}
                      />
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* แสดงรายละเอียดเพิ่มเติมของผู้ใช้ที่ถูกเลือก */}
      {selectedUser && (
      <div className="popup-container">
        {selectedUser && (
          <div className="popup">
          <span className="close-icon" onClick={() => setSelectedUser(null)}><FaTimes /></span>
          <h2>ข้อมูลเพิ่มเติมของ คุณ {selectedUser.fName} {selectedUser.lName}</h2>
          <p><span className="text-blue-950 font-bold">ชื่อ:</span> {selectedUser.fName} {selectedUser.lName}</p>
          <p><span className="text-blue-950 font-bold">อีเมล:</span> {selectedUser.email}</p>
          <p><span className="text-blue-950 font-bold">เบอร์โทร:</span> {selectedUser.numberPhone}</p>
          <p><span className="text-blue-950 font-bold">ประเภทงาน:</span> {selectedUser.service}</p>
          <p><span className="text-blue-950 font-bold">ที่อยู่</span> {selectedUser.province}, {selectedUser.amphure}, {selectedUser.tambon}</p>
          <br />
          <p><span className="text-blue-950 font-bold">รายละเอียด: </span> {selectedUser.detail}</p>
        </div>
        )}
      </div>
      )}
    </div>
  );
};

export default Car;
