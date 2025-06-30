const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tokenMiddleware = require('../middleware/token.middleware');

//  Create User
router.post('/', async function (req, res, next)  {
  console.log('Received user data:', req.body);
  try {
    const { user_id, username, password, first_name, last_name, age, gender } = req.body;

    const user = new User({
      user_id,
      username,
      password: await bcrypt.hash(password,10),
      first_name,
      last_name,
      age,
      gender
    });

    await user.save();
    console.log('User saved:', user);
    res.status(201).json(user);
  } catch (err) {
    console.error('Error saving user:', err);
    res.status(400).json({ error: err.message });
  }
});


//  Get All Users
router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Get User by ID
router.get('/:id', tokenMiddleware, async (req, res) => {
  try {
    let userId = req.params.id;
    if (userId === 'me') {
      // ใช้ userId จาก token ที่ middleware เก็บไว้ใน req.user
      userId = req.user.userId || req.user._id;
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


// Update User
router.put('/:id', async (req, res) => {
  try {
    const updateData = { ...req.body };
    // ถ้ามีการแก้ไข password ให้ hash ใหม่
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user);
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(400).json({ error: err.message });
  }
});

//  Delete User
router.delete('/:id', async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ message: 'User deleted' });
});


// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // ตรวจสอบว่าผู้ใช้งานมีอยู่หรือไม่
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: 'Invalid username or password' });

    // ตรวจสอบรหัสผ่าน
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid username or password' });

    // สร้าง token
    const token = jwt.sign(
  {
    userId: user._id,
    username: user.username,
    first_name: user.first_name, 
    last_name: user.last_name    // (optional)
  },
  process.env.JWT_SECRET || 'my_secret_key',
  { expiresIn: '1h' }
);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
