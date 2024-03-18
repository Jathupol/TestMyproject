// Home.jsx
import React, { useState } from "react";
import "./Home.css"; // นำเข้าไฟล์ CSS สำหรับ Home
import Nav from "./Nav";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ListallService from "../Service/ListallService";
import CarList from "../Service_List/CarList";
import UserList from "../Service_List/UserList";
import Footer from "./Footer";
import SearchForm from "./SearchForm ";
import Car from "../Service_List/Car";
import Plumber from "../Service_List/Plumber";


function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
  };

  return (
    <div>
      <Nav />
      <div className="py-5 ">
        <div className="bg-slate-200">
        <h1 className="text-3xl py-3 text-center"> แนะนำ </h1>
      <Slider {...settings}>
        <div>
          <Car />
        </div>
        <div>
          <UserList />
        </div>
        <div>
          <Plumber />
        </div>
      </Slider>
      </div>
      <br/>
      <h1 className="py-3 text-center text-2xl">รายการช่าง อื่นๆ</h1>
      <SearchForm />
      <hr />
      <ListallService />

      </div>
      <Footer />
    </div>
    
  );
}

export default Home;
