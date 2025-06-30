const mongoose = require('mongoose');
const {type} = require("express/lib/response");
const {Schema} = mongoose;

const productSchema = new Schema(
  {
  product_id: {type: String},
  name: {type: String},
  description: {type: String},
  price: {type: Number},
  quantity: {type: Number},
  stock: {type: Number},
  image: {type: String},
},
{
   timestamps: true,
}
);

module.exports = mongoose.model('Product', productSchema);



