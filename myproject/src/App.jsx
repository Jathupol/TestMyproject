import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css'; // Import Tailwind CSS
import Login from './component/Login';
import Register from './component/Register'; // ต้องใช้การ import default ด้วยชื่อ Register
import Wellcome from './component/Wellcome';
import Home from './component/Home';
import Profile from './component/Profile';
import RegisterService from './Service/RegisterService';
import RegisterCustomer from './component/RegisterCustomer';
import UserCard from './component/UserCard ';
import SearchServiceForm from './Service_List/SearchServiceForm';
import ServicePlumber from './Service_List/ServicePlumber';
import ServicePaniter from './Service_List/ServicePainter';
import ServiceACT from './Service_List/ServiceACT';
import ServiceDWT from './Service_List/ServiceDWT';
import ServiceFurniture from './Service_List/ServiceFurniture';
import ServiceCSTW from './Service_List/ServiceCSTW';
import ServiceMotocycle from './Service_List/ServiceMotorcycle';
import ServiceCar from './Service_List/Servicecar';
import CarList from './Service_List/CarList';

function App() {
  const token = localStorage.getItem("accessToken");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Wellcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path='/search' element={<SearchServiceForm/> } />
        <Route path="/usercard" element={<UserCard />} />
        <Route path="/profile" element={<Profile />} /> {/* Add the route for electrician component */}
        <Route path="/serviceplumer" element={<ServicePlumber />} /> {/* Add the route for electrician component */}
        <Route path="/servicepainter" element={<ServicePaniter />} /> {/* Add the route for electrician component */}
        <Route path="/serviceACT" element={<ServiceACT />} /> {/* Add the route for electrician component */}
        <Route path="/serviceDw" element={<ServiceDWT />} /> {/* Add the route for electrician component */}
        <Route path="/serviceFurniture" element={<ServiceFurniture />} /> {/* Add the route for electrician component */}
        <Route path="/serviceCSTW" element={<ServiceCSTW />} /> {/* Add the route for electrician component */}
        <Route path="/servicemotocycle" element={<ServiceMotocycle />} /> {/* Add the route for electrician component */}
        <Route path="/ช่างซ่อมรถยนต์" element={<ServiceCar />} /> {/* Add the route for electrician component */}
        
      </Routes>
    </Router>
  );
}

export default App;
