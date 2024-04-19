const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  name: String,
  phone: Number,
  address: String,
  province: String,
  district: String,
  subdistrict: String,
  postalCode: Number,
  paymentMethod: String,
});

module.exports = mongoose.model("Payment", paymentSchema);
