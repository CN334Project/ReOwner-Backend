const Sale = require("../models/Dashboard")

exports.getDataDashboard = async (req, res) => {
    try {
        const sales = await Sale.find();
        res.json(sales);
      } catch (error) {
        console.error('Error fetching sales data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  };