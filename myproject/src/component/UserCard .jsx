// UserCard.jsx
import React from 'react';

const UserCard = ({ user }) => {
  return (
    <div className="card">
      <h3>{user.username}</h3>
      <p>Email: {user.email}</p>
      <p>Phone: {user.numberPhone}</p>
      <p>Province: {user.province}</p>
      <p>Amphure: {user.amphure}</p>
      <p>Tambon: {user.tambon}</p>
    </div>
  );
};

export default UserCard;
