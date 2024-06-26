const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");

dotenv.config();

const productRoutes = require("./routes/productRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const cartRoutes = require("./routes/cartRoutes");
const soundRoutes = require("./routes/soundRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();
app.use(cors());

const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");

    const PORT = process.env.PORT || 3005;
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Could not connect to MongoDB", err);
    process.exit(1);
  });

app.use(express.json());

app.use("/products", productRoutes);
app.use("/payments", paymentRoutes);
app.use("/cart", cartRoutes);
app.use("/sound", soundRoutes);
app.use("/dashboard", dashboardRoutes);

// Serve static files (images)
app.use("/sound", express.static(path.join(__dirname, "sound")));
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
