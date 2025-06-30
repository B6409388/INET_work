const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Product = require('../models/product');

// ตั้งค่า storage ให้ multer เก็บไฟล์ในโฟลเดอร์ 'uploads' และตั้งชื่อไฟล์ไม่ซ้ำ
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images"); // โฟลเดอร์เก็บไฟล์ (สร้างโฟลเดอร์นี้ไว้ในโปรเจกต์ด้วย)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage: storage });

// เพิ่ม route สำหรับสร้างสินค้า รับไฟล์ภาพด้วย field name "image"
router.post("/", upload.single("image"), async (req, res) => {
  try {
    // req.file คือไฟล์ภาพที่อัพโหลด
    // req.body คือข้อมูลฟิลด์อื่น ๆ

    const { product_id, name, description, price, stock } = req.body;

    // สร้าง URL หรือ path ของรูปภาพ (สมมติเก็บไฟล์ใน /uploads/)
    let image = null;
    if (req.file) {
      image = "/images/" + req.file.filename; // หรือกำหนด URL ให้ตรงกับ static folder ของคุณ
    }

    const product = new Product({
      product_id,
      name,
      description,
      price,
      stock,
      image, // เพิ่ม field รูปภาพใน model
    });

    await product.save();

    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//  Get All Products
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

//  Get Product by ID
router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

//  Update Product
router.put('/:id', async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

//  Delete Product
router.delete('/:id', async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json({ message: 'Product deleted' });
});

module.exports = router;
