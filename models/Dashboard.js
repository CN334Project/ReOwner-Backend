const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  product: String,
  amount: Number,
  date: { type: Date, default: Date.now }
});

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;