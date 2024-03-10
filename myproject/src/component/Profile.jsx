import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setError("Failed to fetch user data.");
      }
    };

    fetchUser();
  }, [userId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
      </div>
      {/* แสดงข้อมูลผู้ใช้ */}
      <h2>Profile</h2>
      <p key="username">Username: {user.username}</p>
      <p key="email">Email: {user.email}</p>
      <p key="phone">Phone Number: {user.numberPhone}</p>
      <p key="province">Province: {user.province}</p>
      <p key="amphure">Amphure: {user.amphure}</p>
      <p key="tambon">Tambon: {user.tambon}</p>
    </div>
  );
};

export default Profile;
