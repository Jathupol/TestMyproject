import React, { useState } from "react";
import "./Home.css"; // นำเข้าไฟล์ CSS สำหรับ Home
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ListallService from "../Service/ListallService";
import CarList from "../Service_List/CarList";
import Motocycle from "../Service_List/Motocycle";
import UserList from "../Service_List/UserList";
import PlumberList from "../Service_List/PlumberList";
import Footer from "./Footer";
import FilterService from "./FilteredServiceList";
import Navw from "./Navw";

function Wellcome() {
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
      <Navw />
      <div className="py-5 ">
        <div className="bg-slate-200">
        <h1 className="text-3xl py-3 text-center"> แนะนำ </h1>
      <Slider {...settings}>
        <div>
          <CarList />
        </div>
        <div>
          <UserList />
        </div>
        <div>
          <PlumberList />
        </div>
      </Slider>
      </div>
      <br/>
      <h1 className="py-3 text-center text-2xl">รายการช่าง อื่นๆ</h1>
      <FilterService />

      <ListallService />

      </div>
      <Footer />
    </div>
    
  );
}

export default Wellcome;
