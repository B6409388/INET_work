const mongoose = require("mongoose");
const { type } = require("express/lib/response");
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    order_id: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // << เพิ่มตรงนี้
    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number },
      },
    ],
    total_price: { type: Number },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
