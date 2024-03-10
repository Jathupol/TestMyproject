// Home.jsx
import React, { useState } from "react";
import "./Home.css"; // นำเข้าไฟล์ CSS สำหรับ Home
import Nav from "./Nav";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div>
      <Nav />
      <div className="py-5">
      <Slider {...settings}>
        <div>
          <img src="https://media.graphassets.com/bqQlJRQgQPSn74p7wo87" alt="Image 1" className="slick-image" />
        </div>
        <div>
          <img src="https://media.istockphoto.com/id/1353480176/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%8A%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B9%84%E0%B8%9F%E0%B8%9F%E0%B9%89%E0%B8%B2%E0%B8%8A%E0%B8%B2%E0%B8%A2%E0%B8%97%E0%B9%8D%E0%B8%B2%E0%B8%87%E0%B8%B2%E0%B8%99%E0%B9%83%E0%B8%99%E0%B8%AA%E0%B8%A7%E0%B8%B4%E0%B8%95%E0%B8%8A%E0%B9%8C%E0%B8%9A%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%94%E0%B8%9E%E0%B8%A3%E0%B9%89%E0%B8%AD%E0%B8%A1%E0%B8%AA%E0%B8%B2%E0%B8%A2%E0%B9%80%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%A1%E0%B8%95%E0%B9%88%E0%B8%AD%E0%B9%84%E0%B8%9F%E0%B8%9F%E0%B9%89%E0%B8%B2.jpg?s=612x612&w=0&k=20&c=X4JCcfApX9nylM_tJ_-7TotlO-qxryX3E-9u8lgdbow=" alt="Image 2" className="slick-image"/>
        </div>
        <div>
          <img src="https://quizizz.com/media/resource/gs/quizizz-media/quizzes/e5970f35-f00c-4c06-ad2d-2cc3063febcc" alt="Image 3"  className="slick-image"/>
        </div>
        {/* เพิ่มรูปภาพตามต้องการ */}
      </Slider>
      </div>
    </div>
  );
}

export default Home;
