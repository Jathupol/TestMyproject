const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.put('/users/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId);
  const { email, password, numberPhone, service, province, amphure, tambon, ...otherData } = req.body;

  try {
    // ตรวจสอบว่ามีผู้ใช้ที่ต้องการแก้ไขข้อมูลอยู่ในฐานข้อมูลหรือไม่
    const user = await prisma.service.findUnique({
      where: {
        id: userId
      }
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'ไม่พบผู้ใช้ที่ต้องการแก้ไขข้อมูล' });
    }

    // อัปเดตข้อมูลผู้ใช้
    const updatedUser = await prisma.service.update({
      where: {
        id: userId
      },
      data: {
        email: email || user.email,
        password: password || user.password,
        numberPhone: numberPhone || user.numberPhone,
        service: service || user.service,
        province: province || user.province,
        amphure: amphure || user.amphure,
        tambon: tambon || user.tambon,
        ...otherData
      }
    });

    res.status(200).json({ success: true, message: 'แก้ไขข้อมูลสำเร็จ', user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการแก้ไขข้อมูลผู้ใช้' });
  }
});

module.exports = router;
