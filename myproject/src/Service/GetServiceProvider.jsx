import React, { useState, useEffect } from 'react';
import axios from 'axios'; // หรือใช้ไลบรารี HTTP request อื่นๆ ตามที่คุณต้องการ

const GetServiceProvider = () => {
    const [serviceProviders, setServiceProviders] = useState([]);

    useEffect(() => {
        // ทำ HTTP request เพื่อเรียกข้อมูลผู้ให้บริการ
        const fetchServiceProviders = async () => {
            try {
                const response = await axios.get('URL_ของ_API_ที่เรียกข้อมูลผู้ให้บริการ');
                setServiceProviders(response.data);
            } catch (error) {
                console.error('Error fetching service providers:', error);
            }
        };

        fetchServiceProviders(); // เรียกใช้ฟังก์ชันเมื่อ component ถูก render

        // สำหรับ cleanup ใน useEffect หากต้องการ
        return () => {
            // ใส่โค้ด cleanup ที่ต้องการ
        };
    }, []); // เรียกใช้ useEffect แค่ครั้งเดียวเมื่อ component ถูก render ครั้งแรก

    return (
        <div>
            <h1>Service Providers</h1>
            <ul>
                {serviceProviders.map(provider => (
                    <li key={provider.id}>
                        <h2>{provider.name}</h2>
                        <p>Email: {provider.email}</p>
                        {/* เพิ่มข้อมูลเพิ่มเติมตามที่คุณต้องการแสดง */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GetServiceProvider;
