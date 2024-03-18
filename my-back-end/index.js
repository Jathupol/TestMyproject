//index.js
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const updatedUser = require('./rout/updatedUser')
const jwt = require('jsonwebtoken');


const app = express();
const prisma = new PrismaClient();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


app.get('/helloword' ,function (req, res,next){
  res.json({msg: 'hello, word!'})
})
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5173");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// Middleware for logging requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Register a new user for the Service model
app.post('/register', async (req, res) => {
  const { fName, lName, email, password, numberPhone, service, province, amphure, tambon,detail } = req.body;
  try {
    // Check if all required fields are provided
    if (!fName || !lName || !email || !password || !numberPhone || !service || !province || !amphure || !tambon || !detail) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Hash the password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Register a new user in the Service model
    const newUser = await prisma.Service.create({
      data: {
        fName,
        lName,
        email,
        password: hashedPassword,
        numberPhone,
        service,
        province,
        amphure,
        tambon,
        detail
      },
    });

    res.json(newUser);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'An error occurred while registering user' });
  }
});

app.post('/register-User', async (req, res) => {
  const { username, email, password, numberPhone } = req.body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        numberPhone,
      },
    });

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if the user exists in regular users table
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // Check if the user exists in service users table if not found in regular users table
    const serviceUser = !user ? await prisma.service.findUnique({
      where: {
        email,
      },
    }) : null;

    if (!user && !serviceUser) {
      return res.status(404).json({ success: false, message: 'Invalid email or password' });
    }

    // Check the password for regular user or service user based on the result above
    const isPasswordValid = await bcrypt.compare(password, user ? user.password : serviceUser.password);

    if (!isPasswordValid) {
      return res.status(404).json({ success: false, message: 'Invalid email or password' });
    }

    // Return user data upon successful login
    const loggedInUser = user || serviceUser;
    res.status(200).json({ success: true, message: 'Login successful', user: loggedInUser });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'An error occurred while logging in' });
  }
});

app.put('/update-user/:id', async (req, res) => {
  const userId = parseInt(req.params.id);
  const { fName, lName, email, service, province, amphure, tambon, detail } = req.body;
  try {
    let dataToUpdate = {};
    if (fName !== undefined) dataToUpdate.fName = fName;
    if (lName !== undefined) dataToUpdate.lName = lName;
    if (email !== undefined) dataToUpdate.email = email;
    if (service !== undefined) dataToUpdate.service = service;
    if (province !== undefined) dataToUpdate.province = province;
    if (amphure !== undefined) dataToUpdate.amphure = amphure;
    if (tambon !== undefined) dataToUpdate.tambon = tambon;
    if (detail !== undefined) dataToUpdate.detail = detail;

    const updatedUser = await prisma.service.update({
      where: {
        id: userId,
      },
      data: dataToUpdate,
    });

    res.status(200).json({ success: true, message: 'User information updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user information:', error);
    res.status(500).json({ success: false, message: 'An error occurred while updating user information' });
  }
});

// Create a new province
app.post('/province', async (req, res) => {
  const { name_th, name_en, geography_id } = req.body;
  try {
    const newProvince = await prisma.province.create({
      data: {
        name_th,
        name_en,
        geography_id,
      },
    });
    res.json(newProvince);
  } catch (error) {
    console.error('Error creating province:', error);
    res.status(500).json({ error: 'An error occurred while creating province.' });
  }
});

// Create a new amphure
app.post('/amphure', async (req, res) => {
  const { name_th, name_en, province_id } = req.body;
  try {
    const newAmphure = await prisma.amphure.create({
      data: {
        name_th,
        name_en,
        province_id,
      },
    });
    res.json(newAmphure);
  } catch (error) {
    console.error('Error creating amphure:', error);
    res.status(500).json({ error: 'An error occurred while creating amphure.' });
  }
});

// Create a new tambon
app.post('/tambon', async (req, res) => {
  const { name_th, name_en, amphure_id, zip_code } = req.body;
  try {
    const newTambon = await prisma.tambon.create({
      data: {
        name_th,
        name_en,
        amphure_id,
        zip_code,
      },
    });
    res.json(newTambon);
  } catch (error) {
    console.error('Error creating tambon:', error);
    res.status(500).json({ error: 'An error occurred while creating tambon.' });
  }
});

app.get('/services', async (req, res) => {
  try {
    // ดึงข้อมูลผู้ให้บริการทั้งหมดจากฐานข้อมูล
    const services = await prisma.service.findMany();

    // ส่งข้อมูลผู้ให้บริการทั้งหมดกลับไปยังไคลเอนต์
    res.status(200).json({ success: true, services });
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการดึงข้อมูลผู้ให้บริการ:', error);
    res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการดึงข้อมูลผู้ให้บริการ' });
  }
});



app.get('/electrician', async (req, res) => {
  try {
    const users = await prisma.service.findMany({
      where: {
        // ค้นหาข้อมูลบริการที่มีคอลัมน์ service เป็น 'ช่างไฟฟ้า'
        service: 'ช่างไฟฟ้า',
      },
    });

    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error('การค้นหาบริการล้มเหลว:', error);
    res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการค้นหาบริการ' });
  }
});

app.get('/plumber', async (req, res) => {
  try {
    const users = await prisma.service.findMany({
      where: {
        // ค้นหาข้อมูลบริการที่มีคอลัมน์ service เป็น 'ช่างไฟฟ้า'
        service: 'ช่างประปา',
      },
    });

    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error('การค้นหาบริการล้มเหลว:', error);
    res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการค้นหาบริการ' });
  }
});
app.get('/ACT', async (req, res) => {
  try {
    const users = await prisma.service.findMany({
      where: {
        // ค้นหาข้อมูลบริการที่มีคอลัมน์ service เป็น 'ช่างไฟฟ้า'
        service: 'ช่างแอร์',
      },
    });

    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error('การค้นหาบริการล้มเหลว:', error);
    res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการค้นหาบริการ' });
  }
});
app.get('/painter', async (req, res) => {
  try {
    const users = await prisma.service.findMany({
      where: {
        // ค้นหาข้อมูลบริการที่มีคอลัมน์ service เป็น 'ช่างไฟฟ้า'
        service: 'ช่างสี',
      },
    });

    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error('การค้นหาบริการล้มเหลว:', error);
    res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการค้นหาบริการ' });
  }
});
app.get('/furniture', async (req, res) => {
  try {
    const users = await prisma.service.findMany({
      where: {
        service: 'ช่างฟอร์นิเจอร์',
      },
    });

    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error('การค้นหาบริการล้มเหลว:', error);
    res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการค้นหาบริการ' });
  }
});
app.get('/CSTW', async (req, res) => {
  try {
    const users = await prisma.service.findMany({
      where: {
        service: 'ช่างก่อสร้าง',
      },
    });

    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error('การค้นหาบริการล้มเหลว:', error);
    res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการค้นหาบริการ' });
  }
});
app.get('/Motorcycle-mechanic', async (req, res) => {
  try {
    const users = await prisma.service.findMany({
      where: {
        // ค้นหาข้อมูลบริการที่มีคอลัมน์ service เป็น 'ช่างไฟฟ้า'
        service: 'ช่างซ่อมรถจักรยานยนต์',
      },
    });

    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error('การค้นหาบริการล้มเหลว:', error);
    res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการค้นหาบริการ' });
  }
});
app.get('/servicecar', async (req, res) => {
  try {
    const users = await prisma.service.findMany({
      where: {
        // ค้นหาข้อมูลบริการที่มีคอลัมน์ service เป็น 'ช่างไฟฟ้า'
        service: 'ช่างซ่อมรถยนต์',
      },
    });

    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error('การค้นหาบริการล้มเหลว:', error);
    res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการค้นหาบริการ' });
  }
});
app.get('/DW', async (req, res) => {
  try {
    const users = await prisma.service.findMany({
      where: {
        // ค้นหาข้อมูลบริการที่มีคอลัมน์ service เป็น 'ช่างไฟฟ้า'
        service: 'ช่างประตู-หน้าต่าง',
      },
    });

    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error('การค้นหาบริการล้มเหลว:', error);
    res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการค้นหาบริการ' });
  }
});

app.get('/allservice', async (req, res) => {
  try {
    const users = await prisma.service.findMany();

    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error('การค้นหาบริการล้มเหลว:', error);
    res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการค้นหาบริการ' });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
