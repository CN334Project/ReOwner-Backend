const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  month: String,
  sales: Number,
  date: { type: Date, default: Date.now }
});

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;