const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  name: String,
  phone: String,
  address: String,
  province: String,
  district: String,
  subdistrict: String,
  postalCode: String,
  paymentMethod: String,
  
});

module.exports = mongoose.model("Payment", paymentSchema);
