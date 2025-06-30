const express = require('express');
const router = express.Router();
const Order = require('../models/oder');
const Product = require('../models/product');
const authMiddleware = require('../middleware/token.middleware'); 

router.post('/', authMiddleware, async (req, res) => {
  const { order_id, items } = req.body;

  try {
    let total_price = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ error: `Product not found: ${item.product}` });
      }
      if (!item.quantity || item.quantity <= 0 || isNaN(item.quantity)) {
        return res.status(400).json({ error: `Invalid quantity for product: ${product.name}` });
      }
      if (product.stock === undefined || product.stock < item.quantity) {
        return res.status(400).json({ error: `Not enough stock for product: ${product.name}` });
      }

      product.stock -= item.quantity;
      await product.save();

      total_price += product.price * item.quantity;

      orderItems.push({
        product: product._id,
        quantity: item.quantity
      });
    }

    //  เพิ่ม user จาก token ที่ผ่าน middleware
    const order = new Order({
      order_id,
      user: req.user._id, // <<-- เพิ่มตรงนี้
      items: orderItems,
      total_price
    });

    await order.save();
    res.status(201).json(order);

  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ error: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json({ message: 'Order deleted' });
});

// router.get('/', async (req, res) => {
//   const Orders = await Order.find();
//   res.json(Orders);
// });

router.get('/', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('user', 'first_name last_name')
      .populate('items.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
});


module.exports = router;
