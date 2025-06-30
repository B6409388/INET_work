const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
require('dotenv').config();


const app = express();
connectDB(); // เชื่อม MongoDB

app.use(express.static('public'));
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/products', require('./routes/product'));
app.use('/api/orders', require('./routes/oder'));

module.exports = app;
