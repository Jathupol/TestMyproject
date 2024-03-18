const express = require('express');
const multer = require('multer'); // เรียกใช้ multer สำหรับการอัปโหลดไฟล์
const path = require('path');
const fs = require('fs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

// ตั้งค่า Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/profiles'); // บันทึกไฟล์ไปยังโฟลเดอร์ uploads/profiles
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Endpoint สำหรับอัปโหลดรูปโปรไฟล์
router.post('/upload-profile-picture', upload.single('profilePicture'), async (req, res) => {
  try {
    // รับไฟล์ที่อัปโหลดจาก req.file
    const file = req.file;
    // ดึง userId จาก req.body หรือ req.headers
    const userId = parseInt(req.body.userId);

    // ตรวจสอบว่ามีไฟล์ถูกส่งมาหรือไม่
    if (!file) {
      return res.status(400).json({ success: false, message: 'ไม่พบไฟล์ที่อัปโหลด' });
    }

    // อัปเดตข้อมูลผู้ใช้ในฐานข้อมูลเพื่อบันทึกชื่อไฟล์รูปโปรไฟล์
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { profilePicture: file.filename } // เพิ่มข้อมูลรูปโปรไฟล์ในฐานข้อมูล
    });

    res.status(200).json({ success: true, message: 'อัปโหลดรูปโปรไฟล์สำเร็จ', user: updatedUser });
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการอัปโหลดรูปโปรไฟล์' });
  }
});

module.exports = router;
