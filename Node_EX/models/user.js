
const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    user_id: { type: String },
    username: { type: String },
    password: { type: String },
    first_name: { type: String },
    last_name: {type: String},
    age: {type: Number},
    gender: {type: String}
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
