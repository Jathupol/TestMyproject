// Footer.jsx
import React from "react";
import "./Footer.css"; // Import CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <p>นายจตุพล พลพิมพ์กาล 
                รหัสนักศึกษา 633120100110
                ระดับชั้นปีที่ 4

            </p>
          </div>
          <div className="col-md-6">
            <h3> คณะวิทยาศาสตาร์และเทคโนโลยี สาขาวิทยาการคอมพิวพ์เตอร์
                มหาวิยาลัยราชภัฏมหาสารคาม</h3>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
