import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css'; // Import Tailwind CSS

import Login from './component/Login';
import Register from './component/Register'; // ต้องใช้การ import default ด้วยชื่อ Register
import Wellcome from './component/Wellcome';
import Home from './component/Home';
import ChangForm from './component/ChangForm';
import Service from './Service/SearchService';
import Profile from './component/Profile';
import RegisterService from './Service/RegisterService';
import RegisterCustomer from './component/RegisterCustomer';
import UserCard from './component/UserCard ';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Wellcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} /> {/* เพิ่มเส้นทางสำหรับหน้า Login */}
        <Route path='/changform' element={<ChangForm/> } />
        <Route path='/service' element={<Service/> } />
        <Route path="/users/:userId" element={<Profile />} />
        {/* Add more routes for other components */}
        {/* <Route path="/other" element={<OtherComponent />} /> */}
        {/* <Route path="/another" element={<AnotherComponent />} /> */}
        <Route path="/registerservice" element={<RegisterService />} />
        <Route path="/registeruser" element={<RegisterCustomer />} />
        <Route path="/usercard" element={<UserCard />} />
      </Routes>
    </Router>
  );
}

export default App;
